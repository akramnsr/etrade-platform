# Error Handling

## Response Format (RFC 7807 Problem Details)

All errors return a Problem Details JSON object:

```json
{
  "type": "https://api.etrade.portnet.com/errors/not-found",
  "title": "Resource Not Found",
  "status": 404,
  "detail": "Demand not found with id: abc-123",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 204 | No Content (delete) |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Validation Error |
| 500 | Internal Server Error |

## Error Types

| Type | Description |
|------|-------------|
| `errors/not-found` | Resource not found |
| `errors/validation` | Validation failed |
| `errors/access-denied` | Insufficient permissions |
| `errors/conflict` | State conflict |
| `errors/internal` | Internal server error |
