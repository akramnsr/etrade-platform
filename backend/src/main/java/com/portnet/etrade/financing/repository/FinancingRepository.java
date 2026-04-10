package com.portnet.etrade.financing.repository;

import com.portnet.etrade.financing.entity.Financing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FinancingRepository extends JpaRepository<Financing, Long> {
    Optional<Financing> findByDemandId(Long demandId);
    List<Financing> findByStatus(Financing.FinancingStatus status);
}
