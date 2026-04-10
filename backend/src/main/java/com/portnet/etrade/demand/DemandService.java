package com.portnet.etrade.demand;

import com.portnet.etrade.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class DemandService {

    private final DemandRepository demandRepository;

    public List<Demand> findAll() {
        return demandRepository.findAll();
    }

    public Demand findById(UUID id) {
        return demandRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Demand not found with id: " + id));
    }

    public List<Demand> findByExportatorId(UUID exportatorId) {
        return demandRepository.findByExportatorId(exportatorId);
    }

    public List<Demand> findByStatus(DemandStatus status) {
        return demandRepository.findByStatus(status);
    }

    @Transactional
    public Demand create(DemandDto dto, UUID exportatorId) {
        Demand demand = Demand.builder()
            .reference(generateReference())
            .exportatorId(exportatorId)
            .type(dto.type())
            .amount(dto.amount())
            .currency(dto.currency())
            .status(DemandStatus.DRAFT)
            .description(dto.description())
            .build();

        Demand saved = demandRepository.save(demand);
        log.info("Created demand with id: {} and reference: {}", saved.getId(), saved.getReference());
        return saved;
    }

    @Transactional
    public Demand update(UUID id, DemandDto dto) {
        Demand demand = findById(id);

        demand.setType(dto.type());
        demand.setAmount(dto.amount());
        demand.setCurrency(dto.currency());
        demand.setDescription(dto.description());

        if (dto.status() != null) {
            demand.setStatus(dto.status());
        }

        Demand updated = demandRepository.save(demand);
        log.info("Updated demand with id: {}", id);
        return updated;
    }

    @Transactional
    public void delete(UUID id) {
        Demand demand = findById(id);
        if (demand.getStatus() != DemandStatus.DRAFT) {
            throw new IllegalStateException("Only DRAFT demands can be deleted");
        }
        demandRepository.deleteById(id);
        log.info("Deleted demand with id: {}", id);
    }

    private String generateReference() {
        String datePart = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String uniquePart = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        return "DEM-" + datePart + "-" + uniquePart;
    }
}
