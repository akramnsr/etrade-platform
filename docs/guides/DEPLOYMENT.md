# Deployment Guide

## Production Deployment

### Prerequisites

- Docker & Docker Compose on the server
- GitHub Container Registry access
- PostgreSQL database

### Environment Setup

1. Copy `.env.example` to `.env.prod`
2. Fill in production values
3. Ensure SSL certificates are in `./ssl/`

### Deploy

```bash
export VERSION=v1.0.0
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

### CI/CD

The deploy pipeline triggers on:
- Git tags matching `v*`
- Manual workflow dispatch

Configure these GitHub secrets:
- `DEPLOY_HOST` — Server IP/hostname
- `DEPLOY_USER` — SSH username
- `DEPLOY_SSH_KEY` — SSH private key
