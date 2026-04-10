package com.portnet.etrade.document.dto;

import com.portnet.etrade.document.entity.Document;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocumentDTO {
    private Long id;
    private Long demandId;
    private String filename;
    private String originalFilename;
    private String contentType;
    private Long size;
    private Document.DocumentType documentType;
    private LocalDateTime uploadedAt;
    private String uploadedBy;
}
