# System Architecture

## Overview

eTrade Platform is a comprehensive digital financing platform for export bill purchase.

### Architecture Layers

1. **Presentation Layer** (Frontend - React)
2. **API Layer** (Backend - Spring Boot)
3. **Business Logic Layer** (Services)
4. **Data Access Layer** (Repositories)
5. **Database Layer** (PostgreSQL)
6. **Authentication Layer** (Keycloak)

### Technology Stack

- **Backend**: Spring Boot 3.2, Maven, PostgreSQL
- **Frontend**: React 18, TypeScript, Vite, TailwindCSS
- **Infrastructure**: Docker, Docker Compose
- **CI/CD**: GitHub Actions

## Deployment

- Development: docker-compose up
- Production: kubernetes or docker-compose.prod.yml
