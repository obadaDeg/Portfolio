# Contributing to Multi-Persona Portfolio

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Development Setup

1. **Prerequisites**
   - Node.js 20+
   - pnpm 8+
   - Docker & Docker Compose

2. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Portfolio.git
   cd Portfolio
   ```

3. **Install Dependencies**
   ```bash
   pnpm install
   ```

4. **Start Development Environment**
   ```bash
   # Start PostgreSQL
   docker-compose up -d

   # Start development server
   pnpm dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Admin: http://localhost:3000/admin

## Code Style

This project uses:
- **ESLint** for linting
- **Prettier** for code formatting
- **TypeScript** for type safety

Run before committing:
```bash
pnpm lint        # Check for linting errors
pnpm format      # Format code
pnpm type-check  # Check TypeScript types
```

## Commit Guidelines

Follow conventional commits format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example:
```
feat: add project filtering by skill
fix: resolve persona routing issue
docs: update README with deployment instructions
```

## Pull Request Process

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, well-documented code
   - Follow the existing code style
   - Add tests if applicable

3. **Test Your Changes**
   ```bash
   pnpm lint
   pnpm type-check
   pnpm build
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Submit for review

## Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] All tests pass
- [ ] No linting errors

## Screenshots (if applicable)

## Additional Notes
```

## Code Review Process

- All PRs require at least one review
- Address review comments promptly
- Keep PRs focused and reasonably sized
- Update your branch with main if needed

## Reporting Issues

When reporting issues, please include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)
- Screenshots or error logs if applicable

## Feature Requests

For feature requests:
- Check existing issues first
- Clearly describe the feature
- Explain the use case
- Consider implementation approach

## Questions?

Feel free to:
- Open an issue for questions
- Reach out to maintainers
- Join discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
