package com.portnet.etrade.document;

import com.portnet.etrade.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class DocumentService {

    private final DocumentRepository documentRepository;

    @Value("${app.document.storage-path:./uploads}")
    private String storagePath;

    public List<Document> findByDemandId(UUID demandId) {
        return documentRepository.findByDemandId(demandId);
    }

    public Document findById(UUID id) {
        return documentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + id));
    }

    @Transactional
    public Document upload(UUID demandId, MultipartFile file, String documentType) throws IOException {
        String originalFilename = sanitizeFilename(file.getOriginalFilename());

        Path uploadDir = Paths.get(storagePath).resolve(demandId.toString()).normalize();
        // Ensure the upload directory is within the configured storage path
        Path baseStoragePath = Paths.get(storagePath).toAbsolutePath().normalize();
        if (!uploadDir.toAbsolutePath().normalize().startsWith(baseStoragePath)) {
            throw new SecurityException("Invalid upload directory");
        }
        Files.createDirectories(uploadDir);

        String storedFilename = UUID.randomUUID() + "_" + originalFilename;
        Path filePath = uploadDir.resolve(storedFilename).normalize();

        // Prevent path traversal: ensure the resolved file path is inside upload directory
        if (!filePath.toAbsolutePath().normalize().startsWith(uploadDir.toAbsolutePath().normalize())) {
            throw new SecurityException("Invalid file path");
        }

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        Document document = Document.builder()
            .demandId(demandId)
            .filename(originalFilename)
            .filePath(filePath.toAbsolutePath().toString())
            .documentType(documentType)
            .fileSize(file.getSize())
            .contentType(file.getContentType())
            .build();

        Document saved = documentRepository.save(document);
        log.info("Uploaded document {} for demand {}", saved.getId(), demandId);
        return saved;
    }

    public Resource download(UUID id) {
        Document document = findById(id);
        try {
            Path filePath = Paths.get(document.getFilePath()).normalize();
            // Ensure the file is within the configured storage path
            Path baseStoragePath = Paths.get(storagePath).toAbsolutePath().normalize();
            if (!filePath.toAbsolutePath().normalize().startsWith(baseStoragePath)) {
                throw new ResourceNotFoundException("File access not permitted: " + document.getFilename());
            }
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() && resource.isReadable()) {
                return resource;
            }
            throw new ResourceNotFoundException("File not found: " + document.getFilename());
        } catch (MalformedURLException e) {
            throw new ResourceNotFoundException("File not accessible: " + document.getFilename());
        }
    }

    @Transactional
    public void delete(UUID id) {
        Document document = findById(id);
        try {
            Path filePath = Paths.get(document.getFilePath()).normalize();
            Path baseStoragePath = Paths.get(storagePath).toAbsolutePath().normalize();
            if (filePath.toAbsolutePath().normalize().startsWith(baseStoragePath)) {
                Files.deleteIfExists(filePath);
            }
        } catch (IOException e) {
            log.warn("Could not delete file: {}", document.getFilePath());
        }
        documentRepository.deleteById(id);
        log.info("Deleted document with id: {}", id);
    }

    private String sanitizeFilename(String filename) {
        if (filename == null || filename.isBlank()) {
            return UUID.randomUUID() + ".bin";
        }
        // Remove path separators and null bytes, keep only the file name
        String name = Paths.get(filename).getFileName().toString();
        // Replace any remaining suspicious characters
        name = name.replaceAll("[^a-zA-Z0-9.\\-_]", "_");
        return name.isBlank() ? UUID.randomUUID() + ".bin" : name;
    }
}
