package com.portnet.etrade.decision.repository;

import com.portnet.etrade.decision.entity.Decision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DecisionRepository extends JpaRepository<Decision, Long> {
    Optional<Decision> findByDemandId(Long demandId);
    List<Decision> findByResult(Decision.DecisionResult result);
}
