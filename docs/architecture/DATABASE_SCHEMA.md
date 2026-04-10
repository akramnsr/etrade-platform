# Database Schema

## Tables

### demands
| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL PK | Primary key |
| reference | VARCHAR(50) UNIQUE | Demand reference |
| exporter_id | VARCHAR(100) | Exporter identifier |
| exporter_name | VARCHAR(255) | Exporter company name |
| currency | CHAR(3) | ISO currency code |
| amount | NUMERIC(15,2) | Demand amount |
| status | VARCHAR(20) | Current status |
| created_at | TIMESTAMP | Creation time |

### financings
| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL PK | Primary key |
| demand_id | BIGINT FK | Reference to demand |
| amount | NUMERIC(15,2) | Financed amount |
| interest_rate | NUMERIC(5,4) | Annual interest rate |
| duration_days | INTEGER | Financing duration |
| agios | NUMERIC(15,2) | Bank charges |
| net_amount | NUMERIC(15,2) | Amount after agios |
