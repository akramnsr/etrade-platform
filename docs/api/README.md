# API Documentation

## Base URL

- Development: `http://localhost:8080`
- Production: `https://api.etrade.portnet.ma`

## Authentication

All endpoints (except `/api/v1/auth/**`) require a Bearer JWT token:

```
Authorization: Bearer <keycloak-jwt-token>
```

## Swagger UI

Available at: `http://localhost:8080/swagger-ui.html`

## Response Format

```json
{
  "success": true,
  "data": {},
  "message": "Optional",
  "timestamp": "2024-01-01T00:00:00"
}
```
