export async function getToonPortrait(dna) {
	const response = await fetch(`https://rendition.toontownrewritten.com/render/${dna}/portrait-surprise/128x128.webp`);
	const portrait = await response.json();
	console.log(portrait);
	return portrait;
}

export async function getLocalData() {
	const response = await fetch(`http://localhost:1547/info.json`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Host: "localhost:1547",
			"User-Agent": "Toontown Invasion Tracker", // Gets ignored by chrome
			Authorization: "sdf",
		},
	});
	const localData = await response.json();
	return localData;
}
