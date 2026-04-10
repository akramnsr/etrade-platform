package com.portnet.etrade.demand;

import com.portnet.etrade.common.exception.ApiException;
import com.portnet.etrade.demand.dto.DemandDTO;
import com.portnet.etrade.demand.entity.Demand;
import com.portnet.etrade.demand.repository.DemandRepository;
import com.portnet.etrade.demand.service.DemandService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DemandServiceTest {

    @InjectMocks
    private DemandService demandService;

    @Mock
    private DemandRepository demandRepository;

    @Test
    void createDemand_shouldCreateAndReturnDemand() {
        // Given
        DemandDTO dto = DemandDTO.builder()
            .exporterId("EXP-001")
            .exporterName("Test Exporter")
            .currency("USD")
            .amount(BigDecimal.valueOf(50000))
            .build();

        Demand savedDemand = Demand.builder()
            .id(1L)
            .exporterId("EXP-001")
            .exporterName("Test Exporter")
            .currency("USD")
            .amount(BigDecimal.valueOf(50000))
            .status(Demand.DemandStatus.DRAFT)
            .reference("DEM-TESTREF")
            .build();

        when(demandRepository.save(any(Demand.class))).thenReturn(savedDemand);

        // When
        DemandDTO result = demandService.createDemand(dto);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getStatus()).isEqualTo(Demand.DemandStatus.DRAFT);
    }

    @Test
    void getDemandById_whenNotFound_shouldThrowApiException() {
        // Given
        when(demandRepository.findById(999L)).thenReturn(Optional.empty());

        // When / Then
        assertThatThrownBy(() -> demandService.getDemandById(999L))
            .isInstanceOf(ApiException.class)
            .hasMessageContaining("Demand not found");
    }

    @Test
    void submitDemand_whenNotDraft_shouldThrowApiException() {
        // Given
        Demand demand = Demand.builder()
            .id(1L)
            .status(Demand.DemandStatus.SUBMITTED)
            .build();

        when(demandRepository.findById(1L)).thenReturn(Optional.of(demand));

        // When / Then
        assertThatThrownBy(() -> demandService.submitDemand(1L))
            .isInstanceOf(ApiException.class)
            .hasMessageContaining("Only DRAFT demands can be submitted");
    }
}
