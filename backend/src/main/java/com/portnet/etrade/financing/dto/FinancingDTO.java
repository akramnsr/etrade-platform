package com.portnet.etrade.financing.dto;

import com.portnet.etrade.financing.entity.Financing;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FinancingDTO {

    private Long id;

    @NotNull(message = "Demand ID is required")
    private Long demandId;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be positive")
    private BigDecimal amount;

    @NotNull(message = "Interest rate is required")
    @DecimalMin(value = "0.0001", message = "Interest rate must be positive")
    private BigDecimal interestRate;

    @NotNull(message = "Duration is required")
    @Min(value = 1, message = "Duration must be at least 1 day")
    private Integer durationDays;

    private BigDecimal agios;
    private BigDecimal netAmount;
    private LocalDate startDate;
    private LocalDate endDate;
    private Financing.FinancingStatus status;
    private String currency;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
