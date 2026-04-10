package com.portnet.etrade.decision;

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
import java.util.UUID;

@RestController
@RequestMapping("/api/decisions")
@RequiredArgsConstructor
@Tag(name = "Decisions", description = "Demand decision management API")
public class DecisionController {

    private final DecisionService decisionService;

    @GetMapping
    @Operation(summary = "List all decisions")
    @PreAuthorize("hasAnyRole('ADMIN', 'BANK_AGENT')")
    public ResponseEntity<List<Decision>> findAll() {
        return ResponseEntity.ok(decisionService.findAll());
    }

    @GetMapping("/demand/{demandId}")
    @Operation(summary = "Get decisions for a demand")
    @PreAuthorize("hasAnyRole('ADMIN', 'BANK_AGENT', 'EXPORTATOR')")
    public ResponseEntity<List<Decision>> findByDemandId(@PathVariable UUID demandId) {
        return ResponseEntity.ok(decisionService.findByDemandId(demandId));
    }

    @PostMapping
    @Operation(summary = "Create a decision")
    @PreAuthorize("hasAnyRole('BANK_AGENT', 'ADMIN')")
    public ResponseEntity<Decision> create(
            @RequestBody Decision decision,
            @AuthenticationPrincipal Jwt jwt) {
        UUID agentId = UUID.fromString(jwt.getSubject());
        Decision created = decisionService.create(decision, agentId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
