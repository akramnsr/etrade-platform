package com.portnet.etrade.financing;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/financing")
@RequiredArgsConstructor
@Tag(name = "Financing", description = "Financing requests management API")
public class FinancingController {

    private final FinancingService financingService;

    @GetMapping
    @Operation(summary = "List all financing requests")
    @PreAuthorize("hasAnyRole('ADMIN', 'BANK_AGENT')")
    public ResponseEntity<List<FinancingRequest>> findAll() {
        return ResponseEntity.ok(financingService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get financing request by ID")
    @PreAuthorize("hasAnyRole('ADMIN', 'BANK_AGENT')")
    public ResponseEntity<FinancingRequest> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(financingService.findById(id));
    }

    @PostMapping
    @Operation(summary = "Create financing request")
    @PreAuthorize("hasRole('BANK_AGENT')")
    public ResponseEntity<FinancingRequest> create(
            @RequestBody FinancingRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        request.setBankAgentId(UUID.fromString(jwt.getSubject()));
        return ResponseEntity.status(HttpStatus.CREATED).body(financingService.create(request));
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Update financing request status")
    @PreAuthorize("hasAnyRole('BANK_AGENT', 'ADMIN')")
    public ResponseEntity<FinancingRequest> updateStatus(
            @PathVariable UUID id,
            @RequestBody Map<String, String> body) {
        String status = body.get("status");
        return ResponseEntity.ok(financingService.updateStatus(id, status));
    }
}
