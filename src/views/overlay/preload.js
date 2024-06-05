const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("data", {
	onLocalReceive: (callback) => ipcRenderer.on("local-data", (_event, value) => callback(value)),
	getToonImage: (dna, portrait) => {
		return ipcRenderer.invoke("obtainToonImage", [dna, portrait]);
	},
});
