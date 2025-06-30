# Project Structure

```
dev-utils/
├── .github/
│   └── workflows/
│       └── release.yml          # GitHub Actions for automated releases
├── assets/
│   ├── icon.png                 # Application icon
│   └── screenshot.png           # Screenshot for README
├── public/
│   └── favicon.ico              # Web favicon
├── src/
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── command.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── input-with-copy.tsx
│   │   │   ├── label.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── section-header.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── theme-toggle.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── toggle.tsx
│   │   │   └── tool-card.tsx
│   │   └── windows/
│   │       └── window-bar.tsx   # Custom window controls
│   ├── features/                # Feature modules
│   │   ├── color-picker/
│   │   │   ├── ColorPicker.tsx
│   │   │   └── useColorPicker.ts
│   │   ├── html-to-jsx/
│   │   │   ├── HtmlToJsx.tsx
│   │   │   └── useHtmlToJsx.ts
│   │   ├── json-formatter/
│   │   │   ├── JsonFormatter.tsx
│   │   │   └── useJsonFormatter.ts
│   │   ├── regex-tester/
│   │   │   ├── RegexTester.tsx
│   │   │   └── useRegexTester.ts
│   │   ├── svg-to-jsx/
│   │   │   ├── SvgToJsx.tsx
│   │   │   └── useSvgToJsx.ts
│   │   ├── timestamp-converter/
│   │   │   ├── TimestampConverter.tsx
│   │   │   └── useTimestampConverter.ts
│   │   └── uuid-generator/
│   │       ├── UuidGenerator.tsx
│   │       └── useUuidGenerator.ts
│   ├── hooks/
│   │   └── use-toast.ts         # Toast hook
│   ├── layout/
│   │   ├── MainLayout.tsx       # Main application layout
│   │   └── Sidebar.tsx          # Navigation sidebar
│   ├── lib/
│   │   ├── types.ts             # Type definitions
│   │   └── utils.ts             # Utility functions
│   ├── types/
│   │   ├── global.d.ts          # Global type definitions
│   │   └── vite-env.d.ts        # Vite environment types
│   ├── App.css                  # Main app styles
│   ├── App.tsx                  # Main app component
│   ├── index.css                # Global styles
│   └── main.tsx                 # React entry point
├── .gitignore                   # Git ignore rules
├── CHANGELOG.md                 # Version changelog
├── LICENSE                      # MIT License
├── README.md                    # Project documentation
├── components.json              # shadcn/ui configuration
├── electron.cjs                 # Electron main process
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── postcss.config.js            # PostCSS configuration
├── preload.cjs                  # Electron preload script
├── release.bat                  # Windows release script
├── release.sh                   # Unix release script
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.app.json            # TypeScript app config
├── tsconfig.json                # TypeScript base config
├── tsconfig.node.json           # TypeScript Node config
└── vite.config.ts               # Vite configuration
```

## Key Files Explained

### Core Application Files

- **electron.cjs**: Main Electron process, handles window creation and system interactions
- **preload.cjs**: Security bridge between main and renderer processes
- **src/main.tsx**: React application entry point
- **src/App.tsx**: Main React component with routing and theming

### Configuration Files

- **package.json**: Project metadata, dependencies, and build configuration
- **vite.config.ts**: Build tool configuration
- **tailwind.config.js**: CSS framework configuration
- **components.json**: shadcn/ui component library configuration

### Build & Release

- **.github/workflows/release.yml**: Automated GitHub releases
- **release.bat** / **release.sh**: Local build scripts
- **dist/**: Generated build outputs (gitignored)

### Development

- **eslint.config.js**: Code linting rules
- **tsconfig.\*.json**: TypeScript compilation settings
- **postcss.config.js**: CSS processing configuration
