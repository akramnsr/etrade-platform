package com.portnet.etrade.decision.service;

import com.portnet.etrade.common.exception.ApiException;
import com.portnet.etrade.decision.dto.DecisionDTO;
import com.portnet.etrade.decision.entity.Decision;
import com.portnet.etrade.decision.repository.DecisionRepository;
import com.portnet.etrade.demand.entity.Demand;
import com.portnet.etrade.demand.repository.DemandRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Slf4j
@Service
@RequiredArgsConstructor
public class DecisionService {

    private final DecisionRepository decisionRepository;
    private final DemandRepository demandRepository;

    @Transactional(readOnly = true)
    public DecisionDTO getDecisionByDemand(Long demandId) {
        return toDTO(decisionRepository.findByDemandId(demandId)
            .orElseThrow(() -> ApiException.notFound("Decision not found for demand: " + demandId)));
    }

    @Transactional
    public DecisionDTO makeDecision(Long demandId, DecisionDTO dto, String decidedBy) {
        Demand demand = demandRepository.findById(demandId)
            .orElseThrow(() -> ApiException.notFound("Demand not found with id: " + demandId));

        if (demand.getStatus() != Demand.DemandStatus.UNDER_REVIEW) {
            throw ApiException.badRequest("Demand must be UNDER_REVIEW to make a decision");
        }

        Decision decision = Decision.builder()
            .demand(demand)
            .result(dto.getResult())
            .score(dto.getScore())
            .riskLevel(dto.getRiskLevel())
            .comments(dto.getComments())
            .decidedBy(decidedBy)
            .build();

        if (dto.getResult() == Decision.DecisionResult.APPROVED) {
            demand.setStatus(Demand.DemandStatus.APPROVED);
        } else if (dto.getResult() == Decision.DecisionResult.REJECTED) {
            demand.setStatus(Demand.DemandStatus.REJECTED);
        }
        demandRepository.save(demand);

        Decision saved = decisionRepository.save(decision);
        log.info("Decision {} made for demand: {}", dto.getResult(), demand.getReference());
        return toDTO(saved);
    }

    /**
     * Automated scoring based on demand attributes
     */
    @Transactional
    public DecisionDTO autoScore(Long demandId) {
        Demand demand = demandRepository.findById(demandId)
            .orElseThrow(() -> ApiException.notFound("Demand not found with id: " + demandId));

        // Simple scoring algorithm - in production, this would be more complex
        BigDecimal score = calculateScore(demand);
        Decision.RiskLevel riskLevel = determineRiskLevel(score);
        Decision.DecisionResult result = determineResult(score);

        Decision decision = Decision.builder()
            .demand(demand)
            .result(result)
            .score(score)
            .riskLevel(riskLevel)
            .comments("Automated scoring by decision engine")
            .decidedBy("SYSTEM")
            .build();

        demand.setStatus(result == Decision.DecisionResult.APPROVED ?
            Demand.DemandStatus.APPROVED : Demand.DemandStatus.UNDER_REVIEW);
        demandRepository.save(demand);

        return toDTO(decisionRepository.save(decision));
    }

    private BigDecimal calculateScore(Demand demand) {
        // Simplified scoring: based on amount and currency
        BigDecimal baseScore = BigDecimal.valueOf(70);
        if (demand.getAmount().compareTo(BigDecimal.valueOf(100000)) < 0) {
            baseScore = baseScore.add(BigDecimal.valueOf(20));
        }
        return baseScore;
    }

    private Decision.RiskLevel determineRiskLevel(BigDecimal score) {
        if (score.compareTo(BigDecimal.valueOf(80)) >= 0) return Decision.RiskLevel.LOW;
        if (score.compareTo(BigDecimal.valueOf(60)) >= 0) return Decision.RiskLevel.MEDIUM;
        if (score.compareTo(BigDecimal.valueOf(40)) >= 0) return Decision.RiskLevel.HIGH;
        return Decision.RiskLevel.VERY_HIGH;
    }

    private Decision.DecisionResult determineResult(BigDecimal score) {
        if (score.compareTo(BigDecimal.valueOf(70)) >= 0) return Decision.DecisionResult.APPROVED;
        if (score.compareTo(BigDecimal.valueOf(50)) >= 0) return Decision.DecisionResult.MANUAL_REVIEW;
        return Decision.DecisionResult.REJECTED;
    }

    private DecisionDTO toDTO(Decision decision) {
        return DecisionDTO.builder()
            .id(decision.getId())
            .demandId(decision.getDemand().getId())
            .result(decision.getResult())
            .score(decision.getScore())
            .riskLevel(decision.getRiskLevel())
            .comments(decision.getComments())
            .decidedBy(decision.getDecidedBy())
            .createdAt(decision.getCreatedAt())
            .updatedAt(decision.getUpdatedAt())
            .build();
    }
}
