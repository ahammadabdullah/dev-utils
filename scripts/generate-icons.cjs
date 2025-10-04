#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');
const iconPng = path.join(assetsDir, 'icon.png');
const iconsetDir = path.join(assetsDir, 'icon.iconset');
const iconIcns = path.join(assetsDir, 'icon.icns');

// Check if we're on macOS
const isMacOS = process.platform === 'darwin';

// Icon sizes for macOS iconset
const iconSizes = [
  { size: 16, name: 'icon_16x16.png' },
  { size: 32, name: 'icon_16x16@2x.png' },
  { size: 32, name: 'icon_32x32.png' },
  { size: 64, name: 'icon_32x32@2x.png' },
  { size: 128, name: 'icon_128x128.png' },
  { size: 256, name: 'icon_128x128@2x.png' },
  { size: 256, name: 'icon_256x256.png' },
  { size: 512, name: 'icon_256x256@2x.png' },
  { size: 512, name: 'icon_512x512.png' },
  { size: 1024, name: 'icon_512x512@2x.png' }
];

function log(message) {
  console.log(`[Icon Generator] ${message}`);
}

function checkDependencies() {
  if (!fs.existsSync(iconPng)) {
    throw new Error(`Source icon not found: ${iconPng}`);
  }

  if (isMacOS) {
    try {
      execSync('which sips', { stdio: 'ignore' });
      execSync('which iconutil', { stdio: 'ignore' });
    } catch (error) {
      throw new Error('macOS tools (sips, iconutil) not available. Make sure you\'re running on macOS.');
    }
  } else {
    log('Warning: Not running on macOS. Skipping .icns generation.');
    log('The .icns file should be generated on macOS for best compatibility.');
  }
}

function createIconset() {
  if (!isMacOS) {
    log('Skipping iconset creation (not macOS)');
    return;
  }

  // Remove existing iconset directory if it exists
  if (fs.existsSync(iconsetDir)) {
    fs.rmSync(iconsetDir, { recursive: true });
    log('Removed existing iconset directory');
  }

  // Create iconset directory
  fs.mkdirSync(iconsetDir, { recursive: true });
  log('Created iconset directory');

  // Generate all icon sizes
  for (const { size, name } of iconSizes) {
    const outputPath = path.join(iconsetDir, name);
    const command = `sips -z ${size} ${size} "${iconPng}" --out "${outputPath}"`;
    
    try {
      execSync(command, { stdio: 'pipe' });
      log(`Generated ${name} (${size}x${size})`);
    } catch (error) {
      throw new Error(`Failed to generate ${name}: ${error.message}`);
    }
  }
}

function generateIcns() {
  if (!isMacOS) {
    log('Skipping .icns generation (not macOS)');
    return;
  }

  try {
    // Remove existing .icns file if it exists
    if (fs.existsSync(iconIcns)) {
      fs.unlinkSync(iconIcns);
      log('Removed existing .icns file');
    }

    // Convert iconset to .icns
    const command = `iconutil -c icns "${iconsetDir}"`;
    execSync(command, { stdio: 'pipe' });
    log(`Generated icon.icns successfully`);

    // Clean up iconset directory
    fs.rmSync(iconsetDir, { recursive: true });
    log('Cleaned up iconset directory');

  } catch (error) {
    throw new Error(`Failed to generate .icns file: ${error.message}`);
  }
}

function validateOutput() {
  if (isMacOS && !fs.existsSync(iconIcns)) {
    throw new Error('icon.icns was not created successfully');
  }
  
  if (isMacOS) {
    const stats = fs.statSync(iconIcns);
    log(`icon.icns created successfully (${Math.round(stats.size / 1024)}KB)`);
  }
}

// Main execution
async function main() {
  try {
    log('Starting icon generation...');
    
    checkDependencies();
    createIconset();
    generateIcns();
    validateOutput();
    
    log('Icon generation completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`[Icon Generator] Error: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main };