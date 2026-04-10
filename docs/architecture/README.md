# Architecture Documentation

## System Components

1. **Frontend** - React 18 SPA served by Nginx
2. **Backend** - Spring Boot 3.2 REST API
3. **Database** - PostgreSQL 15
4. **Auth Server** - Keycloak 23
5. **Reverse Proxy** - Nginx

## Security Flow

1. User authenticates via Keycloak (OAuth2)
2. Keycloak issues JWT token
3. Frontend stores token in localStorage
4. All API calls include `Authorization: Bearer <token>`
5. Backend validates JWT against Keycloak JWKS endpoint
6. Role-based access control via `@PreAuthorize`
