# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- ## [Unreleased] -->

<!-- Add new changes here before the next release -->

## [1.1.2] - 2025-10-03

### Technical

- Added blockmap to the release
- Specified artifact name for the auto-updater

## [1.1.1] - 2025-10-03

### Added

- **Auto Updater** integration for seamless updates
- **Release method updated** to use manual github release workflow
- **logger** for better debugging and diagnostics

### Fixed

- Minor bug fixes and stability improvements

## [1.1.0] - 2025-10-03

### Added

- **Release method updated** to use `electron-builder` for packaging and publishing
- **Version number** now displayed in the application title bar
- New tools:
  - **Base58 & Base64 Encoder/Decoder** – Encode and decode strings
  - **JWT Decoder** – Decode and inspect JWT tokens
  - **.gitignore Generator** – Generate `.gitignore` files with ease

### Changed

- Improved validation logic in **HTML to JSX Converter** for more reliable output

### Fixed

- Minor bug fixes and stability improvements

### Technical

- **Husky** and **Prettier** added for pre-commit linting and code formatting
- **electron-log** integrated for better application logging
- **electron-updater** configured for automatic updates
- **GitHub Actions** workflow updated for improved release automation

## [1.0.1] - 2025-07-01

### Fixed

- Fixed blank screen issue in production builds
- Improved development/production environment detection
- Removed dependency on electron-is-dev for more reliable detection
- Enhanced resource path handling for packaged applications

### Changed

- Updated build scripts with better separation of dev/prod modes
- Improved error handling and debug logging

## [1.0.0] - 2025-07-01

### Added

- Initial release of DevUtils
- JSON Formatter with syntax highlighting and validation
- Regex Tester with real-time pattern matching
- UUID Generator supporting multiple UUID versions
- Timestamp Converter for various timestamp formats
- Color Picker with multiple color format support
- HTML to JSX converter
- SVG to JSX converter
- Dark/Light theme support
- System tray integration
- Custom window controls
- Windows installer and portable versions

### Features

- Modern UI built with React and Tailwind CSS
- Electron-based desktop application
- Windows-only release (64-bit)
- No external dependencies required
- Lightweight and fast performance

### Technical

- Built with Electron 37.1.0
- React 18.3.1 with TypeScript
- Vite build system for fast development
- shadcn/ui component library
- ESLint and TypeScript for code quality
