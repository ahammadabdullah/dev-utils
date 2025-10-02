import { useState } from "react";
import { ToolCard } from "@/components/ui/tool-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { useHtmlToJsx } from "./useHtmlToJsx";

export function HtmlToJsx() {
  const { convertHtmlToJsx } = useHtmlToJsx();
  const [htmlInput, setHtmlInput] = useState("");
  const [jsxOutput, setJsxOutput] = useState("");
  const [generatedFiles, setGeneratedFiles] = useState<
    { name: string; type: string; content: string }[]
  >([]);

  const handleConvert = async () => {
    const result = await convertHtmlToJsx(htmlInput);
    setJsxOutput(result.jsx);
    setGeneratedFiles(result.files);
  };

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleClear = () => {
    setHtmlInput("");
    setJsxOutput("");
    setGeneratedFiles([]);
  };

  const sampleHtml = `
  <div class="container">
  <h1>Welcome to React</h1>
  <p>This is a sample HTML structure.</p>
  <form>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required />
    <button type="submit">Submit</button>
  </form>
  <img src="image.jpg" alt="Sample image" />
  </div>
  `;

  const handleLoadSample = () => {
    setHtmlInput(sampleHtml);
  };

  return (
    <ToolCard
      title="HTML to JSX"
      description="Convert HTML markup to React JSX with proper attribute and syntax formatting"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* HTML Input */}
        <div>
          <SectionHeader title="HTML Input">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleLoadSample}>
                Sample
              </Button>
              <Button variant="outline" size="sm" onClick={handleClear}>
                Clear
              </Button>
              <Button
                size="sm"
                onClick={handleConvert}
                disabled={!htmlInput.trim()}
              >
                <Wand2 className="h-4 w-4 mr-2" /> Convert
              </Button>
            </div>
          </SectionHeader>
          <Textarea
            placeholder="Paste your HTML markup here..."
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
        </div>

        {/* JSX Output */}
        <div>
          <SectionHeader title="JSX Output">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(jsxOutput, "JSX")}
              disabled={!jsxOutput}
            >
              <Copy className="h-4 w-4 mr-2" /> Copy
            </Button>
          </SectionHeader>
          <Textarea
            value={jsxOutput}
            readOnly
            className="min-h-[300px] font-mono text-sm"
            placeholder="Converted JSX will appear here..."
          />
        </div>
      </div>

      {/* Generated Files */}
      {generatedFiles.length > 0 && (
        <div className="mt-6 bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-4">Generated Files</h4>
          <div className="space-y-6">
            {generatedFiles.map((file, i) => (
              <div
                key={i}
                className="border rounded-lg p-3 bg-background shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold">{file.name}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(file.content, file.name)}
                  >
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                <Textarea
                  value={file.content}
                  readOnly
                  className="min-h-[150px] font-mono text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-medium mb-2">Conversion Features</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Converts class → className</li>
          <li>• Converts for → htmlFor</li>
          <li>• Handles self-closing tags properly</li>
          <li>• Preserves HTML structure and formatting</li>
          <li>• Converts inline styles to JSX format</li>
          <li>• Ready to use as React component</li>
          <li>• Extracts & generates meta tags as separate file</li>
          <li>• Converts HTML comments to JSX comments</li>
          <li>• Handles boolean attributes correctly</li>
          <li>• Removes doctype and unnecessary tags</li>
        </ul>
      </div>
    </ToolCard>
  );
}
