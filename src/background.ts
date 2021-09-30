// /// #if DEBUG
// import { Manga } from "./components/manga"; // God damn this took me so long to get working
// import { uuid } from "uuidv4";
// /// #endif

import { Data } from "./components/types";
import { getData, getPath, setData } from "./utils/utils";

const data: Data = {
	history: [],
	manga: [
		// /// #if DEBUG
		// new Manga(
		// 	uuid(),
		// 	"Test Title 1",
		// 	"https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx107282-ZzzqzHRZShT6.png",
		// 	"Reading",
		// 	1,
		// 	undefined,
		// 	1,
		// 	1
		// ),
		// new Manga(
		// 	uuid(),
		// 	"Test Title 2",
		// 	"https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx107282-ZzzqzHRZShT6.png",
		// 	"Completed",
		// 	2,
		// 	undefined,
		// 	2,
		// 	2
		// ),
		// new Manga(
		// 	uuid(),
		// 	"Test Title 3",
		// 	"https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx107282-ZzzqzHRZShT6.png",
		// 	"Paused",
		// 	3,
		// 	undefined,
		// 	3,
		// 	3
		// ),
		// new Manga(
		// 	uuid(),
		// 	"Test Title 4",
		// 	"https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx107282-ZzzqzHRZShT6.png",
		// 	"Dropped",
		// 	4,
		// 	undefined,
		// 	4,
		// 	4
		// ),
		// new Manga(
		// 	uuid(),
		// 	"Test Title 5",
		// 	"https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx107282-ZzzqzHRZShT6.png",
		// 	"Planning",
		// 	5,
		// 	undefined,
		// 	5,
		// 	5
		// )
		// /// #endif
	]
};

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({ data: data });
});

chrome.action.onClicked.addListener((tab) => {
	chrome.tabs.create({
		url: chrome.runtime.getURL("./mangacreation.html")
	});
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (!tab.url) return;
	const url = tab.url.toString().toLowerCase();
	if (!url.startsWith("https://anilist.co")) return;
	const path = getPath(url);

	if (changeInfo.status == "loading") {
		if (/%3emanga%3e[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i.test(path)) {
			getData().then((data) => {
				data.history.unshift("https://anilist.co/" + path.replace(/%3e/gi, "/").substring(1));
				data.history.length = 6;
				setData(data);
			});
		} else {
			getData().then((data) => {
				data.history.unshift(url);
				data.history.length = 6;
				setData(data);
			});
		}
	}

	if (changeInfo.status == "complete") {
		var script: string = "";

		if (path == "home") {
			script = "home.js";
		} else if (path == "404") {
			script = "404.js";
		} else if (/user\/.+\/mangalist/.test(path)) {
			script = "mangalist.js";
		} else if (/user\/.+$/.test(path)) {
			script = "user.js";
		} else return;

		chrome.scripting.executeScript({
			target: { tabId: tabId, allFrames: false },
			files: [script]
		});
	}
});
