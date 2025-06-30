const { app, BrowserWindow, ipcMain, Tray, Menu } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;
let tray;

// Helper function to get the correct resource path
function getResourcePath(relativePath) {
  if (isDev) {
    return path.join(__dirname, relativePath);
  } else {
    // In production, resources are in the resources/app.asar folder
    return path.join(process.resourcesPath, relativePath);
  }
}

function createWindow() {
  const iconPath = getResourcePath("assets/icon.png");

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    frame: false,
    titleBarStyle: "hidden",
    icon: iconPath,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  const startURL = isDev
    ? "http://localhost:5173"
    : `file://${path.join(__dirname, "dist/index.html")}`;

  mainWindow.loadURL(startURL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // Fullscreen event listeners
  mainWindow.on("enter-full-screen", () => {
    mainWindow.webContents.send("fullscreen-changed", true);
  });

  mainWindow.on("leave-full-screen", () => {
    mainWindow.webContents.send("fullscreen-changed", false);
  });
}

app.on("ready", () => {
  createWindow();

  const trayIconPath = getResourcePath("assets/icon.png");
  tray = new Tray(trayIconPath);
  const contextMenu = Menu.buildFromTemplate([
    { label: "Show", click: () => mainWindow && mainWindow.show() },
    { label: "Quit", click: () => app.quit() },
  ]);
  tray.setToolTip("DevUtils");
  tray.setContextMenu(contextMenu);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC handlers
ipcMain.on("minimize", () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on("close", () => {
  if (mainWindow) mainWindow.close();
});

ipcMain.handle("toggle-fullscreen", () => {
  if (!mainWindow) return false;
  const isFull = mainWindow.isFullScreen();
  mainWindow.setFullScreen(!isFull);
  return !isFull;
});
