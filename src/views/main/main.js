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

window.data.onInvasionsRecieve((value) => {
	if (!!value) {
		console.log(value);
		document.getElementById("invasions-display").innerHTML = "";

		Object.entries(value.invasions).forEach(([invasionName, invasion]) => {
			const html = `
			<tr>
              <td>
                <img class="img-table" src="../../assets/cogs/${cogNameToImageName(invasion["type"])}.png">
              </td>
              <td>${invasion["type"]}</td>
              <td>${invasionName}</td>
              <td>
			  	<span class="tooltip">
				${invasion["progress"]}
				<span class="tooltip-text">
				As of 
				${new Date(parseInt(invasion["asOf"]) * 1000).toLocaleTimeString("en-US", {
					hour: "numeric",
					minute: "numeric",
				})}
				</span>
				</span>
				
			</td>
            </tr>
			`;
			document.getElementById("invasions-display").innerHTML += html;

			console.log(html);
		});
	} else {
		console.log(value);
		// document.getElementById("local-status").innerText = "Local is not connected";
	}
});

function cogNameToImageName(cog) {
	return cog.replace(/\s+/g, "").replace(".", "").replace("&", "and").toLowerCase();
}
