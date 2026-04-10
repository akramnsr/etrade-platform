package com.portnet.etrade.financing.entity;

import com.portnet.etrade.demand.entity.Demand;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "financings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Financing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "demand_id", nullable = false)
    private Demand demand;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false, precision = 5, scale = 4)
    private BigDecimal interestRate;

    @Column(nullable = false)
    private Integer durationDays;

    @Column(precision = 15, scale = 2)
    private BigDecimal agios;

    @Column(name = "net_amount", precision = 15, scale = 2)
    private BigDecimal netAmount;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FinancingStatus status;

    @Column(nullable = false)
    private String currency;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum FinancingStatus {
        PENDING, ACTIVE, COMPLETED, CANCELLED
    }
}
