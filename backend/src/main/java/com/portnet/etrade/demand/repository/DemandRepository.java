package com.portnet.etrade.demand.repository;

import com.portnet.etrade.demand.entity.Demand;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DemandRepository extends JpaRepository<Demand, Long> {
    Optional<Demand> findByReference(String reference);
    List<Demand> findByExporterId(String exporterId);
    Page<Demand> findByStatus(Demand.DemandStatus status, Pageable pageable);
    boolean existsByReference(String reference);
}
