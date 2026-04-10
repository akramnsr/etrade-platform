# System Design

## Components

### Frontend (React SPA)
- Single Page Application built with React 18 and TypeScript
- State management via React Query and Context API
- Tailwind CSS for styling
- Vite for fast development and optimized production builds

### Backend (Spring Boot)
- RESTful API with OpenAPI 3 documentation
- JWT-based authentication via Keycloak
- JPA/Hibernate for database access
- Flyway for database migrations
- Role-based access control (RBAC)

### Database (PostgreSQL)
- Relational database for persistent storage
- UUID primary keys for all entities
- Enum types for status fields
- Triggers for automatic timestamp updates

### Authentication (Keycloak)
- OAuth2/OIDC identity provider
- Roles: EXPORTATOR, BANK_AGENT, ADMIN
- JWT tokens with custom claims

## Data Flow

1. User logs in → Keycloak issues JWT
2. Frontend stores JWT in localStorage
3. API requests include JWT in Authorization header
4. Backend validates JWT with Keycloak JWKS
5. Spring Security enforces method-level authorization

## Security

- HTTPS in production (via Nginx + TLS)
- JWT token validation on every request
- CORS restricted to known origins
- No secrets in source code (all via env vars)
- Multi-stage Docker builds to minimize attack surface
