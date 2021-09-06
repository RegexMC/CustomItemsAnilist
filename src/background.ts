// import { Manga } from "./components/manga"; // God damn this took me so long to get working
import { Data } from "./components/types";
import { getData, getPath, setData } from "./utils/utils";

const data: Data = {
	history: [],
	manga: [
		// Data for testing
		// new Manga(
		// 	"Test Title 1",
		// 	"https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx107282-ZzzqzHRZShT6.png",
		// 	"Reading",
		// 	1,
		// 	undefined,
		// 	1,
		// 	1
		// ),
		// new Manga(
		// 	"Test Title 2",
		// 	"https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx107282-ZzzqzHRZShT6.png",
		// 	"Completed",
		// 	2,
		// 	undefined,
		// 	2,
		// 	2
		// ),
		// new Manga(
		// 	"Test Title 3",
		// 	"https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx107282-ZzzqzHRZShT6.png",
		// 	"Paused",
		// 	3,
		// 	undefined,
		// 	3,
		// 	3
		// ),
		// new Manga(
		// 	"Test Title 4",
		// 	"https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx107282-ZzzqzHRZShT6.png",
		// 	"Dropped",
		// 	4,
		// 	undefined,
		// 	4,
		// 	4
		// ),
		// new Manga(
		// 	"Test Title 5",
		// 	"https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx107282-ZzzqzHRZShT6.png",
		// 	"Planning",
		// 	5,
		// 	undefined,
		// 	5,
		// 	5
		// )
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

	if (changeInfo.status == "loading") {
		getData().then((data) => {
			data.history.unshift(url);
			data.history.length = 6;
			setData(data);
		});
	}

	if (changeInfo.status == "complete") {
		const path = getPath(url);
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
