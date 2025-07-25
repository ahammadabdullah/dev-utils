import { useState, useEffect } from "react";
import { Minus, X, Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../ui/theme-toggle";

export default function WindowBar() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    window.electronAPI?.onFullscreenChange((fullscreen: boolean) => {
      setIsFullscreen(fullscreen);
    });
  }, []);

  const toggleFullscreen = async () => {
    const newState = await window.electronAPI?.toggleFullscreen();
    setIsFullscreen(newState ?? false);
  };

  return (
    <div
      className="h-10 w-full bg-background border-b border-border flex items-center justify-between px-4"
      style={{ WebkitAppRegion: "drag" } as any}
    >
      <div className="text-sm font-medium tracking-wide text-muted-foreground">
        DevUtils
      </div>

      <div
        className="flex items-center gap-1"
        style={{ WebkitAppRegion: "no-drag" } as any}
      >
        <ThemeToggle />

        <Button
          size="icon"
          variant="ghost"
          onClick={() => window.electronAPI?.minimize()}
          className="rounded-sm hover:bg-muted text-muted-foreground"
        >
          <Minus className="w-4 h-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={toggleFullscreen}
          className="rounded-sm hover:bg-muted text-muted-foreground"
          aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? (
            <Minimize className="w-4 h-4" />
          ) : (
            <Maximize className="w-4 h-4" />
          )}
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => window.electronAPI?.close()}
          className="rounded-sm hover:bg-destructive/80 text-destructive"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
