const { app, BrowserWindow, ipcMain, Tray, Menu } = require("electron");
const path = require("path");
const fs = require("fs");

const isDevMode =
  process.env.NODE_ENV !== "production" &&
  !app.isPackaged &&
  fs.existsSync(path.join(__dirname, "src"));

let mainWindow;
let tray;

function getResourcePath(relativePath) {
  if (isDevMode) {
    return path.join(__dirname, relativePath);
  } else {
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
    frame: process.platform === "darwin" ? true : false,
    titleBarStyle: process.platform === "darwin" ? "hiddenInset" : "hidden",
    icon: iconPath,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  let startURL;
  if (isDevMode) {
    startURL = "http://localhost:5173";
  } else {
    let indexPath = path.join(__dirname, "dist", "index.html");

    if (!fs.existsSync(indexPath)) {
      const appPath = app.getAppPath();
      indexPath = path.join(appPath, "dist", "index.html");

      if (!fs.existsSync(indexPath)) {
        indexPath = path.join(
          process.resourcesPath,
          "app",
          "dist",
          "index.html"
        );
      }
    }

    startURL = `file://${indexPath.replace(/\\/g, "/")}`;

    console.log("Production index path:", indexPath);
    console.log("File exists:", require("fs").existsSync(indexPath));
  }

  console.log("Loading URL:", startURL);
  mainWindow.loadURL(startURL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.on("enter-full-screen", () => {
    mainWindow.webContents.send("fullscreen-changed", true);
  });

  mainWindow.on("leave-full-screen", () => {
    mainWindow.webContents.send("fullscreen-changed", false);
  });

  if (process.platform === "darwin") {
    mainWindow.on("close", (e) => {
      if (!app.isQuiting) {
        e.preventDefault();
        mainWindow.hide();
      }
    });
  }
}

app.on("ready", () => {
  createWindow();

  const trayIconPath = getResourcePath("assets/icon.png");
  tray = new Tray(trayIconPath);
  const contextMenu = Menu.buildFromTemplate([
    { label: "Show", click: () => mainWindow && mainWindow.show() },
    { label: "Quit", click: () => {
      app.isQuiting = true;
      app.quit();
    }},
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
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  } else if (mainWindow) {
    mainWindow.show();
  }
});

app.on("before-quit", () => {
  app.isQuiting = true;
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
