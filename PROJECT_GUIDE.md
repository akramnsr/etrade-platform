# eTrade Platform — Project Structure Guide

This document explains the purpose of every directory and key file.

## Root Structure

```
etrade-platform/
├── backend/              # Spring Boot REST API
├── frontend/             # React TypeScript SPA
├── docker/               # Docker build contexts
│   ├── postgres/         # PostgreSQL with init scripts
│   ├── keycloak/         # Keycloak with realm config
│   └── nginx/            # Nginx reverse proxy
├── docs/                 # Documentation
│   ├── architecture/     # System design docs
│   ├── api/              # API reference
│   └── guides/           # Development guides
├── .github/workflows/    # CI/CD pipelines
├── docker-compose.yml    # Dev environment
├── docker-compose.prod.yml # Prod environment
├── README.md
├── CONTRIBUTING.md
└── PROJECT_GUIDE.md      # This file
```

## Backend (`backend/`)

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/portnet/etrade/
│   │   │   ├── EtradeApplication.java  # Main class
│   │   │   ├── config/
│   │   │   │   └── SecurityConfig.java # JWT + CORS config
│   │   │   ├── demand/                 # Demand module
│   │   │   │   ├── Demand.java         # JPA Entity
│   │   │   │   ├── DemandRepository.java
│   │   │   │   ├── DemandService.java
│   │   │   │   ├── DemandController.java
│   │   │   │   ├── DemandDto.java      # Request/Response DTO
│   │   │   │   └── DemandStatus.java   # Status enum
│   │   │   ├── financing/              # Financing module
│   │   │   ├── document/               # Document module
│   │   │   ├── decision/               # Decision module
│   │   │   └── common/exception/       # Shared exceptions
│   │   └── resources/
│   │       ├── application.yml         # App configuration
│   │       └── db/migration/           # Flyway SQL migrations
│   └── test/                           # Test sources
├── pom.xml                             # Maven dependencies
└── Dockerfile                          # Multi-stage Docker build
```

## Frontend (`frontend/`)

```
frontend/
├── src/
│   ├── App.tsx                         # Root component + routing
│   ├── main.tsx                        # Entry point
│   ├── index.css                       # Tailwind imports
│   ├── types/                          # TypeScript interfaces
│   ├── services/                       # API service functions
│   │   ├── api.ts                      # Axios instance + interceptors
│   │   ├── authService.ts              # Keycloak auth
│   │   ├── demandService.ts
│   │   └── ...
│   ├── context/                        # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── DemandContext.tsx
│   ├── hooks/                          # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useDemand.ts                # React Query hooks
│   │   └── ...
│   ├── components/
│   │   ├── Common/                     # Shared components
│   │   ├── Auth/                       # Auth guards
│   │   ├── Demand/                     # Demand UI
│   │   ├── Financing/                  # Financing UI
│   │   └── Dashboard/                  # Role-based dashboards
│   ├── pages/                          # Route-level components
│   └── utils/                          # Helpers, formatters, constants
├── public/
│   └── index.html                      # HTML template
├── package.json
├── vite.config.ts
├── tsconfig.json
└── Dockerfile
```

## Docker Infrastructure

- **postgres/**: Custom PostgreSQL image that initializes both `etrade_db` and `keycloak_db`
- **keycloak/**: Keycloak with the `etrade` realm pre-configured (users, clients, roles)
- **nginx/**: Reverse proxy routing `/api/` to backend and `/` to frontend

## Quick Start

```bash
# Start all services
docker-compose up -d

# Access the application
open http://localhost:80

# Backend API docs
open http://localhost:8081/swagger-ui.html
```
