# Deployment Guide

This guide covers deploying the Multi-Persona Portfolio Platform to a production VPS.

## Prerequisites

- VPS with Ubuntu 22.04 LTS (minimum 2 vCPUs, 4GB RAM)
- Domain name(s) configured
- SSH access to the server
- Docker and Docker Compose installed on VPS

## VPS Setup

### 1. Initial Server Setup

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose -y

# Add your user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

### 2. Configure Firewall

```bash
# Enable UFW
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Check status
sudo ufw status verbose
```

### 3. Install Certbot for SSL

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot certonly --standalone -d yourname.com -d webdev.yourname.com -d security.yourname.com -d admin.yourname.com

# Certificates will be in: /etc/letsencrypt/live/yourname.com/
```

## Application Deployment

### 1. Clone Repository on VPS

```bash
# Create application directory
sudo mkdir -p /opt/portfolio
sudo chown $USER:$USER /opt/portfolio

# Clone repository
cd /opt/portfolio
git clone <your-repository-url> .
```

### 2. Configure Environment

```bash
# Create production .env file
cp .env.example .env

# Edit with production values
nano .env
```

Required environment variables:
```env
NODE_ENV=production
NEXT_PUBLIC_SERVER_URL=https://yourname.com
DATABASE_URL=postgresql://portfolio:SECURE_PASSWORD@db:5432/portfolio
PAYLOAD_SECRET=min-32-character-random-string
```

### 3. Update Nginx Configuration

```bash
# Update nginx/nginx.conf with your actual domain names
nano nginx/nginx.conf

# Replace all instances of:
# - yourname.com with your domain
# - webdev.yourname.com with your subdomain
# - security.yourname.com with your subdomain
# - admin.yourname.com with your subdomain
```

### 4. Create Production Docker Compose

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    container_name: portfolio-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - /etc/letsencrypt:/etc/nginx/ssl:ro
      - ./public/uploads:/var/www/uploads:ro
    depends_on:
      - app
    networks:
      - portfolio-network

  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: portfolio-app
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - PAYLOAD_SECRET=${PAYLOAD_SECRET}
      - NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
    volumes:
      - ./public/uploads:/app/public/uploads
    depends_on:
      - db
    networks:
      - portfolio-network

  db:
    image: postgres:16-alpine
    container_name: portfolio-db
    restart: unless-stopped
    environment:
      - POSTGRES_USER=portfolio
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=portfolio
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups
    networks:
      - portfolio-network

volumes:
  postgres_data:
    driver: local

networks:
  portfolio-network:
    driver: bridge
```

### 5. Deploy Application

```bash
# Build and start services
docker-compose -f docker-compose.prod.yml up -d --build

# Check logs
docker-compose -f docker-compose.prod.yml logs -f

# Verify containers are running
docker ps
```

### 6. Create Initial Admin User

```bash
# Access the admin panel
# Visit https://admin.yourname.com or https://yourname.com/admin

# Create your first admin user through the interface
```

## DNS Configuration

Configure your DNS records:

```
Type    Name        Value           TTL
A       @           YOUR_VPS_IP     3600
A       webdev      YOUR_VPS_IP     3600
A       security    YOUR_VPS_IP     3600
A       admin       YOUR_VPS_IP     3600
```

## SSL Certificate Auto-Renewal

```bash
# Test renewal
sudo certbot renew --dry-run

# Add cron job for auto-renewal
sudo crontab -e

# Add this line:
0 0 * * * certbot renew --quiet --post-hook "docker-compose -f /opt/portfolio/docker-compose.prod.yml restart nginx"
```

## Backup Strategy

### Database Backup Script

Create `/opt/portfolio/scripts/backup-db.sh`:

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/portfolio/backups"
mkdir -p $BACKUP_DIR

# Create backup
docker exec portfolio-db pg_dump -U portfolio portfolio > $BACKUP_DIR/backup_$DATE.sql

# Compress
gzip $BACKUP_DIR/backup_$DATE.sql

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete

echo "Backup completed: backup_$DATE.sql.gz"
```

Make it executable:
```bash
chmod +x /opt/portfolio/scripts/backup-db.sh
```

Add to cron:
```bash
crontab -e

# Add daily backup at 2 AM
0 2 * * * /opt/portfolio/scripts/backup-db.sh
```

## Monitoring

### Health Check Script

Create `/opt/portfolio/scripts/health-check.sh`:

```bash
#!/bin/bash
SITE_URL="https://yourname.com"

if curl -f -s -o /dev/null "$SITE_URL"; then
    echo "$(date): Site is UP"
else
    echo "$(date): Site is DOWN - Attempting restart"
    cd /opt/portfolio
    docker-compose -f docker-compose.prod.yml restart app
fi
```

Add to cron:
```bash
# Check every 5 minutes
*/5 * * * * /opt/portfolio/scripts/health-check.sh >> /var/log/portfolio-health.log 2>&1
```

## Updating the Application

```bash
# Pull latest changes
cd /opt/portfolio
git pull origin main

# Rebuild and restart
docker-compose -f docker-compose.prod.yml up -d --build

# View logs
docker-compose -f docker-compose.prod.yml logs -f app
```

## Rollback Procedure

```bash
# View previous commits
git log --oneline -10

# Rollback to specific commit
git checkout <commit-hash>

# Rebuild
docker-compose -f docker-compose.prod.yml up -d --build
```

## Troubleshooting

### Check Application Logs
```bash
docker-compose -f docker-compose.prod.yml logs app
```

### Check Database Connection
```bash
docker exec -it portfolio-db psql -U portfolio -d portfolio
```

### Restart Services
```bash
docker-compose -f docker-compose.prod.yml restart
```

### Check Nginx Configuration
```bash
docker exec portfolio-nginx nginx -t
```

## Performance Optimization

### Enable Redis Caching (Optional)

Add to `docker-compose.prod.yml`:

```yaml
redis:
  image: redis:7-alpine
  container_name: portfolio-redis
  restart: unless-stopped
  networks:
    - portfolio-network
```

Update `.env`:
```env
REDIS_URL=redis://redis:6379
```

## Security Hardening

1. **Change SSH Port** (optional but recommended)
2. **Install Fail2ban**
   ```bash
   sudo apt install fail2ban -y
   sudo systemctl enable fail2ban
   ```
3. **Regular Updates**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

## Support

For issues or questions:
- Check logs first
- Review this documentation
- Open an issue on GitHub
- Contact the maintainer

## License

MIT License - See LICENSE file for details
