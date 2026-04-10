# Branching Strategy

## Branch Types

| Branch | Purpose | Naming |
|--------|---------|--------|
| `main` | Production-ready code | `main` |
| `develop` | Integration branch | `develop` |
| `feature/*` | New features | `feature/demand-creation` |
| `bugfix/*` | Bug fixes | `bugfix/login-redirect` |
| `hotfix/*` | Critical production fixes | `hotfix/security-patch` |
| `release/*` | Release preparation | `release/1.2.0` |

## Workflow

```
feature/xxx ──▶ develop ──▶ release/x.x.x ──▶ main
                                                  │
hotfix/xxx ──────────────────────────────────────▶│
```

## Commit Messages

Follow Conventional Commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructure
- `test:` Tests
- `chore:` Build/tooling

Example: `feat: add demand creation endpoint`

## Pull Request Process

1. Create branch from `develop`
2. Implement changes with tests
3. Open PR targeting `develop`
4. Pass CI checks
5. Get code review approval
6. Merge with squash
