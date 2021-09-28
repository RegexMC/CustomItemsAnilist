import React, { MouseEventHandler } from "react";
import ReactDOM from "react-dom";
import { TextField, Select, MenuItem } from "@material-ui/core";
import { getData, setData } from "./utils/utils";
import { Manga } from "./components/manga";
import { Data, Status } from "./components/types";
import { uuid } from "uuidv4";

const Popup = () => {
	const [state, setState] = React.useState({
		status: "Planning"
	});

	const handleChange = (event: any) => {
		setState({
			status: event.target.value
		});
	};

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const title: string = (document.getElementById("title") as any).value;
		const cover: string = (document.getElementById("cover") as any).value;
		const status: Status = document.getElementById("status")?.innerText as Status;
		const progress: number = (document.getElementById("progress") as any).value;
		const score: number = (document.getElementById("score") as any).value;
		const url: string | undefined = (document.getElementById("url") as any).value;

		if (!title || !cover || !status) {
			var failDiv = document.createElement("div");
			failDiv.innerHTML = "Please fill in all inputs";
			failDiv.id = "fail";
			failDiv.classList.add("alert");

			document.getElementById("root")?.prepend(failDiv);

			setTimeout(function () {
				document.getElementById("fail")?.remove();
			}, 5000);
			return;
		}

		getData().then((data) => {
			var manga = new Manga(uuid(), title, cover, status, progress, url, score);
			data.manga.push(manga);
			setData(data);
		});

		var successDiv = document.createElement("div");
		successDiv.innerHTML = "Successfully added manga, " + title;
		successDiv.id = "success";
		successDiv.classList.add("alert");

		document.getElementById("root")?.prepend(successDiv);

		setTimeout(function () {
			document.getElementById("success")?.remove();
		}, 5000);
	}

	function importData() {
		var confirmImport = confirm(
			"Are you sure you want to OVERWRITE your current data with what is in the input area? NOTE: THIS CANNOT BE UNDONE!"
		);
		if (confirmImport == true) {
			try {
				// TODO: add confirmation as it overwrites manga list.
				var inputData: Data = JSON.parse((document.getElementById("datainput") as any).value);
				setData(inputData);
				var successDiv = document.createElement("div");
				successDiv.innerHTML = "Successfully imported data!";
				successDiv.id = "success";
				successDiv.classList.add("alert");

				document.getElementById("root")?.prepend(successDiv);

				setTimeout(function () {
					document.getElementById("success")?.remove();
				}, 5000);
			} catch (e) {
				console.log(e);
				var failDiv = document.createElement("div");
				failDiv.innerHTML = "Failed to import data!";
				failDiv.id = "fail";
				failDiv.classList.add("alert");

				document.getElementById("root")?.prepend(failDiv);

				setTimeout(function () {
					document.getElementById("fail")?.remove();
				}, 5000);
			}
		}
	}

	function handleSettingsClick() {
		// (document.querySelector("#root > form") as Element).
		getData().then((data) => {
			ReactDOM.render(
				<React.StrictMode>
					<>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								flexDirection: "column"
							}}
						>
							<textarea id="datainput">{JSON.stringify(data)}</textarea>
							<br></br>
							<br></br>
							<input type="button" value="Import" onClick={importData} />
						</div>
					</>
				</React.StrictMode>,
				document.getElementById("root")
			);
		});
	}

	return (
		<>
			<form
				noValidate
				autoComplete="off"
				onSubmit={handleSubmit}
				style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}
			>
				<a id="settingssvg" onClick={handleSettingsClick}>
					<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewBox="0 0 512 512">
						<path
							d="M491.755 232.653c0-5.95-4.935-10.844-10.865-10.844h-19.876c-6 0-12.318-4.649-13.978-10.383l-27.065-63.191c-2.877-5.161-1.935-12.871 2.284-17.111l13.456-13.435c4.219-4.219 4.219-11.141 0-15.35l-32.379-32.389c-4.199-4.249-11.1-4.249-15.462 0l-14.541 14.633c-4.26 4.24-12.063 5.406-17.316 2.632l-54.978-21.954c-5.745-1.628-10.455-7.885-10.455-13.834v-20.378c0-5.97-4.885-10.823-10.803-10.823h-45.895c-5.939 0-10.823 4.854-10.823 10.823v20.378c0 5.95-4.71 12.247-10.363 14.019l-63.764 27.279c-5.11 3.010-12.728 2.007-16.988-2.212l-14.295-14.295c-4.198-4.188-11.090-4.188-15.329 0l-32.409 32.43c-4.281 4.229-4.281 11.151 0 15.36l15.544 15.626c4.29 4.198 5.458 11.919 2.704 17.244l-21.657 54.477c-1.597 5.796-7.844 10.455-13.824 10.455h-21.648c-5.919 0-10.793 4.894-10.793 10.844v45.855c0 5.98 4.874 10.885 10.793 10.885h21.637c5.98 0 12.237 4.618 13.998 10.363l26.583 62.7c3.062 5.161 2.017 12.82-2.109 17.060l-14.919 14.817c-4.229 4.24-4.229 11.079 0 15.36l32.43 32.399c4.249 4.199 11.162 4.199 15.299 0l15.933-15.862c4.25-4.219 11.879-5.376 17.203-2.519l55.624 22.18c5.653 1.639 10.363 7.885 10.363 13.824v21.218c0 5.959 4.885 10.844 10.823 10.844h45.895c5.918 0 10.803-4.885 10.803-10.844v-21.217c0-5.939 4.659-12.175 10.455-13.937l62.178-26.378c5.161-2.898 12.738-1.884 17.039 2.304l14.019 14.080c4.219 4.199 11.1 4.199 15.36 0l32.42-32.44c4.24-4.199 4.24-11.12 0-15.339l-14.981-14.899c-4.116-4.24-5.284-11.961-2.498-17.244l22.538-56.064c1.577-5.776 7.895-10.404 13.896-10.445h19.876c5.918 0 10.865-4.905 10.865-10.844v-45.855zM256.031 333.097c-42.649 0-77.097-34.539-77.097-77.107 0-42.578 34.447-77.056 77.097-77.056 42.526 0 77.087 34.478 77.087 77.056 0 42.567-34.56 77.107-77.087 77.107z"
							fill="#ffff"
							stroke="#ffff"
						></path>
					</svg>
				</a>
				<br></br> <br></br>
				<Select id="status" value={state.status} name="status" onChange={handleChange} required>
					<MenuItem value={"Planning"}>Planning</MenuItem>
					<MenuItem value={"Reading"}>Reading</MenuItem>
					<MenuItem value={"Paused"}>Paused</MenuItem>
					<MenuItem value={"Completed"}>Completed</MenuItem>
					<MenuItem value={"Dropped"}>Dropped</MenuItem>
				</Select>
				<br></br> <br></br>
				<TextField required id="title" label="Title" variant="outlined" />
				<br></br> <br></br>
				<TextField required id="cover" label="Cover" variant="outlined" />
				<br></br> <br></br>
				<TextField required id="progress" label="Progress" variant="outlined" type="number" />
				<br></br> <br></br>
				<TextField id="score" label="Score" variant="outlined" type="number" />
				<br></br> <br></br>
				<TextField id="url" label="URL" variant="outlined" />
				<br></br> <br></br>
				<input
					id="submit"
					type="submit"
					value="Submit"
					style={{ background: "rgb(61,180,242)", padding: "11px 16px" }}
				/>
			</form>
		</>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<Popup />
	</React.StrictMode>,
	document.getElementById("root")
);
