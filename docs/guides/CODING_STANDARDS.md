# Coding Standards

## Java (Backend)

- Java 17+ features (records, sealed classes, pattern matching)
- Lombok for boilerplate reduction
- Service layer for business logic (no logic in controllers)
- DTOs for API contracts (not entities directly)
- `@Transactional` on service methods
- Proper exception hierarchy using `ResourceNotFoundException`
- Structured logging with SLF4J
- Unit tests for all service methods

## TypeScript (Frontend)

- Strict TypeScript (no `any`)
- Functional components with hooks
- Custom hooks for reusable logic
- React Query for server state
- Services for API calls (not inline in components)
- Prop types defined as interfaces
- Named exports for components and hooks
- Default exports only for pages/screens

## General

- No hardcoded secrets (use env vars)
- Meaningful variable and function names
- Single responsibility principle
- DRY (Don't Repeat Yourself)
- Comments only for non-obvious logic
