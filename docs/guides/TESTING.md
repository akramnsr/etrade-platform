# Testing Guide

## Backend Testing

### Unit Tests
- JUnit 5 + Mockito
- Test all service methods
- Mock repository dependencies
- Assert correct exceptions thrown

```java
@ExtendWith(MockitoExtension.class)
class DemandServiceTest {
    @Mock private DemandRepository demandRepository;
    @InjectMocks private DemandService demandService;

    @Test
    void findById_shouldThrow_whenNotFound() {
        when(demandRepository.findById(any())).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class,
            () -> demandService.findById(UUID.randomUUID()));
    }
}
```

### Integration Tests
- `@SpringBootTest` with `@TestcontainersConfig`
- Test full HTTP stack with `MockMvc`
- Use `@WithMockUser` for auth tests

## Frontend Testing

### Unit Tests
- Vitest + React Testing Library
- Test hooks and utilities
- Mock API services with MSW

### E2E Tests (Playwright)
- Test critical user journeys
- Login, demand creation, status updates

## Running Tests

```bash
# Backend
cd backend && mvn test

# Frontend
cd frontend && npm test
```
