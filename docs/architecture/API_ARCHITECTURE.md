# API Architecture

## REST Conventions

- Base path: `/api/`
- Versioning: Header-based (`Accept: application/vnd.etrade.v1+json`)
- Response format: JSON
- Error format: RFC 7807 Problem Details

## Authentication

All endpoints under `/api/**` require a valid JWT Bearer token.

```
Authorization: Bearer <jwt_token>
```

## Endpoints Summary

| Resource | Base Path |
|----------|-----------|
| Demands | `/api/demands` |
| Financing | `/api/financing` |
| Documents | `/api/documents` |
| Decisions | `/api/decisions` |
| Public | `/api/public/**` |

## Error Responses

```json
{
  "type": "https://api.etrade.portnet.com/errors/not-found",
  "title": "Resource Not Found",
  "status": 404,
  "detail": "Demand not found with id: abc123",
  "timestamp": "2024-01-01T00:00:00Z"
}
```
