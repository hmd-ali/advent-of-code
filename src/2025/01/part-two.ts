import { createPart } from "../../util/create-part.js";
export default createPart((input) => {
	const SIZE = 100;
	const TARGET = 0;
	const START = 50;

	let pos = START;
	let pass = 0;

	const check = (rot: string, pass: number, pos: number): [number, number] => {
		const [dir, dist] = [rot[0] as "L" | "R", parseInt(rot.slice(1), 10)];
		if (dist === 0) {
			return [pass, pos];
		}
		const step = {
			L: -1,
			R: 1,
		};
		const newPos = (pos + step[dir] + SIZE) % SIZE;
		return check(
			`${dir}${dist - 1}`,
			newPos === TARGET ? pass + 1 : pass,
			newPos,
		);
	};

	for (const rotation of input.trim().split("\n")) {
		const [newPass, newPos] = check(rotation, 0, pos);
		pass += newPass;
		pos = newPos;
	}

	return `${pass}`;
});
