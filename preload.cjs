const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  // basic environment info for renderer (safe to expose)
  platform: process.platform,
  minimize: () => ipcRenderer.send("minimize"),
  close: () => ipcRenderer.send("close"),
  toggleFullscreen: () => ipcRenderer.invoke("toggle-fullscreen"),
  onFullscreenChange: (callback) => {
    const listener = (_event, isFullscreen) => {
      callback(isFullscreen);
    };
    ipcRenderer.on("fullscreen-changed", listener);
    // return unsubscribe function
    return () => ipcRenderer.removeListener("fullscreen-changed", listener);
  },
});
