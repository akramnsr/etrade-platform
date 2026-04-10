package com.portnet.etrade.decision;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "decisions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Decision {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "demand_id", nullable = false)
    private UUID demandId;

    @Column(name = "agent_id", nullable = false)
    private UUID agentId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private DecisionType decision = DecisionType.PENDING;

    @Column(columnDefinition = "TEXT")
    private String comments;

    @Column(name = "decided_at")
    private LocalDateTime decidedAt;
}
