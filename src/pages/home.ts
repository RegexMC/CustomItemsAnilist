import { elementListener, generateMangaEntry, getData } from "../utils/utils";
console.log("Loaded home");

elementListener(document, "#app > div.page-content > div > div.home.full-width > div > div:nth-child(3)")
	.then((element) => {
		console.log(element);
		getData().then((data) => {
			data.manga.forEach((m) => {
				if (m.status == "Reading") {
					(element.lastChild as Element).insertAdjacentHTML("beforeend", generateMangaEntry(m, "Home"));
				}
			});
		});
	})
	.catch((err) => console.log);
