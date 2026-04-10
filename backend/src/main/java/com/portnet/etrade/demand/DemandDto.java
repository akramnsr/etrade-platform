package com.portnet.etrade.demand;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record DemandDto(
    UUID id,

    String reference,

    @NotBlank(message = "Type is required")
    String type,

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    BigDecimal amount,

    @NotBlank(message = "Currency is required")
    @Size(min = 3, max = 3, message = "Currency must be 3 characters")
    String currency,

    DemandStatus status,

    String description,

    LocalDateTime createdAt
) {}
