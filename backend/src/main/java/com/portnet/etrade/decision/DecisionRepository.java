package com.portnet.etrade.decision;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DecisionRepository extends JpaRepository<Decision, UUID> {
    List<Decision> findByDemandId(UUID demandId);
    List<Decision> findByAgentId(UUID agentId);
    Optional<Decision> findByDemandIdAndAgentId(UUID demandId, UUID agentId);
}
