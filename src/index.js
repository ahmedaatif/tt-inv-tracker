const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

app.setName("Toontown Invasion Tracker");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	app.quit();
}

let mainWindow = null;

const createWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 816,
		height: 564,
		transparent: true,
		frame: false,
		fullscreenable: false,
		maximizable: false,
		resizable: false,
		title: "Toontown Invasion Tracker",
		// focusable: false,
		webPreferences: {
			preload: path.join(__dirname, "views/main/preload.js"),
		},
	});

	// and load the index.html of the app.
	mainWindow.loadFile(path.join(__dirname, "views/main/main.html"));

	if (app.isPackaged == false) {
		// Open the DevTools.
		mainWindow.webContents.openDevTools();
	}
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	ipcMain.handle("minimize", () => {
		mainWindow.minimize();
	});

	ipcMain.handle("close", () => {
		app.quit();
	});

	createWindow();

	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
