import { Status } from "../components/types";
import { getData, setData } from "../utils/utils";

// Manga page.
getData().then((data) => {
	const previousUrl = data.history[1];
	const manga = data.manga.find(
		(m) =>
			encodeURI(m.title.replace(" ", "").toLocaleLowerCase()) ==
			previousUrl.split("/")[previousUrl.split("/").length - 1]
	);
	if (manga == null) return;
	document.title = manga.title;
	window.history.pushState("", "", ">manga>" + encodeURI(manga.title.replace(" ", "").toLocaleLowerCase()));

	var pageContent = document.querySelector("#app > div.page-content");
	if (pageContent == null) return;
	pageContent.innerHTML = `<div data-v-707cad3f="" class="media media-page-unscoped media-manga">
	<div data-v-4df465ff="" data-v-707cad3f="" class="header-wrap">
		<div data-v-4df465ff="" class="header">
			<div data-v-4df465ff="" class="container" style="min-height: 250px">
				<div data-v-4df465ff="" class="cover-wrap">
					<div data-v-4df465ff="" class="cover-wrap-inner" style="position: static">
						<img data-v-4df465ff="" src="${manga.icon}" class="cover" />
						<div data-v-4df465ff="" class="actions">
							<div
								data-v-4df465ff=""
								class="list"
								style="width: 21.5rem; padding-left: 0px !important"
								id="modifyentry"
							>
								<select id="status" data-v-4df465ff="" class="add" style="background-color: #3DB4F2 !important; border:none; color: #ffff;">
									<option value="Planning" ${manga.status == ("Planning" as Status) ? "selected" : ""}>Planning</option>
									<option value="Reading" ${manga.status == ("Reading" as Status) ? "selected" : ""}>Reading</option>
									<option value="Paused" ${manga.status == ("Paused" as Status) ? "selected" : ""}>Paused</option>
									<option value="Completed" ${manga.status == ("Completed" as Status) ? "selected" : ""}>Completed</option>
									<option value="Dropped" ${manga.status == ("Dropped" as Status) ? "selected" : ""}>Dropped</option>
								</select>
							</div>
						</div>
					</div>
				</div>

				<div data-v-4df465ff="" class="content">
					<h1 data-v-4df465ff="">${manga.title}</h1>
					<p data-v-760726c9="" class="description">
						<div class="form progress">
							<div class="input-title">Chapter Progress</div>
							<br>
							<div class="el-input-number is-controls-right">
								<span role="button" class="el-input-number__decrease" id="lowerProgress">
									<i class="el-icon-arrow-down"></i>
								</span> 
								<span role="button" class="el-input-number__increase" id="increaseProgress">
									<i class="el-icon-arrow-up"></i> 
								</span>
								<div class="el-input" style="background:rgb(11, 22, 34) !important;">
									<input id="progress" type="text" autocomplete="off" min="0" class="el-input__inner" role="spinbutton" aria-valuemax="12" aria-valuemin="0" aria-valuenow="0" aria-disabled="undefined" style="background:rgb(11, 22, 34) !important;" value="${
										manga.progress || 0
									}">
								</div>
							</div>
							<br><br>
							<div class="input-title">Score</div>
							<br>
							<div class="el-input-number is-controls-right">
								<span role="button" class="el-input-number__decrease" id="lowerScore">
									<i class="el-icon-arrow-down"></i>
								</span> 
								<span role="button" class="el-input-number__increase" id="increaseScore">
									<i class="el-icon-arrow-up"></i> 
								</span>
								<div class="el-input" style="background:rgb(11, 22, 34) !important;">
									<input id="score" type="text" autocomplete="off" min="0" class="el-input__inner" role="spinbutton" aria-valuemax="12" aria-valuemin="0" aria-valuenow="0" aria-disabled="undefined" style="background:rgb(11, 22, 34) !important;" value="${
										manga.score
									}">
								</div>
							</div>
									${manga.url ? '<br><br><a href="' + manga.url + '">' + manga.url + "</a>" : ""}							
						</div>
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
`;
	document.head.insertAdjacentHTML(
		"beforeend",
		`<style>
		select option {
			background-color: #FFFFFF;
			color: rgb(159,173,189);
		}
		select option:hover {
			background-color: ##3DB4F2;
		}
</style>`
	);

	document.getElementById("status")?.addEventListener("change", (e) => {
		var status: Status = (document.getElementById("status") as any).value;
		if (status == manga.status) return;
		getData().then((data) => {
			manga.status = status;
			data.manga = data.manga.map((m) => (m.title === manga.title ? manga : m));
			setData(data);
		});
	});
	document.getElementById("lowerProgress")?.addEventListener("click", () => {
		var progressInput = document.getElementById("progress") as any;
		var progress: number = parseInt(progressInput.value);
		if (progress < 1) return;
		progress--;
		progressInput.value = progress;

		getData().then((data) => {
			manga.progress = progress;
			data.manga = data.manga.map((m) => (m.title === manga.title ? manga : m));
			setData(data);
		});
	});
	document.getElementById("increaseProgress")?.addEventListener("click", () => {
		var progressInput = document.getElementById("progress") as any;
		var progress: number = parseInt(progressInput.value) + 1;
		progressInput.value = progress;

		getData().then((data) => {
			manga.progress = progress;
			data.manga = data.manga.map((m) => (m.title === manga.title ? manga : m));
			setData(data);
		});
	});
	document.getElementById("lowerScore")?.addEventListener("click", () => {
		var scoreInput = document.getElementById("score") as any;
		var score: number = parseInt(scoreInput.value);
		if (score < 1) return;
		score--;
		scoreInput.value = score;

		getData().then((data) => {
			manga.score = score;
			data.manga = data.manga.map((m) => (m.title === manga.title ? manga : m));
			setData(data);
		});
	});
	document.getElementById("increaseScore")?.addEventListener("click", () => {
		var scoreInput = document.getElementById("score") as any;
		var score: number = parseInt(scoreInput.value);
		if (score > 9) return;
		score++;
		scoreInput.value = score;

		getData().then((data) => {
			manga.score = score;
			data.manga = data.manga.map((m) => (m.title === manga.title ? manga : m));
			setData(data);
		});
	});
});
