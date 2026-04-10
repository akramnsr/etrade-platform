package com.portnet.etrade.decision.dto;

import com.portnet.etrade.decision.entity.Decision;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DecisionDTO {
    private Long id;
    private Long demandId;
    private Decision.DecisionResult result;
    private BigDecimal score;
    private Decision.RiskLevel riskLevel;
    private String comments;
    private String decidedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
