# Contributing to DevUtils

Thank you for your interest in contributing to DevUtils! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Development Setup

1. **Fork and Clone**

   ```bash
   git clone https://github.com/ahammadabdullah/dev-utils.git
   cd dev-utils
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Development Server**

   ```bash
   # Terminal 1: Start Vite dev server
   npm run dev

   # Terminal 2: Start Electron app
   npm run electron
   ```

4. **Build for Testing**
   ```bash
   npm run build:release
   ```

## 📝 How to Contribute

### Reporting Bugs

- Use the [Issues](https://github.com/ahammadabdullah/dev-utils/issues) page
- Include steps to reproduce
- Provide system information (OS, version)
- Include screenshots if applicable

### Suggesting Features

- Open an issue with the "enhancement" label
- Describe the feature and its benefits
- Consider implementation complexity

### Code Contributions

1. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**

   - Follow the existing code style
   - Write clear commit messages
   - Test your changes thoroughly

3. **Commit Guidelines**

   ```bash
   git commit -m "feat: add new utility tool"
   git commit -m "fix: resolve timestamp conversion bug"
   git commit -m "docs: update README with new screenshots"
   ```

4. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🏗️ Project Structure

```
src/
├── components/ui/          # Reusable UI components
├── features/              # Feature-specific components
├── hooks/                 # Custom React hooks
├── layout/               # Layout components
├── lib/                  # Utilities and helpers
└── types/                # TypeScript definitions
```

## 🎨 Adding New Tools

To add a new utility tool:

1. **Create Feature Directory**

   ```
   src/features/your-tool/
   ├── YourTool.tsx
   └── useYourTool.ts
   ```

2. **Implement the Tool**

   - Use the ToolCard component wrapper
   - Follow existing patterns for UI consistency
   - Add proper TypeScript types

3. **Add to Navigation**

   - Update `src/lib/types.ts` with the new tool type
   - Add icon and metadata to TOOLS array

4. **Export and Route**
   - Export from feature directory
   - Add to main App.tsx routing

## 🧪 Testing

- Test all functionality manually
- Ensure responsive design works
- Test both light and dark themes
- Verify Electron build works correctly

## 📐 Code Style

### TypeScript

- Use strict TypeScript settings
- Prefer interfaces over types for objects
- Use proper return types for functions

### React

- Use functional components with hooks
- Follow React best practices
- Use proper prop typing

### Styling

- Use Tailwind CSS classes
- Follow existing design patterns
- Ensure dark mode compatibility

## 🔧 Technologies Used

- **Electron**: Desktop app framework
- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI components
- **Lucide React**: Icons

## 📦 Building and Releases

### Local Development Build

```bash
npm run build:release
```

### Creating Releases

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create and push git tag
4. GitHub Actions will handle the rest

## ❓ Need Help?

- Check existing [Issues](https://github.com/ahammadabdullah/dev-utils/issues)
- Look at the codebase for examples
- Feel free to ask questions in issues

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to DevUtils! 🎉
