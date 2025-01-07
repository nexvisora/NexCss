# Contributing to NexCSS 🎨

First off, thank you for considering contributing to NexCSS! It's people like you that make NexCSS such a great tool.

## 🚀 Quick Start

1. Fork the repository
2. Clone your fork: `git clone https://github.com/nexvisora/NexCss.git`
3. Create your feature branch: `git checkout -b feature/amazing-feature`
4. Install dependencies: `npm install`
5. Start development server: `npm run dev`

## 💻 Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Run linting
npm run lint
```

## 📝 Development Guidelines

### Code Style

- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use TypeScript for type safety

### CSS Guidelines

- Follow the utility-first approach
- Keep utilities atomic and single-purpose
- Use semantic class names
- Follow BEM naming convention for components
- Maintain backward compatibility

### Commit Messages

Format: `type(scope): description`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

Example:
```
feat(utilities): add new border-radius utilities
```

## 🧪 Testing

- Write tests for new features
- Update existing tests when modifying features
- Run the full test suite before submitting PR
- Aim for high test coverage

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 📚 Documentation

- Update documentation for new features
- Include examples in markdown files
- Keep README.md up to date
- Add JSDoc comments for functions

## 🔄 Pull Request Process

1. Update the README.md with details of changes
2. Update the CHANGELOG.md following semver
3. Ensure all tests pass
4. Get review from two team members
5. Squash commits before merging

## 🐛 Bug Reports

Please include:
- NexCSS version
- Browser/Node.js version
- Minimal reproduction
- Expected vs actual behavior
- Screenshots if relevant

## 💡 Feature Requests

- Explain the use case
- Provide example usage
- Consider performance implications
- Discuss alternatives considered

## 🤝 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone.

### Our Standards

- Use welcoming language
- Be respectful of differing viewpoints
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

### Enforcement

- First violation: Warning
- Second violation: Temporary ban
- Third violation: Permanent ban

## 📋 Project Structure

```
nexcss/
├── src/
│   ├── core/          # Core utilities
│   ├── components/    # Component styles
│   ├── plugins/       # Plugin system
│   └── utils/         # Helper functions
├── tests/             # Test files
├── docs/              # Documentation
└── examples/          # Example usage
```

## 🔧 Build System

- Uses PostCSS for processing
- Rollup for bundling
- TypeScript for type checking
- Jest for testing

## 🎯 Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create release branch
4. Run tests and build
5. Create GitHub release
6. Publish to npm

## 💪 Support

- Join our [Discord](https://discord.com/channels/1326137541207785526/1326137546316578829)
- Check [Stack Overflow](https://stackoverflow.com/questions/tagged/nexcss)

## 📜 License

By contributing, you agree that your contributions will be licensed under the same terms as the project.

---

Thank you for contributing to NexCSS! 🙏