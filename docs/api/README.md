# API Documentation

The eTrade Platform REST API is documented using OpenAPI 3. When the backend is running, you can access:

- **Swagger UI**: http://localhost:8081/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8081/v3/api-docs

## Base URL

```
http://localhost:8081/api
```

## Authentication

All endpoints require a valid JWT Bearer token from Keycloak.

See [AUTHENTICATION.md](./AUTHENTICATION.md) for details on obtaining tokens.
