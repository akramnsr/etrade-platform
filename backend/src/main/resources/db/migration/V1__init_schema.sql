-- eTrade Platform Initial Database Schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_role AS ENUM ('EXPORTATOR', 'BANK_AGENT', 'ADMIN');
CREATE TYPE demand_status AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'CANCELLED');
CREATE TYPE decision_type AS ENUM ('APPROVED', 'REJECTED', 'PENDING');

-- Users table
CREATE TABLE users (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    keycloak_id   VARCHAR(255) NOT NULL UNIQUE,
    username      VARCHAR(100) NOT NULL UNIQUE,
    email         VARCHAR(255) NOT NULL UNIQUE,
    role          user_role NOT NULL DEFAULT 'EXPORTATOR',
    created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_keycloak_id ON users (keycloak_id);
CREATE INDEX idx_users_email ON users (email);

-- Demands table
CREATE TABLE demands (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference     VARCHAR(50) NOT NULL UNIQUE,
    exportator_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    type          VARCHAR(100) NOT NULL,
    amount        DECIMAL(19, 4) NOT NULL,
    currency      VARCHAR(3) NOT NULL DEFAULT 'USD',
    status        demand_status NOT NULL DEFAULT 'DRAFT',
    description   TEXT,
    created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_demands_reference ON demands (reference);
CREATE INDEX idx_demands_exportator_id ON demands (exportator_id);
CREATE INDEX idx_demands_status ON demands (status);

-- Documents table
CREATE TABLE documents (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    demand_id     UUID NOT NULL REFERENCES demands(id) ON DELETE CASCADE,
    filename      VARCHAR(255) NOT NULL,
    file_path     VARCHAR(500) NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    file_size     BIGINT,
    content_type  VARCHAR(100),
    uploaded_at   TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_documents_demand_id ON documents (demand_id);

-- Financing requests table
CREATE TABLE financing_requests (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    demand_id       UUID NOT NULL REFERENCES demands(id) ON DELETE RESTRICT,
    bank_agent_id   UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    bill_amount     DECIMAL(19, 4) NOT NULL,
    interest_rate   DECIMAL(5, 4) NOT NULL,
    duration_months INT NOT NULL CHECK (duration_months > 0),
    status          VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    notes           TEXT,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_financing_requests_demand_id ON financing_requests (demand_id);
CREATE INDEX idx_financing_requests_bank_agent_id ON financing_requests (bank_agent_id);
CREATE INDEX idx_financing_requests_status ON financing_requests (status);

-- Decisions table
CREATE TABLE decisions (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    demand_id   UUID NOT NULL REFERENCES demands(id) ON DELETE RESTRICT,
    agent_id    UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    decision    decision_type NOT NULL DEFAULT 'PENDING',
    comments    TEXT,
    decided_at  TIMESTAMP
);

CREATE INDEX idx_decisions_demand_id ON decisions (demand_id);
CREATE INDEX idx_decisions_agent_id ON decisions (agent_id);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_demands_updated_at BEFORE UPDATE ON demands
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_financing_requests_updated_at BEFORE UPDATE ON financing_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
