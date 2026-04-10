-- eTrade Platform Database Schema
-- Version 1: Initial Schema

CREATE TABLE IF NOT EXISTS demands (
    id BIGSERIAL PRIMARY KEY,
    reference VARCHAR(50) NOT NULL UNIQUE,
    exporter_id VARCHAR(100) NOT NULL,
    exporter_name VARCHAR(255) NOT NULL,
    currency CHAR(3) NOT NULL,
    amount NUMERIC(15, 2) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'FINANCED')),
    bill_of_lading VARCHAR(100),
    invoice_number VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS financings (
    id BIGSERIAL PRIMARY KEY,
    demand_id BIGINT NOT NULL REFERENCES demands(id),
    amount NUMERIC(15, 2) NOT NULL,
    interest_rate NUMERIC(5, 4) NOT NULL,
    duration_days INTEGER NOT NULL,
    agios NUMERIC(15, 2),
    net_amount NUMERIC(15, 2),
    start_date DATE,
    end_date DATE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED')),
    currency CHAR(3) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS documents (
    id BIGSERIAL PRIMARY KEY,
    demand_id BIGINT NOT NULL REFERENCES demands(id),
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    content_type VARCHAR(100) NOT NULL,
    size BIGINT NOT NULL,
    storage_path VARCHAR(500) NOT NULL,
    document_type VARCHAR(50) NOT NULL CHECK (document_type IN ('BILL_OF_LADING', 'INVOICE', 'LETTER_OF_CREDIT', 'INSURANCE', 'CERTIFICATE_OF_ORIGIN', 'OTHER')),
    uploaded_at TIMESTAMP NOT NULL DEFAULT NOW(),
    uploaded_by VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS decisions (
    id BIGSERIAL PRIMARY KEY,
    demand_id BIGINT NOT NULL REFERENCES demands(id),
    result VARCHAR(20) NOT NULL CHECK (result IN ('PENDING', 'APPROVED', 'REJECTED', 'MANUAL_REVIEW')),
    score NUMERIC(5, 2),
    risk_level VARCHAR(10) CHECK (risk_level IN ('LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH')),
    comments TEXT,
    decided_by VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_demands_exporter_id ON demands(exporter_id);
CREATE INDEX idx_demands_status ON demands(status);
CREATE INDEX idx_financings_demand_id ON financings(demand_id);
CREATE INDEX idx_documents_demand_id ON documents(demand_id);
CREATE INDEX idx_decisions_demand_id ON decisions(demand_id);
