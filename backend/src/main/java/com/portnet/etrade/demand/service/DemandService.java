package com.portnet.etrade.demand.service;

import com.portnet.etrade.common.exception.ApiException;
import com.portnet.etrade.demand.dto.DemandDTO;
import com.portnet.etrade.demand.entity.Demand;
import com.portnet.etrade.demand.repository.DemandRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DemandService {

    private final DemandRepository demandRepository;

    @Transactional(readOnly = true)
    public Page<DemandDTO> getAllDemands(Pageable pageable) {
        return demandRepository.findAll(pageable).map(this::toDTO);
    }

    @Transactional(readOnly = true)
    public DemandDTO getDemandById(Long id) {
        Demand demand = demandRepository.findById(id)
            .orElseThrow(() -> ApiException.notFound("Demand not found with id: " + id));
        return toDTO(demand);
    }

    @Transactional(readOnly = true)
    public DemandDTO getDemandByReference(String reference) {
        Demand demand = demandRepository.findByReference(reference)
            .orElseThrow(() -> ApiException.notFound("Demand not found with reference: " + reference));
        return toDTO(demand);
    }

    @Transactional(readOnly = true)
    public List<DemandDTO> getDemandsByExporter(String exporterId) {
        return demandRepository.findByExporterId(exporterId)
            .stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional
    public DemandDTO createDemand(DemandDTO dto) {
        Demand demand = toEntity(dto);
        demand.setReference(generateReference());
        demand.setStatus(Demand.DemandStatus.DRAFT);
        Demand saved = demandRepository.save(demand);
        log.info("Created demand with reference: {}", saved.getReference());
        return toDTO(saved);
    }

    @Transactional
    public DemandDTO updateDemand(Long id, DemandDTO dto) {
        Demand existing = demandRepository.findById(id)
            .orElseThrow(() -> ApiException.notFound("Demand not found with id: " + id));
        existing.setExporterName(dto.getExporterName());
        existing.setCurrency(dto.getCurrency());
        existing.setAmount(dto.getAmount());
        existing.setBillOfLading(dto.getBillOfLading());
        existing.setInvoiceNumber(dto.getInvoiceNumber());
        existing.setDescription(dto.getDescription());
        return toDTO(demandRepository.save(existing));
    }

    @Transactional
    public DemandDTO submitDemand(Long id) {
        Demand demand = demandRepository.findById(id)
            .orElseThrow(() -> ApiException.notFound("Demand not found with id: " + id));
        if (demand.getStatus() != Demand.DemandStatus.DRAFT) {
            throw ApiException.badRequest("Only DRAFT demands can be submitted");
        }
        demand.setStatus(Demand.DemandStatus.SUBMITTED);
        return toDTO(demandRepository.save(demand));
    }

    @Transactional
    public void deleteDemand(Long id) {
        if (!demandRepository.existsById(id)) {
            throw ApiException.notFound("Demand not found with id: " + id);
        }
        demandRepository.deleteById(id);
    }

    private String generateReference() {
        return "DEM-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private DemandDTO toDTO(Demand demand) {
        return DemandDTO.builder()
            .id(demand.getId())
            .exporterId(demand.getExporterId())
            .exporterName(demand.getExporterName())
            .currency(demand.getCurrency())
            .amount(demand.getAmount())
            .status(demand.getStatus())
            .billOfLading(demand.getBillOfLading())
            .invoiceNumber(demand.getInvoiceNumber())
            .description(demand.getDescription())
            .reference(demand.getReference())
            .createdAt(demand.getCreatedAt())
            .updatedAt(demand.getUpdatedAt())
            .build();
    }

    private Demand toEntity(DemandDTO dto) {
        return Demand.builder()
            .exporterId(dto.getExporterId())
            .exporterName(dto.getExporterName())
            .currency(dto.getCurrency())
            .amount(dto.getAmount())
            .billOfLading(dto.getBillOfLading())
            .invoiceNumber(dto.getInvoiceNumber())
            .description(dto.getDescription())
            .build();
    }
}
