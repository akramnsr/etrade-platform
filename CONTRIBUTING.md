# Contributing to eTrade Platform

Thank you for your interest in contributing!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Follow the [Development Guide](./docs/guides/DEVELOPMENT.md)

## Branch Strategy

See [Branching Strategy](./docs/guides/BRANCHING_STRATEGY.md).

Always branch from `develop`:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):
```
feat: add demand export functionality
fix: resolve null pointer in financing service
docs: update API endpoint documentation
```

## Pull Request Process

1. Ensure CI passes
2. Update relevant documentation
3. Add/update tests for your changes
4. Get at least one approval
5. Squash and merge

## Code Standards

See [Coding Standards](./docs/guides/CODING_STANDARDS.md).

## Reporting Issues

- Use GitHub Issues
- Include reproduction steps
- Attach relevant logs
- Specify environment details

## Code of Conduct

Be respectful and constructive. We follow the [Contributor Covenant](https://www.contributor-covenant.org/).
