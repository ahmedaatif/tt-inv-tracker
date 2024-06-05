async function getToonPortrait(dna, pose) {
	return `https://rendition.toontownrewritten.com/render/${dna}/${pose}/128x128.webp`;
}

async function getLocalData(authorization) {
	const response = await fetch(`http://localhost:1547/info.json`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Host: "localhost:1547",
			"User-Agent": "Toontown Invasion Tracker", // Gets ignored by chrome
			Authorization: authorization,
		},
	});
	const localData = await response.json();
	return localData;
}

module.exports = { getLocalData, getToonPortrait };
