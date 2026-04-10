# Architecture Overview

The eTrade Platform is a modern, cloud-native web application built to facilitate international trade finance operations. It follows a microservices-inspired architecture with a clear separation between frontend, backend, and infrastructure layers.

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Tailwind CSS, Vite |
| Backend | Spring Boot 3.2, Java 17 |
| Database | PostgreSQL 15 |
| Auth | Keycloak 23 (OAuth2/OIDC) |
| Containerization | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| API Docs | SpringDoc OpenAPI 3 |

## System Components

```
┌─────────────┐     ┌─────────────┐     ┌──────────────┐
│   Browser   │────▶│    Nginx    │────▶│   Frontend   │
│             │     │  (Reverse   │     │  (React SPA) │
└─────────────┘     │   Proxy)    │     └──────────────┘
                    │             │
                    │             │────▶│   Backend    │
                    └─────────────┘     │ (Spring Boot)│
                                        └──────┬───────┘
                                               │
                          ┌────────────────────┼──────────────┐
                          ▼                    ▼              ▼
                   ┌────────────┐    ┌──────────────┐  ┌──────────┐
                   │ PostgreSQL │    │   Keycloak   │  │  File    │
                   │    DB      │    │ (Auth Server)│  │ Storage  │
                   └────────────┘    └──────────────┘  └──────────┘
```

## Key Modules

- **Demand Management**: Create, track, and manage trade demands
- **Financing**: Bill purchase and import loan request management
- **Document Management**: Secure document upload and retrieval
- **Decision Engine**: Bank agent decision workflow
- **Authentication**: Role-based access control via Keycloak
