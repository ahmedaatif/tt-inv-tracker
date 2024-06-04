import { getLocalData } from "../../core/api.js";

const minimizeFunc = async () => {
	await window.controls.minimize();
};

const closeFunc = async () => {
	await window.controls.close();
};

const toggleOverlay = async (event) => {
	const isOpened = await window.controls.toggleOverlay();
	if (isOpened == true) {
		event.innerText = "Disable Overlay";
	} else {
		event.innerText = "Enable Overlay";
	}
};

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
