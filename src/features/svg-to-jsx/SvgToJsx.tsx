import { useState } from 'react';
import { ToolCard } from '@/components/ui/tool-card';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { useSvgToJsx } from './useSvgToJsx';

export function SvgToJsx() {
  const { convertSvgToJsx } = useSvgToJsx();
  const [svgInput, setSvgInput] = useState('');
  const [jsxOutput, setJsxOutput] = useState('');

  const handleConvert = () => {
    const result = convertSvgToJsx(svgInput);
    setJsxOutput(result);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsxOutput);
      toast.success('JSX copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleClear = () => {
    setSvgInput('');
    setJsxOutput('');
  };

  const sampleSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

  const handleLoadSample = () => {
    setSvgInput(sampleSvg);
  };

  return (
    <ToolCard 
      title="SVG to JSX" 
      description="Convert SVG markup to React JSX components with proper attribute formatting"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <SectionHeader title="SVG Input">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleLoadSample}>
                Sample
              </Button>
              <Button variant="outline" size="sm" onClick={handleClear}>
                Clear
              </Button>
              <Button size="sm" onClick={handleConvert} disabled={!svgInput.trim()}>
                <Wand2 className="h-4 w-4 mr-2" />
                Convert
              </Button>
            </div>
          </SectionHeader>
          <Textarea
            placeholder="Paste your SVG markup here..."
            value={svgInput}
            onChange={(e) => setSvgInput(e.target.value)}
            className="min-h-[400px] font-mono text-sm"
          />
        </div>
        
        <div>
          <SectionHeader title="JSX Output">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!jsxOutput}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </SectionHeader>
          <Textarea
            value={jsxOutput}
            readOnly
            className="min-h-[400px] font-mono text-sm"
            placeholder="Converted JSX will appear here..."
          />
        </div>
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-medium mb-2">Conversion Features</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Converts HTML attributes to camelCase (stroke-width → strokeWidth)</li>
          <li>• Handles class → className conversion</li>
          <li>• Preserves SVG structure and formatting</li>
          <li>• Ready to use as React component</li>
        </ul>
      </div>
    </ToolCard>
  );
}