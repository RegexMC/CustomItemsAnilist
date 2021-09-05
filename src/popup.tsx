import React from "react";
import ReactDOM from "react-dom";
import { TextField, Select, MenuItem } from "@material-ui/core";
import { getData, setData } from "./utils/utils";
import { Manga } from "./components/manga";
import { Status } from "./components/types";

// import { Select } from "@material-ui/core";

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
		console.log("test");
		const title: string = (document.getElementById("title") as any).value;
		const cover: string = (document.getElementById("cover") as any).value;
		const status: Status = document.getElementById("status")?.innerText as Status;
		const progress: number = (document.getElementById("progress") as any).value;
		const score: number = (document.getElementById("score") as any).value;
		const url: string | undefined = (document.getElementById("url") as any).value;

		if (!title || !cover || !status) {
			alert("Please fill in all required inputs!");
			return;
		}

		getData().then((data) => {
			var manga = new Manga(title, cover, status, progress, url, score);
			data.manga.push(manga);
			setData(data);
		});

		alert("Added manga");
	}

	return (
		<>
			<form noValidate autoComplete="off" style={{ minWidth: "50em" }} onSubmit={handleSubmit}>
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
				<TextField required id="score" label="Score" variant="outlined" type="number" />
				<br></br> <br></br>
				<TextField required id="url" label="URL" variant="outlined" />
				<br></br> <br></br>
				<input type="submit" value="Submit" />
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
