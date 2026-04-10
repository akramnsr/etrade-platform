# eTrade Platform Project Guide

## Architecture Overview

The platform follows a microservice-ready monolith architecture:

```
                    ┌─────────────────┐
                    │    Keycloak     │
                    │  (Auth Server)  │
                    └────────┬────────┘
                             │ JWT
              ┌──────────────┴──────────────┐
              │           Nginx              │
              │       (Reverse Proxy)        │
              └─────────┬──────────┬─────────┘
                        │          │
               ┌────────┴──┐  ┌───┴────────┐
               │  Frontend │  │  Backend   │
               │  React 18 │  │ Spring Boot│
               └───────────┘  └─────┬──────┘
                                    │ JPA
                             ┌──────┴──────┐
                             │ PostgreSQL  │
                             └─────────────┘
```

## Module Structure

### Backend Modules

| Module | Package | Responsibility |
|--------|---------|---------------|
| Auth | `auth` | JWT validation, user info |
| Demand | `demand` | Export financing demands |
| Financing | `financing` | Bill purchase, agios calc |
| Document | `document` | Trade document management |
| Decision | `decision` | Credit scoring engine |

### Frontend Structure

| Directory | Purpose |
|-----------|---------|
| `components/` | Reusable UI components |
| `pages/` | Route-level page components |
| `services/` | API communication layer |
| `hooks/` | Custom React hooks |
| `context/` | Global state management |
| `types/` | TypeScript type definitions |
| `utils/` | Helper utilities |

## Naming Conventions

### Backend (Java)
- **Package**: `com.portnet.etrade.{module}.{layer}`
- **Classes**: `PascalCase` (e.g., `DemandService`)
- **Methods**: `camelCase` (e.g., `getDemandById`)
- **Constants**: `UPPER_SNAKE_CASE`

### Frontend (TypeScript)
- **Components**: `PascalCase` (e.g., `DemandForm.tsx`)
- **Services**: `camelCase` (e.g., `demandService.ts`)
- **Types**: `PascalCase` (e.g., `Demand`, `User`)
- **Constants**: `UPPER_SNAKE_CASE`

## API Response Format

All backend endpoints return a standard response:

```json
{
  "success": true,
  "message": "Optional message",
  "data": { ... },
  "timestamp": "2024-01-01T00:00:00"
}
```

## Agios Calculation

For export bill purchase financing:
```
Agios = Amount × Annual_Rate × Duration_Days / 360
Net Amount = Amount - Agios
```
