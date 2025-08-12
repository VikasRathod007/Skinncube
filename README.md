# 🌟 Skincube - Simplified Environment Setup

A clean, production-ready MERN stack application with simplified development and production environment management.

## 🚀 Quick Start

### Development Mode

```bash
# Start development environment
./dev-start.sh

# Access at: http://localhost:8000
```

### Production Mode

```bash
# Deploy to production
./prod-deploy.sh your-domain.com

# Access at: https://your-domain.com
```

## 🔄 Environment Management

### Environment Switcher

```bash
# Switch to development
./switch-env.sh dev

# Switch to production
./switch-env.sh prod your-domain.com

# Check current status
./switch-env.sh status
```

### Manual Environment Control

```bash
# Development
docker compose up -d

# Production
docker compose -f docker-compose.dev.yml -f docker-compose.prod.yml up -d
```

## 🏗️ Architecture

### Development Environment

- **Protocol**: HTTP
- **Frontend**: React dev server with hot reload
- **API**: Express.js backend
- **Database**: MongoDB in Docker
- **Proxy**: Caddy (HTTP only)
- **Ports**: 3000 (direct), 8000 (through Caddy)

### Production Environment

- **Protocol**: HTTPS with automatic SSL
- **Frontend**: Optimized React build served by Caddy
- **API**: Express.js backend
- **Database**: MongoDB in Docker
- **Proxy**: Caddy with SSL termination
- **Ports**: 80, 443

## 📁 Project Structure

```
Skincube/
├── skinncube-deploy-master/
│   ├── frontend-latest/Skinncube/
│   │   ├── src/utils/apiUtils.js     # Clean API utilities
│   │   ├── .env.development          # Dev environment vars
│   │   └── .env.production           # Prod environment vars
│   ├── caddy/
│   │   ├── Caddyfile.development     # HTTP config
│   │   └── Caddyfile.production      # HTTPS config
│   ├── docker-compose.dev.yml       # Development setup
│   └── docker-compose.prod.yml      # Production overrides
├── switch-env.sh                     # Environment switcher
├── dev-start.sh                      # Quick dev start
└── prod-deploy.sh                    # Production deployment
```

## 🔧 Configuration

### Environment Variables

**Development (.env.development)**

```env
NODE_ENV=development
REACT_APP_DOMAIN=localhost:8000
GENERATE_SOURCEMAP=true
FAST_REFRESH=true
```

**Production (.env.production)**

```env
NODE_ENV=production
REACT_APP_DOMAIN=your-domain.com
GENERATE_SOURCEMAP=false
```

### API Utilities

The `apiUtils.js` automatically detects the environment and constructs proper URLs:

```javascript
import { getApiUrl, getAssetUrl } from "../utils/apiUtils";

// Development: http://localhost:8000/api/v1/users
// Production: https://your-domain.com/api/v1/users
const apiUrl = getApiUrl("/api/v1/users");

// Development: http://localhost:8000/uploads/image.jpg
// Production: https://your-domain.com/uploads/image.jpg
const imageUrl = getAssetUrl("uploads/image.jpg");
```

## 🐳 Docker Services

| Service      | Development                  | Production                 |
| ------------ | ---------------------------- | -------------------------- |
| **Frontend** | React dev server (port 3000) | Optimized build with Caddy |
| **Backend**  | Express.js API               | Express.js API             |
| **Database** | MongoDB in Docker            | MongoDB in Docker          |
| **Proxy**    | Caddy (HTTP)                 | Caddy (HTTPS + SSL)        |

## 🌐 Access Points

### Development

- **Frontend**: http://localhost:8000 (via Caddy)
- **Direct Frontend**: http://localhost:3000 (React dev server)
- **API**: http://localhost:8000/api/v1
- **Database**: Internal (mongo:27017)

### Production

- **Frontend**: https://your-domain.com
- **API**: https://api.your-domain.com/api/v1
- **Database**: Internal (mongo:27017)

## 🔐 SSL Configuration

### Automatic SSL (Recommended)

SSL certificates are automatically generated using Let's Encrypt. Just point your domain's DNS to your server:

```bash
# DNS Records
A    your-domain.com      → YOUR_SERVER_IP
A    api.your-domain.com  → YOUR_SERVER_IP
```

### Custom SSL

If you have your own certificates, place them in `ssl-certificates/` and update the Caddyfile.

## 📋 Common Commands

### Development

```bash
# Start development
./dev-start.sh

# View logs
docker compose logs -f frontend
docker compose logs -f backend
docker compose logs -f caddy

# Stop services
docker compose down

# Rebuild
docker compose up -d --build
```

### Production

```bash
# Deploy production
./prod-deploy.sh your-domain.com

# View logs
docker compose logs -f frontend
docker compose logs -f caddy

# Stop services
docker compose down

# Force rebuild
docker compose up -d --build --force-recreate
```

### Environment Management

```bash
# Check current environment
./switch-env.sh status

# Switch environments
./switch-env.sh dev
./switch-env.sh prod your-domain.com

# View environment info
docker compose exec frontend npm run env-info
```

## 🛠️ Troubleshooting

### Common Issues

**1. Port conflicts**

```bash
# Check what's using port 8000
sudo lsof -i :8000

# Stop conflicting services
sudo systemctl stop apache2  # or nginx
```

**2. SSL certificate issues**

```bash
# Check Caddy logs
docker compose logs caddy

# Verify DNS
nslookup your-domain.com
```

**3. API connection issues**

```bash
# Test API connectivity
curl http://localhost:8000/api/v1/health

# Check backend logs
docker compose logs backend
```

### Reset Everything

```bash
# Stop all services
docker compose down

# Remove all containers and volumes
docker system prune -af
docker volume prune -f

# Restart
./dev-start.sh
```

## 🔄 Migration from Old Setup

If you're migrating from the previous flag-based system:

1. **Backup your current setup**
2. **Switch to this branch**: `git checkout simplified-environment-setup`
3. **Update your environment variables** in `.env.production`
4. **Test development**: `./dev-start.sh`
5. **Deploy production**: `./prod-deploy.sh your-domain.com`

## 📞 Support

For issues or questions:

1. Check the troubleshooting section above
2. Review Docker logs: `docker compose logs [service]`
3. Verify environment: `./switch-env.sh status`

## 🎉 Features

✅ **Simple Environment Switching**  
✅ **Automatic SSL with Let's Encrypt**  
✅ **Hot Reload in Development**  
✅ **Production-Ready Security Headers**  
✅ **Rate Limiting**  
✅ **CORS Configuration**  
✅ **Docker-Based Deployment**  
✅ **One-Command Deployment**

---

**Happy Coding!** 🚀
