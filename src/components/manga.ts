import { Status } from "./types";

class Manga {
	uid: string;
	title: string;
	cover: string;
	status: Status;
	progress: number;
	score?: number;
	words?: number;
	url?: string;

	/**
	 * @param uid
	 * @param title
	 * @param cover
	 * @param status
	 * @param progress Chapters read
	 * @param url Link of where to read the manga
	 * @param score
	 * @param words Total words
	 */
	constructor(
		uid: string,
		title: string,
		cover: string,
		status: Status,
		progress: number,
		url?: string,
		score?: number,
		words?: number
	) {
		this.uid = uid;
		this.title = title;
		this.cover = cover;
		this.status = status;
		this.progress = progress;
		this.url = url;
		this.score = score;
		this.words = words;
	}
}

export { Manga };
