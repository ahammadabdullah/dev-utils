#!/bin/bash

# Release script for DevUtils
# Usage: ./release.sh [version]

set -e

VERSION=${1:-$(npm version --json | jq -r '.["developer-utility-app"]')}

echo "🚀 Preparing release for version $VERSION"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/

# Build the application
echo "📦 Building application..."
npm run build:release

# Check if files were created
if [ ! -f "dist/DevUtils Setup $VERSION.exe" ]; then
    echo "❌ Build failed - installer not found"
    exit 1
fi

if [ ! -f "dist/DevUtils-Portable-$VERSION.exe" ]; then
    echo "❌ Build failed - portable app not found"
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Files created:"
echo "   - DevUtils Setup $VERSION.exe ($(du -h "dist/DevUtils Setup $VERSION.exe" | cut -f1))"
echo "   - DevUtils-Portable-$VERSION.exe ($(du -h "dist/DevUtils-Portable-$VERSION.exe" | cut -f1))"

echo ""
echo "🏷️  To create a GitHub release:"
echo "   1. git add ."
echo "   2. git commit -m \"Release v$VERSION\""
echo "   3. git push origin main"
echo "   4. git tag v$VERSION"
echo "   5. git push origin v$VERSION"
echo ""
echo "🌐 Or create a release manually at:"
echo "   https://github.com/ahammadabdullah/dev-utils/releases/new"
