const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("minimize"),
  close: () => ipcRenderer.send("close"),
  toggleFullscreen: () => ipcRenderer.invoke("toggle-fullscreen"),
  onFullscreenChange: (callback) => {
    ipcRenderer.on("fullscreen-changed", (event, isFullscreen) => {
      callback(isFullscreen);
    });
  },
});
