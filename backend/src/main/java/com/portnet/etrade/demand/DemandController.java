package com.portnet.etrade.demand;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/demands")
@RequiredArgsConstructor
@Tag(name = "Demands", description = "Demand management API")
public class DemandController {

    private final DemandService demandService;

    @GetMapping
    @Operation(summary = "List all demands")
    @PreAuthorize("hasAnyRole('ADMIN', 'BANK_AGENT', 'EXPORTATOR')")
    public ResponseEntity<List<Demand>> findAll(@AuthenticationPrincipal Jwt jwt) {
        String role = extractRole(jwt);
        if ("ROLE_EXPORTATOR".equals(role)) {
            UUID exportatorId = UUID.fromString(jwt.getSubject());
            return ResponseEntity.ok(demandService.findByExportatorId(exportatorId));
        }
        return ResponseEntity.ok(demandService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get demand by ID")
    @PreAuthorize("hasAnyRole('ADMIN', 'BANK_AGENT', 'EXPORTATOR')")
    public ResponseEntity<Demand> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(demandService.findById(id));
    }

    @PostMapping
    @Operation(summary = "Create new demand")
    @PreAuthorize("hasRole('EXPORTATOR')")
    public ResponseEntity<Demand> create(
            @Valid @RequestBody DemandDto dto,
            @AuthenticationPrincipal Jwt jwt) {
        UUID exportatorId = UUID.fromString(jwt.getSubject());
        Demand created = demandService.create(dto, exportatorId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update demand")
    @PreAuthorize("hasAnyRole('EXPORTATOR', 'ADMIN')")
    public ResponseEntity<Demand> update(
            @PathVariable UUID id,
            @Valid @RequestBody DemandDto dto) {
        return ResponseEntity.ok(demandService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete demand")
    @PreAuthorize("hasAnyRole('EXPORTATOR', 'ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        demandService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private String extractRole(Jwt jwt) {
        List<?> roles = jwt.getClaimAsStringList("roles");
        if (roles != null && !roles.isEmpty()) {
            return "ROLE_" + roles.get(0);
        }
        return "";
    }
}
