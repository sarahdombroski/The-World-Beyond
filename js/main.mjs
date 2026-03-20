// Index.html
import { fetchData } from "./utils.mjs";

const wizard = await fetchData("classes/wizard");
console.log(wizard);