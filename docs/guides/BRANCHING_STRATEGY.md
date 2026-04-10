# Git Branching Strategy

## Branch Structure

```
main (production)
  └── develop (integration)
        ├── feature/bill-purchase
        ├── feature/keycloak-auth
        ├── bugfix/agios-calculation
        └── release/v1.0
```

## Branch Rules

- `main` — Protected, requires PR, passes CI
- `develop` — Integration branch, auto-deploys to staging
- `feature/*` — Branch from `develop`, merge back to `develop`
- `release/*` — Branch from `develop`, merge to `main` + `develop`
- `bugfix/*` — Branch from `main` for hotfixes

## Commit Convention

```
feat(scope): add new feature
fix(scope): fix bug
docs(scope): update documentation
test(scope): add tests
refactor(scope): code refactoring
chore(scope): maintenance tasks
```
