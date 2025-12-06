import { createPart } from "../../util/create-part.js";

const ROLL = "@";
const EMPTY = ".";

const isAccessible = (cell: { x: number; y: number }, grid: string[][]) => {
	if (grid[cell.x][cell.y] === EMPTY) {
		return false;
	}
	let adjacent = 0;
	for (let i = cell.x - 1; i <= cell.x + 1; i++) {
		for (let j = cell.y - 1; j <= cell.y + 1; j++) {
			if (i === cell.x && j === cell.y) {
				continue;
			}
			adjacent += grid?.[i]?.[j] === ROLL ? 1 : 0;
		}
	}
	return adjacent < 4;
};

export default createPart((input) => {
	const grid: string[][] = [];
	input
		.trim()
		.split("\n")
		.forEach((line, row) => {
			grid.push([]);
			[...line].forEach((char, col) => {
				grid[row][col] = char;
			});
		});
	const result = grid.reduce((acc, curr, row) => {
		return (
			acc +
			curr.reduce((innerAcc, _, col) => {
				return innerAcc + (isAccessible({ x: row, y: col }, grid) ? 1 : 0);
			}, 0)
		);
	}, 0);
	return `${result}`;
});
