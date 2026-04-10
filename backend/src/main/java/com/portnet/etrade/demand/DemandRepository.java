package com.portnet.etrade.demand;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DemandRepository extends JpaRepository<Demand, UUID> {
    List<Demand> findByExportatorId(UUID exportatorId);
    Optional<Demand> findByReference(String reference);
    List<Demand> findByStatus(DemandStatus status);
    boolean existsByReference(String reference);
}
