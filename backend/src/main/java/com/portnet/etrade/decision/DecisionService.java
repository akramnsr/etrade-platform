package com.portnet.etrade.decision;

import com.portnet.etrade.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class DecisionService {

    private final DecisionRepository decisionRepository;

    public List<Decision> findAll() {
        return decisionRepository.findAll();
    }

    public Decision findById(UUID id) {
        return decisionRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Decision not found with id: " + id));
    }

    public List<Decision> findByDemandId(UUID demandId) {
        return decisionRepository.findByDemandId(demandId);
    }

    @Transactional
    public Decision create(Decision decision, UUID agentId) {
        decision.setAgentId(agentId);
        if (decision.getDecision() != DecisionType.PENDING) {
            decision.setDecidedAt(LocalDateTime.now());
        }
        Decision saved = decisionRepository.save(decision);
        log.info("Created decision {} for demand {}", saved.getId(), saved.getDemandId());
        return saved;
    }

    @Transactional
    public Decision updateDecision(UUID id, DecisionType decisionType, String comments) {
        Decision decision = findById(id);
        decision.setDecision(decisionType);
        decision.setComments(comments);
        if (decisionType != DecisionType.PENDING) {
            decision.setDecidedAt(LocalDateTime.now());
        }
        Decision updated = decisionRepository.save(decision);
        log.info("Updated decision {} to {}", id, decisionType);
        return updated;
    }
}
