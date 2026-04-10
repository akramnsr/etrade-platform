# Contributing to eTrade Platform

## Commit Message Format

```
type(scope): subject

Types: feat, fix, docs, style, refactor, perf, test, chore
Example: feat(auth): integrate keycloak authentication
```

## Branching Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code |
| `develop` | Integration branch |
| `feature/xyz` | New features |
| `bugfix/xyz` | Bug fixes |
| `release/v1.x` | Release preparation |

## Development Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests: `cd backend && mvn test`
5. Run lint: `cd frontend && npm run lint`
6. Commit your changes: `git commit -m "feat(module): description"`
7. Push to your fork and create a Pull Request

## Code Standards

- **Java**: Follow Google Java Style Guide
- **TypeScript**: Use ESLint and Prettier configurations
- All new features must include tests
- Update documentation for API changes
