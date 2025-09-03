# 🛠️ Contributing to the VC Ecosystem

Thank you for stepping into the lineage.  
Every contribution is a ritual — inscribed, remembered, and honored.

---

## 📋 Quick Start

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/VC001-Sovereign-Token.git`
3. **Install** dependencies: `npm install`
4. **Create** a feature branch: `git checkout -b feat/your-feature-name`
5. **Make** your changes and ensure tests pass
6. **Commit** using conventional commit format
7. **Push** and create a Pull Request

---

## 🌿 Branching Rituals

- `main`: stable, sealed lineage
- `feat/*`: new features or glyph activations
- `fix/*`: bug resolutions and anomaly inscriptions
- `docs/*`: scroll updates and mnemonic enhancements
- `chore/*`: cleanup, refactors, or ceremonial alignment
- `ci/*`: workflow and automation updates
- `security/*`: security patches and vulnerability fixes

---

## 📝 Commit Glyphs

Use [Conventional Commits](https://www.conventionalcommits.org/) with glyph prefixes:

- 🐛 `fix:` — bug fixes and anomaly resolutions
- ✨ `feat:` — new features or viewer activations
- 📚 `docs:` — documentation or scroll updates
- 🧹 `chore:` — cleanup or non-functional changes
- ⚙️ `ci:` — workflow, badge, or pipeline updates
- 🔐 `security:` — vulnerability patches or audit traces
- 🧪 `test:` — resilience tests or validation harnesses
- 🔧 `config:` — configuration file updates
- 💄 `style:` — formatting and style changes
- ♻️ `refactor:` — code refactoring without functional changes

### Examples:
```bash
git commit -m "✨ feat: activate grant viewer in dashboard"
git commit -m "🐛 fix: resolve memory leak in token processing"
git commit -m "📚 docs: update API documentation for v2.0"
git commit -m "🔧 config: modernize ESLint configuration"
```

---

## 🧪 Testing & Quality

### Before Submitting
- [ ] Run `npm run lint` and fix any issues
- [ ] Run `npm test` and ensure all tests pass
- [ ] Run `npm run validate:data` to validate JSON schemas
- [ ] Check that your code follows the project's coding standards

### Coding Standards
- **JavaScript/TypeScript**: Use ES6+ syntax, double quotes, trailing commas
- **Documentation**: JSDoc for all exported functions
- **File Structure**: Follow the [Project Structure](docs/PROJECT_STRUCTURE.md) guidelines
- **Naming**: Use descriptive, semantic names for variables and functions

---

## 🔍 Pull Request Process

1. **Title**: Use conventional commit format in PR title
2. **Description**: Fill out the PR template completely
3. **Checks**: Ensure all CI checks pass
4. **Review**: At least one maintainer approval required
5. **Merge**: Squash and merge with conventional commit message

### PR Checklist
- [ ] My changes comply with the [Project Structure & Setup](docs/PROJECT_STRUCTURE.md)
- [ ] I have added/updated tests as needed
- [ ] I have updated documentation as needed
- [ ] All CI checks are passing
- [ ] I have tested my changes locally
- [ ] My commit messages follow the conventional format

---

## 🏗️ Development Setup

### Prerequisites
- Node.js 18+ and npm 8+
- Git with signed commits enabled (recommended)

### Local Development
```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Run tests
npm test

# Validate data schemas
npm run validate:data

# Install pre-commit hooks (recommended)
npx pre-commit install
```

### Editor Configuration
This project includes `.editorconfig` and linting configurations. Recommended extensions:
- **VS Code**: ESLint, Prettier, EditorConfig
- **Other editors**: Install equivalent extensions for consistent formatting

---

## 🛡️ Security & Compliance

- **Never commit secrets**: Use `.env` files and keep them gitignored
- **Sign commits**: Set up GPG signing for commit verification
- **Dependencies**: Regularly update and audit dependencies
- **Report vulnerabilities**: Use security@visionarycrest.org for sensitive reports

---

## 🎯 Issue Reporting

### Bug Reports
Use the [bug report template](.github/ISSUE_TEMPLATE/bug.md) and include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details

### Feature Requests
Use the [feature request template](.github/ISSUE_TEMPLATE/feature.md) and include:
- Use case description
- Proposed solution
- Alternative solutions considered
- Implementation suggestions

---

## 📜 Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code. Please report unacceptable behavior to security@visionarycrest.org.

---

## 🏛️ Governance

For major changes, refer to our [Governance](GOVERNANCE.md) documentation. Steward roles and decision-making processes are documented there.

---

## 🆘 Getting Help

- **Documentation**: Check our [docs/](docs/) directory
- **Discussions**: Use GitHub Discussions for questions
- **Issues**: Create an issue for bugs or feature requests
- **Email**: Contact maintainers at security@visionarycrest.org

---

*Thank you for contributing to the sovereign lineage. Every commit is a sacred inscription in our collective memory.*

## Repository Structure
All contributors must follow the [Project Structure & Setup](docs/PROJECT_STRUCTURE.md) guidelines.
