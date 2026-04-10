package com.portnet.etrade.document.service;

import com.portnet.etrade.common.exception.ApiException;
import com.portnet.etrade.demand.entity.Demand;
import com.portnet.etrade.demand.repository.DemandRepository;
import com.portnet.etrade.document.dto.DocumentDTO;
import com.portnet.etrade.document.entity.Document;
import com.portnet.etrade.document.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final DemandRepository demandRepository;

    @Transactional(readOnly = true)
    public List<DocumentDTO> getDocumentsByDemand(Long demandId) {
        return documentRepository.findByDemandId(demandId)
            .stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public DocumentDTO getDocumentById(Long id) {
        return toDTO(documentRepository.findById(id)
            .orElseThrow(() -> ApiException.notFound("Document not found with id: " + id)));
    }

    @Transactional
    public DocumentDTO uploadDocument(Long demandId, MultipartFile file,
            Document.DocumentType documentType, String uploadedBy) {
        Demand demand = demandRepository.findById(demandId)
            .orElseThrow(() -> ApiException.notFound("Demand not found with id: " + demandId));

        // Sanitize original filename to prevent path traversal
        String sanitizedOriginalFilename = sanitizeFilename(file.getOriginalFilename());
        String storedFilename = UUID.randomUUID() + "_" + sanitizedOriginalFilename;
        // TODO: In production, upload to cloud storage (S3, Azure Blob, etc.)
        String storagePath = "/uploads/" + storedFilename;

        Document document = Document.builder()
            .demand(demand)
            .filename(storedFilename)
            .originalFilename(sanitizedOriginalFilename)
            .contentType(file.getContentType())
            .size(file.getSize())
            .storagePath(storagePath)
            .documentType(documentType)
            .uploadedBy(uploadedBy)
            .build();

        Document saved = documentRepository.save(document);
        log.info("Uploaded document: {} for demand: {}", sanitizedOriginalFilename, demand.getReference());
        return toDTO(saved);
    }

    @Transactional
    public void deleteDocument(Long id) {
        if (!documentRepository.existsById(id)) {
            throw ApiException.notFound("Document not found with id: " + id);
        }
        documentRepository.deleteById(id);
    }

    /** Removes characters that could enable path traversal or file system attacks. */
    private String sanitizeFilename(String filename) {
        if (filename == null) {
            return "unknown";
        }
        return filename.replaceAll("[^a-zA-Z0-9._-]", "_");
    }

    private DocumentDTO toDTO(Document document) {
        return DocumentDTO.builder()
            .id(document.getId())
            .demandId(document.getDemand().getId())
            .filename(document.getFilename())
            .originalFilename(document.getOriginalFilename())
            .contentType(document.getContentType())
            .size(document.getSize())
            .documentType(document.getDocumentType())
            .uploadedAt(document.getUploadedAt())
            .uploadedBy(document.getUploadedBy())
            .build();
    }
}
