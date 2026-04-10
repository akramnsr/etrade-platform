# Development Guide

## Prerequisites

- Java 17+ (JDK)
- Node.js 20+
- Docker & Docker Compose
- Maven 3.9+

## Quick Start

### 1. Clone and Configure

```bash
git clone <repo-url>
cd etrade-platform
cp frontend/.env.example frontend/.env
```

### 2. Start Infrastructure

```bash
docker-compose up postgres keycloak -d
```

Wait for Keycloak to be healthy (may take ~30 seconds).

### 3. Run Backend

```bash
cd backend
mvn spring-boot:run
```

Backend starts at http://localhost:8081  
Swagger UI: http://localhost:8081/swagger-ui.html

### 4. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at http://localhost:5173

## Test Users

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | ADMIN |
| exportator1 | password123 | EXPORTATOR |
| bankagent1 | password123 | BANK_AGENT |

## Environment Variables

### Backend
| Variable | Default | Description |
|----------|---------|-------------|
| DB_URL | jdbc:postgresql://localhost:5432/etrade_db | Database URL |
| DB_USERNAME | etrade_user | Database user |
| DB_PASSWORD | password | Database password |
| KEYCLOAK_ISSUER_URI | http://localhost:8080/realms/etrade | Keycloak issuer |

### Frontend
| Variable | Default | Description |
|----------|---------|-------------|
| VITE_API_BASE_URL | http://localhost:8081 | Backend URL |
| VITE_KEYCLOAK_URL | http://localhost:8080 | Keycloak URL |
| VITE_KEYCLOAK_REALM | etrade | Keycloak realm |
| VITE_KEYCLOAK_CLIENT_ID | etrade-frontend | Client ID |
