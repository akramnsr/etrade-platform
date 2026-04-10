package com.portnet.etrade.financing;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FinancingRepository extends JpaRepository<FinancingRequest, UUID> {
    List<FinancingRequest> findByDemandId(UUID demandId);
    List<FinancingRequest> findByBankAgentId(UUID bankAgentId);
    List<FinancingRequest> findByStatus(String status);
}
