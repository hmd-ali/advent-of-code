import { createPart } from "../../util/create-part.js";
import { getHighestBank } from "./index.js";

const COUNT = 2;

export default createPart((input) => {
	const lines = input.trim().split("\n");
	const total = lines.reduce(
		(acc, curr) => acc + getHighestBank(curr, COUNT),
		0,
	);
	return `${total}`;
});
