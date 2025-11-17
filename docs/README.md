# Documentation Index

Welcome to the Multi-Persona Portfolio Platform documentation.

## 📚 Available Documentation

### Core Documentation

1. **[High-Level Design Document](./HIGH-LEVEL-DESIGN.md)** ⭐
   - Complete system architecture and design specifications
   - Functional and non-functional requirements
   - Technology stack decisions and rationale
   - Implementation roadmap and success metrics
   - **Read this first** for a comprehensive understanding of the platform

### Quick Start Guides

2. **[README.md](../README.md)**
   - Quick start guide
   - Installation instructions
   - Basic usage
   - Project structure overview

3. **[Setup Script Guide](../scripts/setup.sh)**
   - Automated development environment setup
   - Prerequisites checker
   - One-command installation

### Development Guides

4. **[CONTRIBUTING.md](../CONTRIBUTING.md)**
   - Development workflow
   - Code style guidelines
   - Pull request process
   - Commit conventions

### Deployment Guides

5. **[DEPLOYMENT.md](../DEPLOYMENT.md)**
   - Production VPS setup
   - Docker deployment
   - Nginx configuration
   - SSL/TLS setup
   - Backup strategies
   - Monitoring and maintenance

## 📖 Documentation Organization

```
docs/
├── README.md                    # This file - documentation index
├── HIGH-LEVEL-DESIGN.md        # Complete system architecture
│
../                              # Root level documentation
├── README.md                    # Quick start guide
├── CONTRIBUTING.md              # Development guidelines
└── DEPLOYMENT.md                # Production deployment guide
```

## 🎯 Quick Navigation by Role

### For Developers
1. Start with [README.md](../README.md) for quick setup
2. Review [CONTRIBUTING.md](../CONTRIBUTING.md) for development guidelines
3. Refer to [HIGH-LEVEL-DESIGN.md](./HIGH-LEVEL-DESIGN.md) for architecture

### For System Administrators
1. Review [HIGH-LEVEL-DESIGN.md](./HIGH-LEVEL-DESIGN.md) Section 10: Deployment Architecture
2. Follow [DEPLOYMENT.md](../DEPLOYMENT.md) for production setup
3. Configure monitoring as per Section 11: Security Considerations

### For Content Creators
1. See [README.md](../README.md) "Access Points" section
2. Access admin dashboard at `/admin`
3. Review [HIGH-LEVEL-DESIGN.md](./HIGH-LEVEL-DESIGN.md) Section 2: Functional Requirements

### For Architects
1. Read [HIGH-LEVEL-DESIGN.md](./HIGH-LEVEL-DESIGN.md) in full
2. Review Section 4: System Architecture
3. Study Section 7: Technology Stack

## 📋 Key Concepts

### Multi-Persona System
The platform supports multiple professional identities (personas) such as:
- Web Development
- Security/Penetration Testing
- DevOps/Infrastructure
- And more...

Each persona has:
- Custom theme (colors, fonts)
- Filtered content (projects, skills, experiences)
- Separate routing (subdomains or paths)
- Independent SEO settings

### Content Collections
The platform manages content through 8 core collections:
1. **Personas** - Professional identities
2. **Projects** - Portfolio projects
3. **Skills** - Technical abilities
4. **Experiences** - Work history
5. **Content** - Blog posts and articles
6. **Certifications** - Professional credentials
7. **Media** - File library
8. **Users** - Admin accounts

### Technology Stack
- **Frontend:** Next.js 14, React 18, Tailwind CSS
- **CMS:** Payload CMS 2.0
- **Database:** PostgreSQL 16
- **Infrastructure:** Docker, Nginx
- **Deployment:** Self-hosted VPS

## 🔍 Finding Information

### By Topic

**Architecture & Design**
- [HIGH-LEVEL-DESIGN.md](./HIGH-LEVEL-DESIGN.md) - Sections 4, 5, 6

**Security**
- [HIGH-LEVEL-DESIGN.md](./HIGH-LEVEL-DESIGN.md) - Section 11
- [DEPLOYMENT.md](../DEPLOYMENT.md) - Security Hardening

**Performance**
- [HIGH-LEVEL-DESIGN.md](./HIGH-LEVEL-DESIGN.md) - Sections 3.2, 12

**Development Workflow**
- [CONTRIBUTING.md](../CONTRIBUTING.md)
- [README.md](../README.md) - Development section

**Production Deployment**
- [DEPLOYMENT.md](../DEPLOYMENT.md)
- [HIGH-LEVEL-DESIGN.md](./HIGH-LEVEL-DESIGN.md) - Section 10

**API & Integrations**
- [HIGH-LEVEL-DESIGN.md](./HIGH-LEVEL-DESIGN.md) - Section 8

**Testing & Quality**
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Code Quality section
- [HIGH-LEVEL-DESIGN.md](./HIGH-LEVEL-DESIGN.md) - Section 14

## 📊 Reference Materials

### Database Schema
See [HIGH-LEVEL-DESIGN.md](./HIGH-LEVEL-DESIGN.md) - Section 5.1: Payload CMS Collections

### API Endpoints
- `/api/personas` - Persona management
- `/api/projects` - Project CRUD
- `/api/skills` - Skills management
- `/api/experiences` - Work history
- `/api/content` - Blog posts
- `/api/certifications` - Credentials
- `/api/media` - File uploads
- `/api/users` - User management

### Environment Variables
See [.env.example](../.env.example) for all configuration options

### Docker Services
See [docker-compose.yml](../docker-compose.yml) for service definitions

## 🆘 Troubleshooting

### Common Issues

**Database connection failed**
- Check if PostgreSQL is running: `docker-compose ps`
- Verify DATABASE_URL in `.env`

**Port already in use**
- Check running processes: `lsof -ti:3000`
- Kill process or use different port

**TypeScript errors**
- Regenerate types: `pnpm generate:types`
- Clear cache: `rm -rf .next`

**Build failures**
- Clear node_modules: `rm -rf node_modules && pnpm install`
- Check Node.js version: `node -v` (requires 20+)

For more troubleshooting, see [DEPLOYMENT.md](../DEPLOYMENT.md) - Troubleshooting section

## 🔄 Keeping Documentation Updated

When making significant changes:
1. Update relevant documentation files
2. Update version numbers and dates
3. Add changelog entries
4. Update this index if adding new docs

## 📞 Support

- **GitHub Issues:** Report bugs or request features
- **Documentation Issues:** Create PR with corrections
- **Questions:** Open a discussion on GitHub

## 📄 License

All documentation is licensed under MIT License - see [LICENSE](../LICENSE) file for details.

---

**Last Updated:** November 17, 2025
**Documentation Version:** 1.0
**Platform Version:** 1.0.0 (Phase 1 MVP)
