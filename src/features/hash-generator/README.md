# Hash Generator Tool

A comprehensive hash generation tool that supports multiple hash algorithms including MD5, SHA-1, SHA-256, and SHA-512.

## Features

### Hash Algorithms Supported
- **MD5**: Demo implementation (not cryptographically secure)
- **SHA-1**: 160-bit hash using Web Crypto API (deprecated for security)
- **SHA-256**: 256-bit hash using Web Crypto API (recommended)
- **SHA-512**: 512-bit hash using Web Crypto API (most secure)

### Functionality
- **Single Hash Generation**: Generate hash for specific algorithm
- **Batch Hash Generation**: Generate all supported hashes at once
- **File Hash Support**: Upload and hash text files (up to 10MB)
- **Copy to Clipboard**: One-click copy for all generated hashes
- **Real-time Generation**: Instant hash generation with loading states

### UI Features
- **Tabbed Interface**: Switch between single and batch hash generation
- **Color-coded Results**: Different colors for each hash type
- **Timestamp Tracking**: Shows when hashes were generated
- **Sample Text**: Quick sample text for testing
- **File Upload**: Drag and drop or click to upload files
- **Clear Function**: Reset all inputs and outputs

## Usage

### Text Hashing
1. Enter text in the input area
2. Select hash algorithm (for single hash) or use "Generate All"
3. Click generate button
4. Copy results using the copy button

### File Hashing
1. Click "Upload File" button
2. Select a text file (max 10MB)
3. Hash will be generated automatically
4. Copy the result

## Security Notes

- **MD5**: This is a demo implementation and should NOT be used for security purposes
- **SHA-1**: Deprecated for cryptographic use, included for compatibility
- **SHA-256/SHA-512**: Use Web Crypto API and are suitable for security applications

## Technical Implementation

### Hook: `useHashGenerator`
- Manages hash generation state
- Handles file processing
- Provides batch and single hash generation
- Uses Web Crypto API for SHA algorithms

### Component: `HashGenerator`
- Responsive UI with tabs
- File upload handling
- Copy to clipboard functionality
- Error handling and user feedback

## File Structure
```
hash-generator/
├── HashGenerator.tsx     # Main component
├── useHashGenerator.ts   # Custom hook
└── README.md            # This documentation
```

## Future Enhancements
- Add crypto-js library for proper MD5 implementation
- Support for more hash algorithms (BLAKE2, etc.)
- Binary file hash support
- Hash comparison functionality
- Batch file processing
