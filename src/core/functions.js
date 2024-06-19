const api = require("./api.js");

/**
 * Fetch invasions from API and send them to windows provided
 * @param {BrowserWindow[]} windows Array of Windows to send data to
 * @returns {Promise<boolean>} True or false if it's sent or not
 */
async function fetchInvasionsAndSendToWindows(windows) {
	try {
		const invasions = await api.getInvasions();

		windows.forEach((window) => {
			window?.webContents?.send("invasions", invasions);
		});

		return true;
	} catch (error) {
		return false;
	}
}

/**
 * Fetch local data from API and send them to windows provided
 * @param {BrowserWindow[]} windows Array of Windows to be sent local data to
 * @param {string} auth UUID Identifier for session
 * @returns {Promise<boolean>} True or false if it's sent or not
 */
async function fetchLocalDataAndSendToWindows(windows, auth) {
	try {
		const local = await api.getLocalData(auth);

		windows.forEach((window) => {
			window?.webContents?.send("local-data", local);
		});

		return true;
	} catch (error) {
		windows.forEach((window) => {
			window?.webContents?.send("local-data", null);
		});

		return false;
	}
}

/**
 * Get toon portrait
 *
 * Used by ipcMain.handle
 * @param {*} event
 * @param {*} returned Array of values, Index 0 is DNA of Toon, Index 1 is image pose
 * @returns
 */
async function fetchAndReturnToonPortrait(event, returned) {
	const data = await api.getToonPortrait(returned[0], returned[1]);
	return data;
}

module.exports = { fetchInvasionsAndSendToWindows, fetchLocalDataAndSendToWindows, fetchAndReturnToonPortrait };
