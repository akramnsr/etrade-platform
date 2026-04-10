# Deployment Guide

## Production Deployment

### Prerequisites
- Docker & Docker Compose on the server
- `.env.prod` file with production secrets
- Domain name configured in DNS
- TLS certificates (Let's Encrypt or similar)

### Steps

1. **Set up environment variables:**
```bash
cp docker-compose.prod.yml /opt/etrade-platform/
cat > /opt/etrade-platform/.env.prod << 'ENV'
DB_NAME=etrade_db
DB_USERNAME=etrade_user
DB_PASSWORD=<strong-password>
KC_DB_NAME=keycloak_db
KEYCLOAK_ADMIN=admin
KEYCLOAK_ADMIN_PASSWORD=<strong-password>
KEYCLOAK_ISSUER_URI=https://auth.yourdomain.com/realms/etrade
DEPLOY_URL=https://app.yourdomain.com
ENV
```

2. **Deploy:**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

3. **Verify:**
```bash
docker-compose -f docker-compose.prod.yml ps
curl http://localhost/actuator/health
```

### Automated Deployment (GitHub Actions)

The CI/CD pipeline automatically deploys on push to `main`. 

**Required GitHub Secrets:**
- `DEPLOY_HOST`: Server hostname
- `DEPLOY_USER`: SSH username
- `DEPLOY_SSH_KEY`: Private SSH key
- `DEPLOY_URL`: Application URL
