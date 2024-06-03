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
