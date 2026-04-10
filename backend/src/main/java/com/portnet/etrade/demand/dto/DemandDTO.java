package com.portnet.etrade.demand.dto;

import com.portnet.etrade.demand.entity.Demand;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DemandDTO {

    private Long id;

    @NotBlank(message = "Exporter ID is required")
    private String exporterId;

    @NotBlank(message = "Exporter name is required")
    private String exporterName;

    @NotBlank(message = "Currency is required")
    @Size(min = 3, max = 3, message = "Currency must be 3 characters")
    private String currency;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be positive")
    private BigDecimal amount;

    private Demand.DemandStatus status;

    private String billOfLading;

    private String invoiceNumber;

    private String description;

    private String reference;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
