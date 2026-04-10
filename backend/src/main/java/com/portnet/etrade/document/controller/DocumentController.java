package com.portnet.etrade.document.controller;

import com.portnet.etrade.common.dto.ApiResponse;
import com.portnet.etrade.document.dto.DocumentDTO;
import com.portnet.etrade.document.entity.Document;
import com.portnet.etrade.document.service.DocumentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/documents")
@RequiredArgsConstructor
@Tag(name = "Documents", description = "Document management endpoints")
@SecurityRequirement(name = "bearerAuth")
public class DocumentController {

    private final DocumentService documentService;

    @GetMapping("/demand/{demandId}")
    @Operation(summary = "Get documents for a demand")
    public ResponseEntity<ApiResponse<List<DocumentDTO>>> getDocumentsByDemand(
            @PathVariable Long demandId) {
        return ResponseEntity.ok(ApiResponse.success(documentService.getDocumentsByDemand(demandId)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get document by ID")
    public ResponseEntity<ApiResponse<DocumentDTO>> getDocumentById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(documentService.getDocumentById(id)));
    }

    @PostMapping(value = "/demand/{demandId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload document for a demand")
    public ResponseEntity<ApiResponse<DocumentDTO>> uploadDocument(
            @PathVariable Long demandId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("documentType") Document.DocumentType documentType,
            @AuthenticationPrincipal Jwt jwt) {
        String uploadedBy = jwt.getClaimAsString("preferred_username");
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success("Document uploaded",
                documentService.uploadDocument(demandId, file, documentType, uploadedBy)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete document")
    public ResponseEntity<ApiResponse<Void>> deleteDocument(@PathVariable Long id) {
        documentService.deleteDocument(id);
        return ResponseEntity.ok(ApiResponse.success("Document deleted", null));
    }
}
