# DevUtils - Developer Utility Tools

A collection of essential developer utility tools built with Electron, React, and TypeScript.

![DevUtils Screenshot](assets/screenshot.png)

## 🚀 Features

- **JSON Formatter** - Format, validate, and prettify JSON data
- **Regex Tester** - Test regular expressions with real-time matching
- **UUID Generator** - Generate various types of UUIDs
- **Timestamp Converter** - Convert between different timestamp formats
- **Color Picker** - Pick colors and convert between different color formats
- **HTML to JSX** - Convert HTML code to JSX format
- **SVG to JSX** - Convert SVG code to JSX components

## 📋 System Requirements

- Windows 10 or later (64-bit)
- macOS 10.13 or later (Intel or Apple Silicon)
- No additional dependencies required

## 📥 Download

### Latest Release

Download the latest version from the [Releases](https://github.com/ahammadabdullah/dev-utils/releases) page:

- **Windows Installer**: `DevUtils-Setup-{version}.exe` - Full installer with shortcuts
- **Windows Portable**: `DevUtils-Portable-{version}.exe` - Portable version, no installation required
- **macOS DMG**: `DevUtils-{version}.dmg` - macOS disk image installer

## 🔧 Installation

### Windows Installer Version

1. Download `DevUtils-Setup-{version}.exe`
2. Run the installer
3. Follow the installation wizard
4. Launch DevUtils from the Start Menu or Desktop shortcut

### Windows Portable Version

1. Download `DevUtils-Portable-{version}.exe`
2. Run the executable directly — no installation needed
3. The app will run immediately

### macOS Version

1. Download `DevUtils-{version}.dmg`
2. Open the DMG and drag **DevUtils.app** to your **Applications** folder
3. Launch DevUtils from Launchpad or Finder
4. (If prompted by Gatekeeper) Right-click the app → **Open** once to allow unsigned apps

## 🛠️ Development

This project is built with:

- **Electron** - Desktop app framework
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components

### Building from Source

```bash
# Clone the repository
git clone https://github.com/ahammadabdullah/dev-utils.git
cd dev-utils

# Install dependencies
npm install

# Run in development mode
npm run dev
npm run electron

# Build for production (Windows)
npm run build:release
```
### Building for macOS
To build the macOS version of DevUtils, follow these steps:

#### Prerequisites
- You must be on macOS to build macOS artifacts (Apple’s signing and packaging restrictions prevent cross-building from Windows or Linux).

- Node.js (LTS) and npm installed.

- Xcode Command Line Tools installed:
```bash
xcode-select --install
```
- (Optional) Apple Developer ID and notarization credentials, if you plan to sign and distribute the app.

#### Commands

**Generate icons (required before packaging):**
```bash
npm run predist:mac
# This runs "npm run generate:icons"
```

**Build and package** (two options):

1. Single-step build and package
```bash
npm run build:release:mac
# # Runs "npm run build" + "npm run dist:mac"
```

2. Manual two-step
```bash
npm run build
npm run dist:mac
```
The packaged `.dmg` file will be available inside the `release/` directory.

#### Notes

- The macOS build uses electron-builder --mac (as defined in package.json).

- Targets both x64 and arm64 architectures.

- Minimum supported version: macOS 10.13.

- The build uses Hardened Runtime and config/entitlements.mac.plist for signing.

- Unsigned local builds will still run but may show Gatekeeper warnings.

#### Troubleshooting

- If electron-builder throws "macOS builds can only be run on macOS", you are attempting to build on Windows/Linux.

- If icons or assets are missing, re-run:
```bash
npm run predist:mac
```

## 🤝 Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://builtbypiyush.me"><img src="https://avatars.githubusercontent.com/u/70336252?v=4?s=100" width="100px;" alt="Piyush dixit"/><br /><sub><b>Piyush dixit</b></sub></a><br /><a href="#code-Er-luffy-D" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rohandol112"><img src="https://avatars.githubusercontent.com/u/133633875?v=4?s=100" width="100px;" alt="rohandol112"/><br /><sub><b>rohandol112</b></sub></a><br /><a href="#code-rohandol112" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://frustateduser.github.io/koustubh.github.io/"><img src="https://avatars.githubusercontent.com/u/137117503?v=4?s=100" width="100px;" alt="KOUSTUBH BADSHAH"/><br /><sub><b>KOUSTUBH BADSHAH</b></sub></a><br /><a href="#code-frustateduser" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Parthav46"><img src="https://avatars.githubusercontent.com/u/25856645?v=4?s=100" width="100px;" alt="Parthav Patel"/><br /><sub><b>Parthav Patel</b></sub></a><br /><a href="#code-Parthav46" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please open an issue on the [Issues](https://github.com/ahammadabdullah/dev-utils/issues) page.

## 📊 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes in each version.

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

**Note:** DevUtils now supports both Windows and macOS builds. Linux support may be added in the future.

