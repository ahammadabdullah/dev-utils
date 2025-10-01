import { TOOLS, ToolType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  FileJson,
  Search,
  Hash,
  Clock,
  Palette,
  Code,
  FileCode,
  KeyRound,
} from "lucide-react";

interface SidebarProps {
  activeTool: ToolType;
  onToolChange: (tool: ToolType) => void;
}

const iconMap = {
  FileJson,
  Search,
  Hash,
  Clock,
  Palette,
  Code,
  FileCode,
  KeyRound
};

export function Sidebar({ activeTool, onToolChange }: SidebarProps) {
  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {TOOLS.map((tool) => {
            const Icon = iconMap[tool.icon as keyof typeof iconMap];
            return (
              <Button
                key={tool.id}
                variant={activeTool === tool.id ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 p-3 h-auto"
                onClick={() => onToolChange(tool.id)}
              >
                <Icon className="h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span className="font-medium">{tool.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {tool.description}
                  </span>
                </div>
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
