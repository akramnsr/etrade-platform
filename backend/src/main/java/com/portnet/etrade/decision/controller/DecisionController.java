package com.portnet.etrade.decision.controller;

import com.portnet.etrade.common.dto.ApiResponse;
import com.portnet.etrade.decision.dto.DecisionDTO;
import com.portnet.etrade.decision.service.DecisionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/decisions")
@RequiredArgsConstructor
@Tag(name = "Decisions", description = "Decision and scoring endpoints")
@SecurityRequirement(name = "bearerAuth")
public class DecisionController {

    private final DecisionService decisionService;

    @GetMapping("/demand/{demandId}")
    @Operation(summary = "Get decision for a demand")
    public ResponseEntity<ApiResponse<DecisionDTO>> getDecisionByDemand(@PathVariable Long demandId) {
        return ResponseEntity.ok(ApiResponse.success(decisionService.getDecisionByDemand(demandId)));
    }

    @PostMapping("/demand/{demandId}")
    @Operation(summary = "Make decision on a demand")
    @PreAuthorize("hasAnyRole('ADMIN', 'BANK_OFFICER')")
    public ResponseEntity<ApiResponse<DecisionDTO>> makeDecision(
            @PathVariable Long demandId,
            @RequestBody DecisionDTO dto,
            @AuthenticationPrincipal Jwt jwt) {
        String decidedBy = jwt.getClaimAsString("preferred_username");
        return ResponseEntity.ok(ApiResponse.success("Decision recorded",
            decisionService.makeDecision(demandId, dto, decidedBy)));
    }

    @PostMapping("/demand/{demandId}/auto-score")
    @Operation(summary = "Auto-score a demand")
    @PreAuthorize("hasAnyRole('ADMIN', 'BANK_OFFICER')")
    public ResponseEntity<ApiResponse<DecisionDTO>> autoScore(@PathVariable Long demandId) {
        return ResponseEntity.ok(ApiResponse.success("Auto-scoring completed",
            decisionService.autoScore(demandId)));
    }
}
