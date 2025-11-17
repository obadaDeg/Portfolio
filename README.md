# Multi-Persona Portfolio Platform

A modern, headless CMS-powered portfolio platform that supports multiple professional personas with dynamic content management.

## 🚀 Technology Stack

- **Framework:** Next.js 14+ (App Router)
- **CMS:** Payload CMS 2.0
- **Database:** PostgreSQL 16
- **Styling:** Tailwind CSS + shadcn/ui
- **Language:** TypeScript
- **Containerization:** Docker + Docker Compose
- **Deployment:** Self-hosted VPS with Nginx

## 📋 Prerequisites

- Node.js 20+
- pnpm 8+
- Docker & Docker Compose
- PostgreSQL 16 (via Docker)

## 🛠️ Quick Start

### 1. Clone the repository

```bash
git clone <repository-url>
cd Portfolio
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 4. Start PostgreSQL database

```bash
docker-compose up -d
```

### 5. Run the development server

```bash
pnpm dev
```

The application will be available at:
- **Frontend:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3000/admin

## 📁 Project Structure

```
Portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (payload)/         # Payload admin routes
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles
│   ├── payload/
│   │   ├── collections/       # Payload collections
│   │   ├── fields/            # Custom fields
│   │   └── hooks/             # Payload hooks
│   ├── components/            # React components
│   ├── lib/                   # Utility functions
│   └── payload.config.ts      # Payload configuration
├── public/
│   └── uploads/               # Media uploads
├── docker-compose.yml         # Docker services
├── Dockerfile                 # Production image
└── package.json
```

## 🎨 Features

### Phase 1 (MVP - Current)

- ✅ Multi-persona support
- ✅ Project management
- ✅ Skills tracking
- ✅ Experience timeline
- ✅ Content management (blog, articles)
- ✅ Certification tracking
- ✅ Media library
- ✅ Dashboard-driven content updates

### Phase 2 (Planned)

- [ ] Advanced analytics
- [ ] GitHub integration
- [ ] Enhanced SEO features
- [ ] Redis caching
- [ ] Performance optimizations

### Phase 3 (Future)

- [ ] External integrations (LinkedIn, etc.)
- [ ] Multi-language support
- [ ] Advanced permissions
- [ ] API marketplace

## 🔧 Development

### Running locally

```bash
# Start database
docker-compose up -d

# Start dev server
pnpm dev
```

### Building for production

```bash
pnpm build
pnpm start
```

### Code quality

```bash
# Linting
pnpm lint

# Formatting
pnpm format

# Type checking
pnpm type-check
```

## 🗄️ Database

### Accessing PostgreSQL

```bash
docker exec -it portfolio-db psql -U portfolio -d portfolio
```

### Backup database

```bash
docker exec portfolio-db pg_dump -U portfolio portfolio > backup.sql
```

### Restore database

```bash
docker exec -i portfolio-db psql -U portfolio < backup.sql
```

## 🚀 Deployment

### Production deployment with Docker

1. Build the image:
```bash
docker build -t portfolio-platform:latest .
```

2. Update environment variables for production

3. Deploy using docker-compose or your preferred method

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `NEXT_PUBLIC_SERVER_URL` | Public URL | `https://yourname.com` |
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@host:5432/db` |
| `PAYLOAD_SECRET` | Secret key for Payload | `min-32-character-string` |

## 📊 Collections

### Core Collections

1. **Personas** - Professional identities (e.g., Web Dev, Security, DevOps)
2. **Projects** - Portfolio projects with rich content
3. **Skills** - Technical and soft skills
4. **Experiences** - Work history and achievements
5. **Content** - Blog posts, articles, TILs
6. **Certifications** - Professional certifications
7. **Media** - Uploaded files and images
8. **Users** - Admin users

## 🎯 Admin Dashboard

Access the admin dashboard at `/admin` to manage:

- Create and manage personas
- Add projects with images and metadata
- Track skills and proficiency levels
- Document work experiences
- Publish blog content
- Upload and organize media

## 🔐 Security

- JWT-based authentication
- HTTP-only cookies
- HTTPS enforcement (production)
- Password hashing with bcrypt
- CSRF protection
- Rate limiting (configured in Nginx)
- Input validation and sanitization

## 📝 License

MIT License - see LICENSE file for details

## 👤 Author

Obada Daghlas
- GitHub: [@obadaDeg](https://github.com/obadaDeg)
- LinkedIn: [obada-daghlas](https://www.linkedin.com/in/obada-daghlas-b29a87272/)
- Email: animayoloteer@gmail.com

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[High-Level Design Document](./docs/HIGH-LEVEL-DESIGN.md)** - Complete system architecture and specifications ⭐
- **[Documentation Index](./docs/README.md)** - Guide to all available documentation
- **[Deployment Guide](./DEPLOYMENT.md)** - Production VPS setup and deployment
- **[Contributing Guide](./CONTRIBUTING.md)** - Development workflow and guidelines

**Quick Links:**
- Architecture & Design: [docs/HIGH-LEVEL-DESIGN.md](./docs/HIGH-LEVEL-DESIGN.md)
- Collections Schema: [docs/HIGH-LEVEL-DESIGN.md#51-payload-cms-collections](./docs/HIGH-LEVEL-DESIGN.md#51-payload-cms-collections)
- Security: [docs/HIGH-LEVEL-DESIGN.md#11-security-considerations](./docs/HIGH-LEVEL-DESIGN.md#11-security-considerations)
- Performance: [docs/HIGH-LEVEL-DESIGN.md#12-performance--scalability-strategy](./docs/HIGH-LEVEL-DESIGN.md#12-performance--scalability-strategy)

## 🐛 Issues

Found a bug? Please [open an issue](https://github.com/obadaDeg/Portfolio/issues).
