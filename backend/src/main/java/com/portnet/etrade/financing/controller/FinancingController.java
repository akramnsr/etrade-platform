package com.portnet.etrade.financing.controller;

import com.portnet.etrade.common.dto.ApiResponse;
import com.portnet.etrade.financing.dto.FinancingDTO;
import com.portnet.etrade.financing.service.FinancingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/financings")
@RequiredArgsConstructor
@Tag(name = "Financings", description = "Financing operations endpoints")
@SecurityRequirement(name = "bearerAuth")
public class FinancingController {

    private final FinancingService financingService;

    @GetMapping
    @Operation(summary = "Get all financings")
    public ResponseEntity<ApiResponse<List<FinancingDTO>>> getAllFinancings() {
        return ResponseEntity.ok(ApiResponse.success(financingService.getAllFinancings()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get financing by ID")
    public ResponseEntity<ApiResponse<FinancingDTO>> getFinancingById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(financingService.getFinancingById(id)));
    }

    @PostMapping
    @Operation(summary = "Create financing")
    public ResponseEntity<ApiResponse<FinancingDTO>> createFinancing(
            @Valid @RequestBody FinancingDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success("Financing created", financingService.createFinancing(dto)));
    }
}
