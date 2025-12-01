import { createPart } from "../../util/create-part.js";

export default createPart((input) => {
	const DIAL_SIZE = 100;
	const TARGET = 0;
	const STARTING_POSITION = 50;

	let position = STARTING_POSITION;
	let password = 0;
	for (const rotation of input.trim().split("\n")) {
		const [direction, distance] = [
			rotation[0],
			parseInt(rotation.slice(1), 10),
		];
		for (let i = 0; i < distance; i++) {
			position =
				direction === "L"
					? (position - 1 + DIAL_SIZE) % DIAL_SIZE
					: (position + 1) % DIAL_SIZE;
			password += position === TARGET ? 1 : 0;
		}
	}
	return `${password}`;
});
