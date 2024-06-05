const divs = document.querySelectorAll("#toonImage, #district, #invasion");

let currentDivIndex = 0;

function showCurrentDiv() {
	divs.forEach((div, index) => {
		div.classList.remove("show"); // Remove "show" class from all divs

		if (index === currentDivIndex) {
			div.classList.add("show"); // Add "show" class to the current div
		}
	});
}

function loopDivs() {
	showCurrentDiv();
	currentDivIndex = (currentDivIndex + 1) % divs.length;
	setTimeout(loopDivs, 3000);
}

loopDivs();

window.data.onLocalReceive(async (value) => {
	if (!!value) {
		document.getElementById("toonImage").src = await window.data.getToonImage(value["toon"]["style"], "portrait");
		document.getElementById("district").innerText = value["location"]["district"];
		if (!!value["invasion"]) {
			document.getElementById("invasion").innerText = value["invasion"]["cog"] ?? "No Invasion";
		} else {
			document.getElementById("invasion").innerText = "No Invasion";
		}
	} else {
		localValue = null;
		document.getElementById("toonImage").src = "../../assets/zzz-128px.webp";
		document.getElementById("district").innerText = "No Data";
		document.getElementById("invasion").innerText = "No Data";
	}
});
