import { useState, useEffect } from "react";
import { ToolCard } from "@/components/ui/tool-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputWithCopy } from "@/components/ui/input-with-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Shuffle } from "lucide-react";
import { useColorPicker } from "./useColorPicker";

export function ColorPicker() {
  const { convertColor, generateRandomColor } = useColorPicker();
  const [selectedColor, setSelectedColor] = useState("#3b82f6");
  const [colorInfo, setColorInfo] = useState<any>(null);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    const info = convertColor(color);
    setColorInfo(info);
  };

  const handleRandomColor = () => {
    const randomColor = generateRandomColor();
    handleColorChange(randomColor);
  };

  // Initialize with default color
  useEffect(() => {
    handleColorChange(selectedColor);
  }, [selectedColor]);

  return (
    <ToolCard
      title="Color Picker"
      description="Pick colors and convert between different color formats"
    >
      <div className="space-y-6">
        <div>
          <SectionHeader title="Color Picker">
            <Button onClick={handleRandomColor} size="sm">
              <Shuffle className="h-4 w-4 mr-2" />
              Random
            </Button>
          </SectionHeader>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-20 h-20 rounded-lg border-2 border-border cursor-pointer"
            />
            <div className="flex-1">
              <Input
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)}
                placeholder="#000000"
                className="font-mono"
              />
            </div>
          </div>
        </div>

        {colorInfo && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Color Formats</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">HEX</label>
                    <InputWithCopy value={colorInfo.hex} readOnly />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">RGB</label>
                    <InputWithCopy value={colorInfo.rgb} readOnly />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">HSL</label>
                    <InputWithCopy value={colorInfo.hsl} readOnly />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">HSV</label>
                    <InputWithCopy value={colorInfo.hsv} readOnly />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Color Preview</h4>
                <div className="space-y-3">
                  <div
                    className="w-full h-32 rounded-lg border-2 border-border"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <div
                      className="h-8 rounded border"
                      style={{ backgroundColor: colorInfo.lighter }}
                      title="Lighter"
                    />
                    <div
                      className="h-8 rounded border"
                      style={{ backgroundColor: selectedColor }}
                      title="Original"
                    />
                    <div
                      className="h-8 rounded border"
                      style={{ backgroundColor: colorInfo.darker }}
                      title="Darker"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">Supported Color Formats</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• HEX: #ff0000, #f00</li>
            <li>• RGB: rgb(255, 0, 0)</li>
            <li>• HSL: hsl(0, 100%, 50%)</li>
            <li>• Named colors: red, blue, green</li>
          </ul>
        </div>
      </div>
    </ToolCard>
  );
}
