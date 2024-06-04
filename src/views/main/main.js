import { getLocalData } from "../../core/api.js";

const minimizeFunc = async () => {
	await window.controls.minimize();
};
document.getElementById("minimize-button").addEventListener("click", minimizeFunc);

const closeFunc = async () => {
	await window.controls.close();
};
document.getElementById("close-button").addEventListener("click", closeFunc);

const toggleOverlay = async (event) => {
	console.log(event);
	const isOpened = await window.controls.toggleOverlay();
	if (!!event == false) return;
	if (isOpened == true) {
		event.srcElement.innerText = "Disable Overlay";
	} else {
		event.srcElement.innerText = "Enable Overlay";
	}
};
document.getElementById("toggle-overlay").addEventListener("click", toggleOverlay);

setInterval(async () => {
	try {
		const local = await getLocalData();
		document.getElementById(
			"local-status"
		).innerText = `Local is connected - ${local["toon"]["name"]} @ ${local["location"]["neighborhood"]}, ${local["location"]["district"]} `;
		console.log(local);
	} catch (error) {
		document.getElementById("local-status").innerText = "Local is not connected";

		console.error("Is the game turned on?");
	}
}, 2000);
