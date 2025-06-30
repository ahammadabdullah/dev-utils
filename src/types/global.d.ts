// src/types/globals.d.ts
export {};

declare global {
  interface Window {
    electronAPI?: {
      minimize: () => void;
      close: () => void;
      toggleFullscreen: () => Promise<boolean>;
      onFullscreenChange: (callback: (isFullscreen: boolean) => void) => void;
      offFullscreenChange: (callback: (isFullscreen: boolean) => void) => void;
    };
  }
}
