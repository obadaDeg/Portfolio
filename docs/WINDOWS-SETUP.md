# Windows Setup Guide

Quick setup guide for Windows users.

## Prerequisites

### 1. Install Required Software

**Node.js 20+**
- Download from: https://nodejs.org/
- Choose LTS version (20.x or higher)
- Verify installation: `node -v`

**pnpm**
```powershell
npm install -g pnpm
```

**Docker Desktop for Windows**
- Download from: https://www.docker.com/products/docker-desktop/
- Install and **restart your computer**
- **Important**: Make sure Docker Desktop is running before proceeding

## Common Issues & Solutions

### Issue 1: Docker Not Running

**Error:**
```
error during connect: Get "http://%2F%2F.%2Fpipe%2FdockerDesktopLinuxEngine...": The system cannot find the file specified.
```

**Solution:**
1. Open Docker Desktop application
2. Wait for it to fully start (whale icon in system tray should be stable)
3. Verify Docker is running:
   ```powershell
   docker ps
   ```
4. If Docker Desktop won't start:
   - Restart your computer
   - Make sure Windows WSL 2 is enabled
   - Check Docker Desktop settings → Resources → WSL integration

### Issue 2: Package Version Mismatch

**Error:**
```
ERR_PNPM_NO_MATCHING_VERSION  No matching version found for @payloadcms/richtext-slate@^2.0.0
```

**Solution:** ✅ **FIXED** - The latest commit updated packages to compatible versions

## Setup Steps

### 1. Ensure Docker Desktop is Running

```powershell
# Open Docker Desktop from Start Menu
# Wait for the whale icon to appear in system tray
# Verify with:
docker --version
docker ps
```

### 2. Clone/Navigate to Repository

```powershell
cd C:\Users\YourUsername\Portfolio
```

### 3. Install Dependencies

```powershell
# Make sure you're in the project root
pnpm install
```

This should now work without version errors!

### 4. Start MongoDB Database

```powershell
# This will download and start MongoDB
docker-compose up -d
```

Expected output:
```
Creating network "portfolio_default" with the default driver
Creating volume "portfolio_mongo_data" with default driver
Creating portfolio-mongo ... done
```

Verify MongoDB is running:
```powershell
docker ps
```

You should see a container named `portfolio-mongo` running.

### 5. Start Development Server

```powershell
pnpm dev
```

The application should start at:
- **Frontend:** http://localhost:3000
- **Admin:** http://localhost:3000/admin

## Troubleshooting

### Docker Desktop Won't Start

**Enable WSL 2:**
```powershell
# Run as Administrator
wsl --install
wsl --set-default-version 2
```

Then restart Docker Desktop.

**Enable Virtualization:**
- Restart computer
- Enter BIOS/UEFI (usually F2, F10, or DEL during boot)
- Enable:
  - Intel VT-x / AMD-V
  - Virtualization Technology
- Save and exit

### Port Already in Use

**Port 3000:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

**Port 27017 (MongoDB):**
```powershell
# Stop any local MongoDB service
net stop MongoDB

# Or use Docker Desktop UI to stop conflicting containers
```

### Permission Errors

Run PowerShell or Command Prompt **as Administrator**:
1. Right-click on PowerShell
2. Select "Run as administrator"
3. Navigate to project directory
4. Run commands

### MongoDB Connection Issues

**Check MongoDB is running:**
```powershell
docker logs portfolio-mongo
```

**Restart MongoDB:**
```powershell
docker-compose down
docker-compose up -d
```

**Connect to MongoDB (for debugging):**
```powershell
docker exec -it portfolio-mongo mongosh -u portfolio -p portfolio --authenticationDatabase admin
```

### Build Errors

**Clear cache and reinstall:**
```powershell
# Remove node_modules and lock file
rm -r node_modules
rm pnpm-lock.yaml

# Clean pnpm cache
pnpm store prune

# Reinstall
pnpm install
```

**Clear Next.js cache:**
```powershell
rm -r .next
pnpm build
```

## Development Workflow

### Starting Development

```powershell
# 1. Start Docker Desktop
# 2. Start database
docker-compose up -d

# 3. Start dev server
pnpm dev
```

### Stopping Services

```powershell
# Stop dev server: Ctrl+C in terminal

# Stop database
docker-compose down
```

### Viewing Logs

```powershell
# Database logs
docker-compose logs mongo

# Follow logs
docker-compose logs -f mongo
```

## VS Code Tips

### Recommended Extensions

- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- Docker

### Settings

Add to `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## PowerShell vs Command Prompt

Either works, but PowerShell is recommended for better commands like:

```powershell
# PowerShell (recommended)
cd C:\Users\YourName\Portfolio
pnpm dev

# Command Prompt (also works)
cd C:\Users\YourName\Portfolio
pnpm dev
```

## Git Bash Alternative

If you prefer Git Bash (Unix-like commands on Windows):

```bash
cd /c/Users/YourName/Portfolio
pnpm dev
```

## Next Steps

Once everything is running:

1. **Visit http://localhost:3000** - See the homepage
2. **Visit http://localhost:3000/admin** - Create your first admin user
3. **Start adding content** - Create personas, projects, skills

## Getting Help

If you encounter issues:

1. Check this guide first
2. Check [README.md](../README.md) for general setup
3. Check [DEPLOYMENT.md](../DEPLOYMENT.md) for advanced configuration
4. Open an issue on GitHub with:
   - Error message (full output)
   - Steps you tried
   - Windows version
   - PowerShell/CMD output

## Quick Reference

| Task | Command |
|------|---------|
| Install dependencies | `pnpm install` |
| Start database | `docker-compose up -d` |
| Stop database | `docker-compose down` |
| Start dev server | `pnpm dev` |
| Build for production | `pnpm build` |
| Check Docker status | `docker ps` |
| View MongoDB logs | `docker logs portfolio-mongo` |
| Restart everything | `docker-compose restart` |

---

**Last Updated:** November 17, 2025
**Tested On:** Windows 10/11 with Docker Desktop
