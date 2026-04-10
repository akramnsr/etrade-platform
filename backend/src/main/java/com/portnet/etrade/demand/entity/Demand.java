package com.portnet.etrade.demand.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "demands")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Demand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String reference;

    @Column(name = "exporter_id", nullable = false)
    private String exporterId;

    @Column(name = "exporter_name", nullable = false)
    private String exporterName;

    @Column(nullable = false)
    private String currency;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DemandStatus status;

    @Column(name = "bill_of_lading")
    private String billOfLading;

    @Column(name = "invoice_number")
    private String invoiceNumber;

    @Column
    private String description;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum DemandStatus {
        DRAFT, SUBMITTED, UNDER_REVIEW, APPROVED, REJECTED, FINANCED
    }
}
