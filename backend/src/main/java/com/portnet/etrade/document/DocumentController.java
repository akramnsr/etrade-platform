package com.portnet.etrade.document;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
@Tag(name = "Documents", description = "Document management API")
public class DocumentController {

    private final DocumentService documentService;

    @GetMapping("/demand/{demandId}")
    @Operation(summary = "Get documents by demand ID")
    @PreAuthorize("hasAnyRole('ADMIN', 'BANK_AGENT', 'EXPORTATOR')")
    public ResponseEntity<List<Document>> findByDemandId(@PathVariable UUID demandId) {
        return ResponseEntity.ok(documentService.findByDemandId(demandId));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload a document")
    @PreAuthorize("hasAnyRole('EXPORTATOR', 'ADMIN')")
    public ResponseEntity<Document> upload(
            @RequestParam("demandId") UUID demandId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("documentType") String documentType) throws IOException {
        Document uploaded = documentService.upload(demandId, file, documentType);
        return ResponseEntity.status(HttpStatus.CREATED).body(uploaded);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Download a document")
    @PreAuthorize("hasAnyRole('ADMIN', 'BANK_AGENT', 'EXPORTATOR')")
    public ResponseEntity<Resource> download(@PathVariable UUID id) {
        Document document = documentService.findById(id);
        Resource resource = documentService.download(id);
        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(
                document.getContentType() != null ? document.getContentType() : MediaType.APPLICATION_OCTET_STREAM_VALUE))
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + document.getFilename() + "\"")
            .body(resource);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a document")
    @PreAuthorize("hasAnyRole('EXPORTATOR', 'ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        documentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
