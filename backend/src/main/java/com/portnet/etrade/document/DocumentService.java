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
        Path uploadDir = Paths.get(storagePath, demandId.toString());
        Files.createDirectories(uploadDir);

        String originalFilename = file.getOriginalFilename();
        String storedFilename = UUID.randomUUID() + "_" + originalFilename;
        Path filePath = uploadDir.resolve(storedFilename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        Document document = Document.builder()
            .demandId(demandId)
            .filename(originalFilename)
            .filePath(filePath.toString())
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
            Path filePath = Paths.get(document.getFilePath());
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
            Path filePath = Paths.get(document.getFilePath());
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            log.warn("Could not delete file: {}", document.getFilePath());
        }
        documentRepository.deleteById(id);
        log.info("Deleted document with id: {}", id);
    }
}
