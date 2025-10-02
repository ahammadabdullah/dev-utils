import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { ToolType } from "@/lib/types";

interface MainLayoutProps {
  children: ReactNode;
  activeTool: ToolType;
  onToolChange: (tool: ToolType) => void;
}

export function MainLayout({
  children,
  activeTool,
  onToolChange,
}: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar activeTool={activeTool} onToolChange={onToolChange} />
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto pb-10">{children}</div>
      </main>
    </div>
  );
}
