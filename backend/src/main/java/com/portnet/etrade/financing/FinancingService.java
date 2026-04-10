package com.portnet.etrade.financing;

import com.portnet.etrade.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class FinancingService {

    private final FinancingRepository financingRepository;

    public List<FinancingRequest> findAll() {
        return financingRepository.findAll();
    }

    public FinancingRequest findById(UUID id) {
        return financingRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Financing request not found with id: " + id));
    }

    public List<FinancingRequest> findByDemandId(UUID demandId) {
        return financingRepository.findByDemandId(demandId);
    }

    @Transactional
    public FinancingRequest create(FinancingRequest request) {
        FinancingRequest saved = financingRepository.save(request);
        log.info("Created financing request with id: {}", saved.getId());
        return saved;
    }

    @Transactional
    public FinancingRequest updateStatus(UUID id, String status) {
        FinancingRequest request = findById(id);
        request.setStatus(status);
        FinancingRequest updated = financingRepository.save(request);
        log.info("Updated financing request {} status to {}", id, status);
        return updated;
    }
}
