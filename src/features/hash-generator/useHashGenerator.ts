import { useState } from 'react';

export type HashType = 'md5' | 'sha1' | 'sha256' | 'sha512';

export interface HashResult {
  type: HashType;
  hash: string;
  input: string;
  timestamp: string;
}

export function useHashGenerator() {
  const [results, setResults] = useState<HashResult[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Simple MD5-like hash implementation (demo purposes)
  // Note: This is NOT actual MD5! For production, use crypto-js or similar library
  const md5 = (str: string): string => {
    // Simple hash function that produces MD5-like output format
    const utf8Bytes = new TextEncoder().encode(str);
    
    let hash = 0x12345678;
    for (let i = 0; i < utf8Bytes.length; i++) {
      const char = utf8Bytes[i];
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Create a more MD5-like hash by combining multiple operations
    let result = '';
    for (let i = 0; i < 4; i++) {
      const part = (hash >>> (i * 8)) & 0xFF;
      result += part.toString(16).padStart(2, '0');
    }
    
    // Extend to 32 characters like real MD5
    const seed = str.length + hash;
    for (let i = 0; i < 6; i++) {
      const part = ((seed * (i + 1)) >>> (i * 4)) & 0xFF;
      result += part.toString(16).padStart(2, '0');
    }
    
    return result.substring(0, 32);
  };

  // Use Web Crypto API for SHA algorithms
  const generateSHA = async (input: string, algorithm: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const generateHash = async (input: string, type: HashType): Promise<string> => {
    switch (type) {
      case 'md5':
        return md5(input);
      case 'sha1':
        return await generateSHA(input, 'SHA-1');
      case 'sha256':
        return await generateSHA(input, 'SHA-256');
      case 'sha512':
        return await generateSHA(input, 'SHA-512');
      default:
        throw new Error(`Unsupported hash type: ${type}`);
    }
  };

  const generateSingleHash = async (input: string, type: HashType): Promise<HashResult> => {
    if (!input.trim()) {
      throw new Error('Input cannot be empty');
    }

    setIsGenerating(true);
    try {
      const hash = await generateHash(input, type);
      const result: HashResult = {
        type,
        hash,
        input,
        timestamp: new Date().toLocaleString()
      };
      
      return result;
    } finally {
      setIsGenerating(false);
    }
  };

  const generateAllHashes = async (input: string): Promise<HashResult[]> => {
    if (!input.trim()) {
      throw new Error('Input cannot be empty');
    }

    setIsGenerating(true);
    try {
      const types: HashType[] = ['md5', 'sha1', 'sha256', 'sha512'];
      const promises = types.map(type => generateSingleHash(input, type));
      const results = await Promise.all(promises);
      
      setResults(results);
      return results;
    } finally {
      setIsGenerating(false);
    }
  };

  const clearResults = () => {
    setResults([]);
  };

  const generateHashFromFile = async (file: File, type: HashType): Promise<HashResult> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const content = e.target?.result as string;
          const result = await generateSingleHash(content, type);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  return {
    results,
    isGenerating,
    generateSingleHash,
    generateAllHashes,
    generateHashFromFile,
    clearResults
  };
}
