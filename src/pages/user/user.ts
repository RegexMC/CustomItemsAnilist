import { elementListener, getData } from "../../utils/utils";

elementListener(
	document,
	"#app > div.page-content > div > div.content.container > div > div:nth-child(2) > div.stats-wrap > div:nth-child(2) > div.stats-wrap"
)
	.then((element) => {
		getData().then((data) => {
			element.parentElement?.insertAdjacentHTML(
				"beforeend",
				`<div data-v-815ccddc="" class="stats-wrap">
		<div data-v-815ccddc="" class="stat">
			<div data-v-815ccddc="" class="value">${data.manga.length}</div>
			<div data-v-815ccddc="" class="label">Total Manga</div>
		</div>
		<div data-v-815ccddc="" class="stat">
			<div data-v-815ccddc="" class="value">${data.manga
				.map((m) => m.progress)
				.reduce((a, b) => parseInt(a.toString()) + parseInt(b.toString()), 0)}</div>
			<div data-v-815ccddc="" class="label">Chapters Read</div>
		</div>
		<div data-v-815ccddc="" class="stat">
			<div data-v-815ccddc="" class="value">${
				Math.round(
					(data.manga.reduce((r, c) => (c.score ? r + c.score : r), 0) / data.manga.length + Number.EPSILON) *
						100
				) / 100
			}</div>
			<div data-v-815ccddc="" class="label">Mean Score</div>
		</div>
	</div>
	`
			);
		});
	})
	.catch((err) => console.log);
