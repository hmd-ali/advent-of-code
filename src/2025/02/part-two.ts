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
			const length = idStr.length;
			const [...parts] = Array.from({ length: length - 1 }, (_, i) =>
				idStr.slice(0, i + 1),
			);
			const isInvalid = parts.some((part) => {
				const x = idStr.split(part).filter((s) => s !== "").length === 0;
				return x;
			});
			if (isInvalid) {
				invalidIds.add(startId);
			}
			startId++;
		}
	}

	return `${Array.from(invalidIds).reduce((a, b) => a + b, 0)}`;
});
