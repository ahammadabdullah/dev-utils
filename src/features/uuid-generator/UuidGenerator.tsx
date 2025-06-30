import { useState, useEffect } from 'react';
import { ToolCard } from '@/components/ui/tool-card';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputWithCopy } from '@/components/ui/input-with-copy';
import { Textarea } from '@/components/ui/textarea';
import { RefreshCw, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useUuidGenerator } from './useUuidGenerator';

export function UuidGenerator() {
  const { generateUuid, generateMultiple } = useUuidGenerator();
  const [singleUuid, setSingleUuid] = useState('');
  const [multipleUuids, setMultipleUuids] = useState('');
  const [count, setCount] = useState(5);

  const handleGenerateSingle = () => {
    setSingleUuid(generateUuid());
  };

  const handleGenerateMultiple = () => {
    const uuids = generateMultiple(count);
    setMultipleUuids(uuids.join('\n'));
  };

  const handleCopyMultiple = async () => {
    try {
      await navigator.clipboard.writeText(multipleUuids);
      toast.success('UUIDs copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  // Generate initial UUID
  useEffect(() => {
    handleGenerateSingle();
  }, []);

  return (
    <ToolCard 
      title="UUID Generator" 
      description="Generate UUID v4 identifiers for your applications"
    >
      <div className="space-y-6">
        <div>
          <SectionHeader title="Single UUID">
            <Button onClick={handleGenerateSingle} size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate New
            </Button>
          </SectionHeader>
          <InputWithCopy 
            value={singleUuid}
            readOnly
            placeholder="Generated UUID will appear here..."
          />
        </div>

        <div>
          <SectionHeader title="Multiple UUIDs">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
                className="w-20"
              />
              <Button onClick={handleGenerateMultiple} size="sm">
                Generate
              </Button>
            </div>
          </SectionHeader>
          <div className="relative">
            <Textarea
              value={multipleUuids}
              readOnly
              className="min-h-[200px] font-mono text-sm"
              placeholder="Multiple UUIDs will appear here..."
            />
            {multipleUuids && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyMultiple}
                className="absolute top-2 right-2"
              >
                <Copy className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">About UUID v4</h4>
          <p className="text-sm text-muted-foreground">
            UUID v4 generates random 128-bit identifiers. The probability of generating 
            duplicate UUIDs is negligible, making them suitable for distributed systems 
            where unique identifiers are required without coordination.
          </p>
        </div>
      </div>
    </ToolCard>
  );
}