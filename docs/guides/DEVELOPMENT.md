# Development Setup Guide

## Prerequisites

- Java 17+
- Maven 3.9+
- Node.js 20+
- Docker & Docker Compose
- IntelliJ IDEA (recommended)

## Setup

### 1. Start Infrastructure Services

```bash
docker-compose up -d postgres keycloak
```

### 2. Start Backend

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

Backend will be available at: http://localhost:8080

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at: http://localhost:3000

## Testing

### Backend Tests

```bash
cd backend
mvn test
```

### Frontend Type Check

```bash
cd frontend
npm run type-check
npm run lint
```

## Useful URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html
- Keycloak Admin: http://localhost:8180/admin (admin/admin)
