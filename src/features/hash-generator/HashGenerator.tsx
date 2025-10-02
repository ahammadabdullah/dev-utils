import { useState, useRef } from 'react';
import { ToolCard } from '@/components/ui/tool-card';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Hash, Upload, Wand2, Trash2, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { useHashGenerator, type HashType, type HashResult } from './useHashGenerator';

export function HashGenerator() {
  const {
    results,
    isGenerating,
    generateSingleHash,
    generateAllHashes,
    generateHashFromFile,
    clearResults
  } = useHashGenerator();

  const [input, setInput] = useState('');
  const [selectedHashType, setSelectedHashType] = useState<HashType>('sha256');
  const [singleResult, setSingleResult] = useState<HashResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hashTypes: { value: HashType; label: string; description: string }[] = [
    { value: 'md5', label: 'MD5', description: '128-bit hash (demo implementation, not real MD5)' },
    { value: 'sha1', label: 'SHA-1', description: '160-bit hash (deprecated for security)' },
    { value: 'sha256', label: 'SHA-256', description: '256-bit hash (recommended)' },
    { value: 'sha512', label: 'SHA-512', description: '512-bit hash (most secure)' }
  ];

  const handleGenerateSingle = async () => {
    try {
      const result = await generateSingleHash(input, selectedHashType);
      setSingleResult(result);
      toast.success(`${selectedHashType.toUpperCase()} hash generated successfully`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate hash');
    }
  };

  const handleGenerateAll = async () => {
    try {
      await generateAllHashes(input);
      toast.success('All hashes generated successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate hashes');
    }
  };

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${type} copied to clipboard`);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Limit file size to 10MB for performance
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    try {
      const result = await generateHashFromFile(file, selectedHashType);
      setSingleResult(result);
      toast.success(`Hash generated for file: ${file.name}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to process file');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClear = () => {
    setInput('');
    setSingleResult(null);
    clearResults();
  };

  const sampleText = "Hello, World! This is a sample text for hash generation.";
  const handleLoadSample = () => {
    setInput(sampleText);
  };

  const getHashColor = (type: HashType): string => {
    switch (type) {
      case 'md5': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'sha1': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'sha256': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'sha512': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <ToolCard
      title="Hash Generator"
      description="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text or files"
    >
      <div className="space-y-6">
        {/* Input Section */}
        <div>
          <SectionHeader title="Input Text">
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={handleLoadSample}>
                Sample Text
              </Button>
              <Button variant="outline" size="sm" onClick={handleClear}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </div>
          </SectionHeader>
          <Textarea
            placeholder="Enter text to generate hash..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[120px] font-mono text-sm"
          />
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            accept=".txt,.json,.xml,.csv,.log"
          />
        </div>

        {/* Hash Generation Tabs */}
        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single">Single Hash</TabsTrigger>
            <TabsTrigger value="all">All Hashes</TabsTrigger>
          </TabsList>

          {/* Single Hash Tab */}
          <TabsContent value="single" className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Hash Algorithm</label>
                <select
                  value={selectedHashType}
                  onChange={(e) => setSelectedHashType(e.target.value as HashType)}
                  className="w-full p-2 border border-input bg-background rounded-md text-sm"
                >
                  {hashTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label} - {type.description}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pt-6">
                <Button
                  onClick={handleGenerateSingle}
                  disabled={!input.trim() || isGenerating}
                  size="sm"
                >
                  <Hash className="h-4 w-4 mr-2" />
                  {isGenerating ? 'Generating...' : 'Generate'}
                </Button>
              </div>
            </div>

            {singleResult && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={getHashColor(singleResult.type)}>
                      {singleResult.type.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Generated at {singleResult.timestamp}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(singleResult.hash, singleResult.type.toUpperCase())}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm font-mono break-all">{singleResult.hash}</code>
                </div>
              </div>
            )}
          </TabsContent>

          {/* All Hashes Tab */}
          <TabsContent value="all" className="space-y-4">
            <div className="flex justify-center">
              <Button
                onClick={handleGenerateAll}
                disabled={!input.trim() || isGenerating}
                size="sm"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating All...' : 'Generate All Hashes'}
              </Button>
            </div>

            {results.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Generated Hashes</h4>
                  <span className="text-sm text-muted-foreground">
                    Generated at {results[0]?.timestamp}
                  </span>
                </div>
                <div className="grid gap-4">
                  {results.map((result) => (
                    <div key={result.type} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge className={getHashColor(result.type)}>
                          {result.type.toUpperCase()}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy(result.hash, result.type.toUpperCase())}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </Button>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <code className="text-sm font-mono break-all">{result.hash}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Information Panel */}
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">Hash Algorithm Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <strong>Security Levels:</strong>
              <ul className="mt-1 space-y-1 ml-4">
                <li>• <span className="text-red-600">MD5</span> - Demo only, not real MD5 algorithm</li>
                <li>• <span className="text-orange-600">SHA-1</span> - Deprecated, avoid for security</li>
                <li>• <span className="text-green-600">SHA-256</span> - Secure, widely recommended</li>
                <li>• <span className="text-blue-600">SHA-512</span> - Most secure, larger output</li>
              </ul>
            </div>
            <div>
              <strong>Common Use Cases:</strong>
              <ul className="mt-1 space-y-1 ml-4">
                <li>• File integrity verification</li>
                <li>• Password hashing (with salt)</li>
                <li>• Digital signatures</li>
                <li>• Data deduplication</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ToolCard>
  );
}
