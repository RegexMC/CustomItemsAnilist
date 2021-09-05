import { Manga } from "./manga";

type Status = "Planning" | "Reading" | "Paused" | "Completed" | "Dropped";
type Data = { history: String[]; manga: Manga[] };

export { Status, Data };
