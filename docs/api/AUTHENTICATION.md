# Authentication Guide

## Keycloak OAuth2 Integration

The eTrade Platform uses Keycloak as the identity provider.

### Obtaining a Token

```bash
curl -X POST http://localhost:8080/realms/etrade/protocol/openid-connect/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password" \
  -d "client_id=etrade-frontend" \
  -d "username=exportator1" \
  -d "password=password123"
```

### Token Response

```json
{
  "access_token": "eyJhbGci...",
  "refresh_token": "eyJhbGci...",
  "expires_in": 300,
  "token_type": "Bearer"
}
```

### Using the Token

```bash
curl -H "Authorization: Bearer eyJhbGci..." \
  http://localhost:8081/api/demands
```

### Default Test Users

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | ADMIN |
| exportator1 | password123 | EXPORTATOR |
| bankagent1 | password123 | BANK_AGENT |
