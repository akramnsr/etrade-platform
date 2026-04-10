# System Design

## Data Flow

```
User → Keycloak (auth) → Frontend → Nginx → Backend → PostgreSQL
```

## Database Design

See [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)

## Scalability Considerations

- Stateless backend (JWT auth, no sessions)
- Database connection pooling via HikariCP
- Nginx load balancing ready
- Docker containerization for horizontal scaling
