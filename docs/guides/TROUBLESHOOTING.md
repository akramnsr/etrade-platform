# Troubleshooting Guide

## Common Issues

### Backend fails to start: "Flyway migration failed"

**Cause:** Database schema mismatch.

**Solution:**
```bash
# Reset the database
docker-compose down -v
docker-compose up postgres -d
# Wait, then restart backend
```

### 401 Unauthorized on API calls

**Cause:** Expired or invalid JWT token.

**Solution:**
1. Check Keycloak is running: `curl http://localhost:8080/health`
2. Verify token issuer matches `KEYCLOAK_ISSUER_URI`
3. Re-login to get a fresh token

### Frontend can't reach backend

**Cause:** CORS or proxy misconfiguration.

**Solution:**
1. Check `VITE_API_BASE_URL` matches backend URL
2. Check `app.cors.allowed-origins` in `application.yml`
3. Ensure backend is running: `curl http://localhost:8081/actuator/health`

### Keycloak login fails

**Cause:** Realm not imported or wrong credentials.

**Solution:**
```bash
# Check Keycloak logs
docker-compose logs keycloak

# Re-import realm
docker-compose restart keycloak
```

### Docker build fails for backend

**Cause:** Maven download issues or compilation errors.

**Solution:**
```bash
# Build locally first
cd backend && mvn clean package -DskipTests

# Check build logs
docker build --no-cache -t test ./backend
```

## Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
```
