import { createPart } from "../../util/create-part.js";

export default createPart((input) => {
	const ranges = input
		.trim()
		.split(",")
		.map((part) => {
			const [start, end] = part.split("-").map(Number);
			return { start, end };
		});

	const invalidIds = new Set<number>();

	for (const { start, end } of ranges) {
		let startId = start;
		while (startId <= end) {
			const idStr = startId.toString();
			const halfLength = idStr.length / 2;
			if (halfLength % 1 !== 0) {
				startId++;
				continue;
			}
			const [first, second] = [
				idStr.slice(0, halfLength),
				idStr.slice(halfLength),
			];
			if (first === second) {
				invalidIds.add(startId);
			}
			startId++;
		}
	}

	return `${Array.from(invalidIds).reduce((a, b) => a + b, 0)}`;
});
