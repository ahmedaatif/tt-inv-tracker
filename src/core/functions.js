const api = require("./api.js");

async function fetchInvasions(mainWindow) {
	try {
		const invasions = await api.getInvasions();
		mainWindow?.webContents?.send("invasions", invasions);
	} catch (error) {}
}

async function sendLocalDataToWindows(mainWindow, overlayWindow, auth) {
	try {
		const local = await api.getLocalData(auth);
		mainWindow?.webContents?.send("local-data", local);
		overlayWindow?.webContents?.send("local-data", local);
	} catch (error) {
		mainWindow?.webContents?.send("local-data", null);
		overlayWindow?.webContents?.send("local-data", null);
	}
}

module.exports = { fetchInvasions, sendLocalDataToWindows };
