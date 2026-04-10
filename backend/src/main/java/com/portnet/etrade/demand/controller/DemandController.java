package com.portnet.etrade.demand.controller;

import com.portnet.etrade.common.dto.ApiResponse;
import com.portnet.etrade.demand.dto.DemandDTO;
import com.portnet.etrade.demand.service.DemandService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/demands")
@RequiredArgsConstructor
@Tag(name = "Demands", description = "Demand management endpoints")
@SecurityRequirement(name = "bearerAuth")
public class DemandController {

    private final DemandService demandService;

    @GetMapping
    @Operation(summary = "Get all demands")
    @PreAuthorize("hasAnyRole('ADMIN', 'BANK_OFFICER')")
    public ResponseEntity<ApiResponse<Page<DemandDTO>>> getAllDemands(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(demandService.getAllDemands(pageable)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get demand by ID")
    public ResponseEntity<ApiResponse<DemandDTO>> getDemandById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(demandService.getDemandById(id)));
    }

    @GetMapping("/reference/{reference}")
    @Operation(summary = "Get demand by reference")
    public ResponseEntity<ApiResponse<DemandDTO>> getDemandByReference(@PathVariable String reference) {
        return ResponseEntity.ok(ApiResponse.success(demandService.getDemandByReference(reference)));
    }

    @GetMapping("/exporter/{exporterId}")
    @Operation(summary = "Get demands by exporter")
    public ResponseEntity<ApiResponse<List<DemandDTO>>> getDemandsByExporter(
            @PathVariable String exporterId) {
        return ResponseEntity.ok(ApiResponse.success(demandService.getDemandsByExporter(exporterId)));
    }

    @PostMapping
    @Operation(summary = "Create new demand")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ApiResponse<DemandDTO>> createDemand(@Valid @RequestBody DemandDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success("Demand created successfully", demandService.createDemand(dto)));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update demand")
    public ResponseEntity<ApiResponse<DemandDTO>> updateDemand(
            @PathVariable Long id, @Valid @RequestBody DemandDTO dto) {
        return ResponseEntity.ok(ApiResponse.success("Demand updated", demandService.updateDemand(id, dto)));
    }

    @PostMapping("/{id}/submit")
    @Operation(summary = "Submit demand for review")
    public ResponseEntity<ApiResponse<DemandDTO>> submitDemand(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Demand submitted", demandService.submitDemand(id)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete demand")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteDemand(@PathVariable Long id) {
        demandService.deleteDemand(id);
        return ResponseEntity.ok(ApiResponse.success("Demand deleted", null));
    }
}
