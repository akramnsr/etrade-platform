# Database Schema

## Tables

### users
| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Primary key |
| keycloak_id | VARCHAR UNIQUE | Keycloak subject ID |
| username | VARCHAR UNIQUE | Username |
| email | VARCHAR UNIQUE | Email address |
| role | ENUM | EXPORTATOR / BANK_AGENT / ADMIN |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### demands
| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Primary key |
| reference | VARCHAR UNIQUE | Human-readable reference (DEM-YYYYMMDD-XXXX) |
| exportator_id | UUID FK | Reference to users |
| type | VARCHAR | Demand type |
| amount | DECIMAL(19,4) | Requested amount |
| currency | VARCHAR(3) | ISO 4217 currency code |
| status | ENUM | DRAFT/SUBMITTED/UNDER_REVIEW/APPROVED/REJECTED/CANCELLED |
| description | TEXT | Optional description |

### documents
| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Primary key |
| demand_id | UUID FK | Reference to demands |
| filename | VARCHAR | Original filename |
| file_path | VARCHAR | Storage path |
| document_type | VARCHAR | Type classification |
| file_size | BIGINT | File size in bytes |
| content_type | VARCHAR | MIME type |

### financing_requests
| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Primary key |
| demand_id | UUID FK | Reference to demands |
| bank_agent_id | UUID FK | Reference to users |
| bill_amount | DECIMAL(19,4) | Financing amount |
| interest_rate | DECIMAL(5,4) | Interest rate (0-1) |
| duration_months | INT | Loan duration |
| status | VARCHAR | PENDING/APPROVED/REJECTED |

### decisions
| Column | Type | Description |
|--------|------|-------------|
| id | UUID PK | Primary key |
| demand_id | UUID FK | Reference to demands |
| agent_id | UUID FK | Reference to users |
| decision | ENUM | APPROVED/REJECTED/PENDING |
| comments | TEXT | Decision rationale |
| decided_at | TIMESTAMP | Decision timestamp |
