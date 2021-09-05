import { elementListener, generateMangaEntry, getData, getPath, htmlEntities } from "../../utils/utils";
elementListener(document, "#app > div.page-content > div > div.content.container > div > div.lists > div:nth-child(2)") // (2) being the reading el specifically [1]
	.then((element) => {
		getData().then((data) => {
			const path = getPath(document.URL);
			const allLists = element.parentElement?.children;
			try {
				const readingList = element;
				const completedList = allLists?.item(2);
				const pausedList = allLists?.item(3);
				const droppedList = allLists?.item(4);
				const planningList = allLists?.item(5);

				const lists = [readingList, completedList, pausedList, droppedList, planningList];

				lists.forEach((list) => {
					if (!list) return;
					[].slice.call((list?.lastChild as Element).children).forEach((child) => {
						if (
							data.manga.find(
								(m) =>
									htmlEntities(m.title.toLocaleLowerCase().replace(" ", "_")) == (child as Element).id
							) != null
						) {
							(list?.lastChild as Element).removeChild(child as Element);
						}
					});
				});

				data.manga.forEach((m) => {
					switch (m.status) {
						case "Reading": {
							if (/(user\/.+\/mangalist$)|(user\/.+\/mangalist\/reading)/.test(path)) {
								(readingList.lastChild as Element).insertAdjacentHTML(
									"beforeend",
									generateMangaEntry(m, "List")
								);
							}
							break;
						}
						case "Completed": {
							if (/user\/.+\/mangalist\/completed/.test(path)) {
								(readingList.lastChild as Element).insertAdjacentHTML(
									"beforeend",
									generateMangaEntry(m, "List")
								);
							} else if (/user\/.+\/mangalist$/.test(path)) {
								(completedList?.lastChild as Element).insertAdjacentHTML(
									"beforeend",
									generateMangaEntry(m, "List")
								);
							}
							break;
						}
						case "Dropped": {
							if (/user\/.+\/mangalist\/dropped/.test(path)) {
								(readingList.lastChild as Element).insertAdjacentHTML(
									"beforeend",
									generateMangaEntry(m, "List")
								);
							} else if (/user\/.+\/mangalist$/.test(path)) {
								(droppedList?.lastChild as Element).insertAdjacentHTML(
									"beforeend",
									generateMangaEntry(m, "List")
								);
							}
							break;
						}
						case "Paused": {
							if (/user\/.+\/mangalist\/paused/.test(path)) {
								(readingList.lastChild as Element).insertAdjacentHTML(
									"beforeend",
									generateMangaEntry(m, "List")
								);
							} else if (/user\/.+\/mangalist$/.test(path)) {
								(pausedList?.lastChild as Element).insertAdjacentHTML(
									"beforeend",
									generateMangaEntry(m, "List")
								);
							}
							break;
						}
						case "Planning": {
							if (/user\/.+\/mangalist\/planning/.test(path)) {
								(readingList.lastChild as Element).insertAdjacentHTML(
									"beforeend",
									generateMangaEntry(m, "List")
								);
							} else if (/user\/.+\/mangalist$/.test(path)) {
								(planningList?.lastChild as Element).insertAdjacentHTML(
									"beforeend",
									generateMangaEntry(m, "List")
								);
							}
							break;
						}
					}
				});
			} catch (e) {
				console.log(e);
			}
		});
	})
	.catch((err) => console.log);
