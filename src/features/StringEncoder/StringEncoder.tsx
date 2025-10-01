import { useState } from "react";
import { ToolCard } from "@/components/ui/tool-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { encodeBase64, decodeBase64, encodeBase58, decodeBase58 } from "./encoding";

export function StringEncoder() {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [mode, setMode] = useState<"base64" | "base58">("base64");

	const handleEncode = () => {
		if (mode === "base64") setOutput(encodeBase64(input));
		else setOutput(encodeBase58(input));
	};

	const handleDecode = () => {
		if (mode === "base64") setOutput(decodeBase64(input));
		else setOutput(decodeBase58(input));
	};

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(output);
			toast.success("Copied to clipboard");
		} catch {
			toast.error("Failed to copy");
		}
	};

	const handleClear = () => {
		setInput("");
		setOutput("");
	};

	const sampleText = "Hello, World!";
	const handleLoadSample = () => setInput(sampleText);

	return (
		<ToolCard
			title="String Encoder/Decoder"
			description="Encode or decode strings to Base64 or Base58 with a clean interface"
		>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Input Panel */}
				<div>
					<SectionHeader title="Input">
						<div className="flex gap-2 flex-wrap">
							<Button variant="outline" size="sm" onClick={handleLoadSample}>
								Sample
							</Button>
							<Button variant="outline" size="sm" onClick={handleClear}>
								Clear
							</Button>
							<Button size="sm" onClick={handleEncode} disabled={!input.trim()}>
								<Wand2 className="h-4 w-4 mr-2" />
								Encode
							</Button>
							<Button size="sm" onClick={handleDecode} disabled={!input.trim()}>
								<Wand2 className="h-4 w-4 mr-2" />
								Decode
							</Button>
						</div>
					</SectionHeader>
					<Textarea
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Enter your text here..."
						className="min-h-[400px] font-mono text-sm"
					/>
				</div>

				{/* Output Panel */}
				<div>
					<SectionHeader title="Output">
						<div className="flex gap-2">
							<Button
								variant={mode === "base64" ? "default" : "outline"}
								size="sm"
								onClick={() => {
									setMode("base64");
									setOutput("");
								}}
							>
								Base64
							</Button>
							<Button
								variant={mode === "base58" ? "default" : "outline"}
								size="sm"
								onClick={() => {
									setMode("base58");
									setOutput("");
								}}
							>
								Base58
							</Button>
							<Button variant="outline" size="sm" onClick={handleCopy} disabled={!output}>
								<Copy className="h-4 w-4 mr-2" /> Copy
							</Button>
						</div>
					</SectionHeader>
					<Textarea
						value={output}
						readOnly
						placeholder={`${mode.toUpperCase()} output will appear here...`}
						className="min-h-[400px] font-mono text-sm"
					/>
				</div>
			</div>

			{/* Features / Info Section */}
			<div className="bg-muted p-4 rounded-lg mt-6">
				<h4 className="font-medium mb-2">Features</h4>
				<ul className="text-sm text-muted-foreground space-y-1">
					<li>• Encode or decode strings in Base64 or Base58</li>
					<li>• Switch between Base64 and Base58 outputs easily</li>
					<li>• Copy output to clipboard with one click</li>
					<li>• Load sample text or clear input/output quickly</li>
				</ul>
			</div>
		</ToolCard>
	);
}
