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

window.data.onLocalReceive((value) => {
	if (!!value) {
		document.getElementById(
			"local-status"
		).innerText = `Local is connected - ${value["toon"]["name"]} @ ${value["location"]["neighborhood"]}, ${value["location"]["district"]} `;
	} else {
		document.getElementById("local-status").innerText = "Local is not connected";
	}
});
