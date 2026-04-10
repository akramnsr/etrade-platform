package com.portnet.etrade.financing.service;

import com.portnet.etrade.common.exception.ApiException;
import com.portnet.etrade.demand.entity.Demand;
import com.portnet.etrade.demand.repository.DemandRepository;
import com.portnet.etrade.financing.dto.FinancingDTO;
import com.portnet.etrade.financing.entity.Financing;
import com.portnet.etrade.financing.repository.FinancingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FinancingService {

    private final FinancingRepository financingRepository;
    private final DemandRepository demandRepository;

    @Transactional(readOnly = true)
    public List<FinancingDTO> getAllFinancings() {
        return financingRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public FinancingDTO getFinancingById(Long id) {
        return toDTO(financingRepository.findById(id)
            .orElseThrow(() -> ApiException.notFound("Financing not found with id: " + id)));
    }

    @Transactional
    public FinancingDTO createFinancing(FinancingDTO dto) {
        Demand demand = demandRepository.findById(dto.getDemandId())
            .orElseThrow(() -> ApiException.notFound("Demand not found with id: " + dto.getDemandId()));

        if (demand.getStatus() != Demand.DemandStatus.APPROVED) {
            throw ApiException.badRequest("Demand must be APPROVED before creating financing");
        }

        BigDecimal agios = calculateAgios(dto.getAmount(), dto.getInterestRate(), dto.getDurationDays());
        BigDecimal netAmount = dto.getAmount().subtract(agios);

        Financing financing = Financing.builder()
            .demand(demand)
            .amount(dto.getAmount())
            .interestRate(dto.getInterestRate())
            .durationDays(dto.getDurationDays())
            .agios(agios)
            .netAmount(netAmount)
            .startDate(LocalDate.now())
            .endDate(LocalDate.now().plusDays(dto.getDurationDays()))
            .status(Financing.FinancingStatus.PENDING)
            .currency(dto.getCurrency())
            .build();

        demand.setStatus(Demand.DemandStatus.FINANCED);
        demandRepository.save(demand);

        Financing saved = financingRepository.save(financing);
        log.info("Created financing for demand: {}", demand.getReference());
        return toDTO(saved);
    }

    /**
     * Calculate agios (bank charges) for financing
     * Formula: Agios = Amount * Rate * Duration / 360
     */
    public BigDecimal calculateAgios(BigDecimal amount, BigDecimal annualRate, int durationDays) {
        return amount.multiply(annualRate)
            .multiply(BigDecimal.valueOf(durationDays))
            .divide(BigDecimal.valueOf(360), 2, RoundingMode.HALF_UP);
    }

    private FinancingDTO toDTO(Financing financing) {
        return FinancingDTO.builder()
            .id(financing.getId())
            .demandId(financing.getDemand().getId())
            .amount(financing.getAmount())
            .interestRate(financing.getInterestRate())
            .durationDays(financing.getDurationDays())
            .agios(financing.getAgios())
            .netAmount(financing.getNetAmount())
            .startDate(financing.getStartDate())
            .endDate(financing.getEndDate())
            .status(financing.getStatus())
            .currency(financing.getCurrency())
            .createdAt(financing.getCreatedAt())
            .updatedAt(financing.getUpdatedAt())
            .build();
    }
}
