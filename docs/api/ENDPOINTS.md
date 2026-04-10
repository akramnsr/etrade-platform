# API Endpoints Reference

## Auth Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | /api/v1/auth/me | Get current user | Required |
| GET | /api/v1/auth/health | Auth health check | None |

## Demand Endpoints

| Method | Path | Description | Roles |
|--------|------|-------------|-------|
| GET | /api/v1/demands | List all demands | ADMIN, BANK_OFFICER |
| GET | /api/v1/demands/{id} | Get demand | Any |
| POST | /api/v1/demands | Create demand | Any |
| PUT | /api/v1/demands/{id} | Update demand | Any |
| POST | /api/v1/demands/{id}/submit | Submit demand | Any |
| DELETE | /api/v1/demands/{id} | Delete demand | ADMIN |

## Financing Endpoints

| Method | Path | Description | Roles |
|--------|------|-------------|-------|
| GET | /api/v1/financings | List financings | Any |
| GET | /api/v1/financings/{id} | Get financing | Any |
| POST | /api/v1/financings | Create financing | ADMIN, BANK_OFFICER |

## Document Endpoints

| Method | Path | Description | Roles |
|--------|------|-------------|-------|
| GET | /api/v1/documents/demand/{id} | List documents | Any |
| POST | /api/v1/documents/demand/{id} | Upload document | Any |
| DELETE | /api/v1/documents/{id} | Delete document | Any |

## Decision Endpoints

| Method | Path | Description | Roles |
|--------|------|-------------|-------|
| GET | /api/v1/decisions/demand/{id} | Get decision | Any |
| POST | /api/v1/decisions/demand/{id} | Make decision | ADMIN, BANK_OFFICER |
| POST | /api/v1/decisions/demand/{id}/auto-score | Auto score | ADMIN, BANK_OFFICER |
