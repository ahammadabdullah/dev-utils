import { useState } from "react";
import { ToolCard } from "@/components/ui/tool-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useJsonFormatter } from "./useJsonFormatter";

export function JsonFormatter() {
  const { output, error, formatJson, minifyJson, isValid } = useJsonFormatter();
  const [inputValue, setInputValue] = useState("");

  const handleFormat = () => {
    formatJson(inputValue);
  };

  const handleMinify = () => {
    minifyJson(inputValue);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Formatted JSON copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const handleClear = () => {
    setInputValue("");
  };

  return (
    <ToolCard
      title="JSON Formatter"
      description="Format, validate, and minify JSON data with syntax highlighting"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <SectionHeader title="Input JSON">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleClear}>
                Clear
              </Button>
              <Button variant="outline" size="sm" onClick={handleMinify}>
                Minify
              </Button>
              <Button size="sm" onClick={handleFormat}>
                Format
              </Button>
            </div>
          </SectionHeader>
          <Textarea
            placeholder="Paste your JSON here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="min-h-[400px] font-mono text-sm"
          />
        </div>

        <div>
          <SectionHeader title="Formatted Output">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!output}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </SectionHeader>
          <div className="relative">
            <Textarea
              value={output}
              readOnly
              className="min-h-[400px] font-mono text-sm"
              placeholder="Formatted JSON will appear here..."
            />
            {error && (
              <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs">
                Invalid JSON
              </div>
            )}
            {isValid && output && (
              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                Valid JSON
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolCard>
  );
}
