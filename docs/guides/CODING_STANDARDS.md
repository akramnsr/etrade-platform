# Coding Standards

## Java (Backend)

- Follow Google Java Style Guide
- Use Lombok to reduce boilerplate
- Use `@Slf4j` for logging (never `System.out.println`)
- Use `@Transactional` on service methods
- Validate all inputs at the controller level with Jakarta Validation
- Return `ApiResponse<T>` from all endpoints

## TypeScript (Frontend)

- Use functional components with hooks
- Define explicit TypeScript types/interfaces
- Use React Hook Form for form handling with Zod validation
- Use custom hooks for reusable logic
- Prefer `const` over `let`
- No `any` types without justification

## Security

- Never hardcode secrets in source code
- Use environment variables for all configuration
- Validate and sanitize all user inputs
- Follow OWASP Top 10 guidelines
- JWT tokens must be validated on every request
