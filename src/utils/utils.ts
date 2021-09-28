import { Manga } from "../components/manga";
import { Data } from "../components/types";

export function htmlEntities(str: string): string {
	return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export class TimedPromise<T> extends Promise<T> {
	constructor(timeout: number, callback: any) {
		const haveTimeout = typeof timeout === "number";
		const init = haveTimeout ? callback : timeout;
		super((resolve: any, reject: any) => {
			init(resolve, reject);
			if (haveTimeout) {
				setTimeout(() => {
					reject(new Error(`Promise timed out after ${timeout}ms`));
				}, timeout);
			}
		});
	}

	static resolveWithTimeout(timeout: number, x: any) {
		if (!x || typeof x.then !== "function") {
			return this.resolve(x);
		}
		return new this(timeout, x.then.bind(x));
	}
}

export function getData(): Promise<Data> {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get("data", (res) => resolve(res.data));
	});
}

export function setData(data: Data) {
	chrome.storage.sync.set({ data: data });
}

export function getPath(url: string) {
	url = url.toLowerCase();
	if (url.endsWith("/")) url = url.slice(0, -1);
	if (url.startsWith("https://")) return url.substring(19);
	if (url.startsWith("http://")) return url.substring(18);
	if (url.startsWith("anilist.co/")) return url.substring(10);
	return url;
}

export function elementListener(document: Document, selector: string): TimedPromise<Element> {
	return new TimedPromise(10 * 1000, (resolve: any, reject: any) => {
		var el = document.querySelector(selector);
		if (el != null) {
			resolve(el);
			return;
		}

		var observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (!mutation.addedNodes) return;
				for (let i = 0; i < mutation.addedNodes.length; i++) {
					try {
						const node = mutation.addedNodes[i];
						if (node.nodeType == 1) {
							if ((node as Element).matches(selector)) {
								resolve(node as Element);
								observer.disconnect();
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
	});
}

export function generateMangaEntry(manga: Manga, type: "Home" | "List"): string {
	if (type == "Home") {
		var out = `<div data-v-4b71d7c6="" data-v-16d5094e="" data-v-6aea970d="" class="media-preview-card small">
		<a
			data-v-4b71d7c6=""
			href="${"\\manga\\" + encodeURI(manga.uid)}"
			class="cover"
			data-src="${manga.cover}"
			lazy="loaded"
			style="
				background-image: url('${manga.cover}');
			">
			<div data-v-4b71d7c6="" class="image-overlay">
				<div data-v-16d5094e="">
					<div data-v-16d5094e="" class="plus-progress">${manga.progress} +</div>
				</div>
			</div></a
		>
		<div data-v-4b71d7c6="" class="content">
			<a data-v-4b71d7c6="" href="${"\\manga\\" + encodeURI(manga.uid)}" class="title"> ${manga.title} </a>
			<div data-v-4b71d7c6="" class="info">
				<div data-v-16d5094e="" data-v-4b71d7c6="">
					Progress: ${manga.progress}
					<div data-v-16d5094e="" data-v-4b71d7c6="" class="plus-progress mobile">+</div>
				</div>
			</div>
		</div>
		</div>
		`;
		return out;
	} else {
		return `<div class="entry row" id="${htmlEntities(manga.title.toLocaleLowerCase().replace(" ", "_"))}">
		<div class="cover">
			<div
				class="image"
				style="
					background-image: url('${manga.cover}');
				"
			></div>
		</div>
		<div class="title">
			<a href="${"\\manga\\" + encodeURI(manga.uid)}" class="">
				${manga.title}
			</a>
		</div>
		<div score="0" label="Score" class="score"></div>
		<div label="Progress" class="progress">
			${manga.progress}
			<span class="plus-progress">+</span>
		</div>
		<div label="Volumes" class="progress progress-volumes">
			0
			<span class="plus-progress">+</span>
		</div>
		<div label="Status" class="status">Current</div>
		<div label="Format" class="format">Manga</div>
		<span class="release-status RELEASING"></span>
	</div>
	`;
	}
}
