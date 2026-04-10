package com.portnet.etrade.document.repository;

import com.portnet.etrade.document.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByDemandId(Long demandId);
    List<Document> findByDocumentType(Document.DocumentType documentType);
}
