import { Status } from "./types";

class Manga {
	title: string;
	icon: string;
	status: Status;
	progress: number;
	score?: number;
	words?: number;
	url?: string;

	/**
	 *
	 * @param title
	 * @param icon
	 * @param status
	 * @param progress Chapters read
	 * @param url Link of where to read the manga
	 * @param score
	 * @param words Total words
	 */
	constructor(
		title: string,
		icon: string,
		status: Status,
		progress: number,
		url?: string,
		score?: number,
		words?: number
	) {
		this.title = title;
		this.icon = icon;
		this.status = status;
		this.progress = progress;
		this.url = url;
		this.score = score;
		this.words = words;
	}
}

export { Manga };
