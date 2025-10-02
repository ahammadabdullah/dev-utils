// src/types/globals.d.ts
export {};

declare global {
  interface Window {
    electronAPI?: {
      platform: NodeJS.Platform;
      minimize: () => void;
      close: () => void;
      toggleFullscreen: () => Promise<boolean>;
      onFullscreenChange: (callback: (isFullscreen: boolean) => void) => () => void;
    };
  }
}
