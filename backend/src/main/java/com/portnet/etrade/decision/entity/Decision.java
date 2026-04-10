package com.portnet.etrade.decision.entity;

import com.portnet.etrade.demand.entity.Demand;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "decisions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Decision {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "demand_id", nullable = false)
    private Demand demand;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DecisionResult result;

    @Column(name = "score", precision = 5, scale = 2)
    private BigDecimal score;

    @Column(name = "risk_level")
    @Enumerated(EnumType.STRING)
    private RiskLevel riskLevel;

    @Column(name = "comments", columnDefinition = "TEXT")
    private String comments;

    @Column(name = "decided_by")
    private String decidedBy;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum DecisionResult {
        PENDING, APPROVED, REJECTED, MANUAL_REVIEW
    }

    public enum RiskLevel {
        LOW, MEDIUM, HIGH, VERY_HIGH
    }
}
