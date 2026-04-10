# API Endpoints

## Demands

### GET /api/demands
List all demands (filtered by role).

### GET /api/demands/{id}
Get a specific demand.

**Response:**
```json
{
  "id": "uuid",
  "reference": "DEM-20240101-ABCD1234",
  "type": "BILL_PURCHASE",
  "amount": 50000.00,
  "currency": "USD",
  "status": "SUBMITTED",
  "description": "Trade finance request",
  "createdAt": "2024-01-01T10:00:00"
}
```

### POST /api/demands
Create a new demand (EXPORTATOR only).

**Request:**
```json
{
  "type": "BILL_PURCHASE",
  "amount": 50000.00,
  "currency": "USD",
  "description": "Optional description"
}
```

### PUT /api/demands/{id}
Update a demand.

### DELETE /api/demands/{id}
Delete a DRAFT demand.

## Financing

### GET /api/financing
List financing requests.

### POST /api/financing
Create a financing request (BANK_AGENT only).

### PUT /api/financing/{id}/status
Update financing request status.

## Documents

### GET /api/documents/demand/{demandId}
Get documents for a demand.

### POST /api/documents
Upload a document (multipart/form-data).

### GET /api/documents/{id}
Download a document.

## Decisions

### GET /api/decisions
List all decisions.

### POST /api/decisions
Create a decision (BANK_AGENT/ADMIN only).
