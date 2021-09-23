import { getData, generateMangaEntry } from "../utils/utils";

// Reworked to fix it not working if the user does not have any anime airing (selected third item, w/o airing manga is second item)
// This seems to work (havent tested w/ anime airing as I don't have any) but seems inefficient.

var qs = document.querySelector("#app > div.page-content > div > div.home.full-width > div > div:last-child");
if (qs != null) {
	getData().then((data) => {
		data.manga.forEach((m) => {
			if (m.status == "Reading") {
				(qs?.lastChild as Element).insertAdjacentHTML("beforeend", generateMangaEntry(m, "Home"));
			}
		});
	});
}

var observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		if (!mutation.addedNodes) return;
		for (let i = 0; i < mutation.addedNodes.length; i++) {
			try {
				const node = mutation.addedNodes[i];
				if (node.nodeType == 1) {
					if ((node as Element).className == "list-preview-wrap") {
						if ((node.firstChild?.firstChild as any).innerText == "Manga in Progress") {
							var element = node as Element;
							getData().then((data) => {
								data.manga.forEach((m) => {
									if (m.status == "Reading") {
										(element?.lastChild as Element).insertAdjacentHTML(
											"beforeend",
											generateMangaEntry(m, "Home")
										);
									}
								});
							});
							observer.disconnect();
						}
					}
				}
			} catch (e) {}
		}
	});
});

observer.observe(document.body, {
	childList: true,
	subtree: true,
	attributes: false,
	characterData: false
});
