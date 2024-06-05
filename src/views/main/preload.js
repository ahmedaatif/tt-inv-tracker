// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("controls", {
	node: () => process.versions.node,
	chrome: () => process.versions.chrome,
	electron: () => process.versions.electron,
	close: () => ipcRenderer.invoke("close"),
	minimize: () => ipcRenderer.invoke("minimize"),
	toggleOverlay: () => ipcRenderer.invoke("toggleOverlay"),
	// we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld("data", {
	onLocalReceive: (callback) => ipcRenderer.on("local-data", (_event, value) => callback(value)),
});
