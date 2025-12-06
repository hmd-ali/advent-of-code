export const getHighestBank = (bank: string, batteryLength: number) => {
	const map = new Map<string, number[]>();
	[...bank].forEach((digit, index) => {
		const existing = map.get(digit);
		if (existing) {
			existing.push(index);
		} else {
			map.set(digit, [index]);
		}
	});
	const entries = map
		.entries()
		.toArray()
		.toSorted(([a], [b]) => Number(b) - Number(a));
	let index = -1;
	let string = "";
	let batteryIndex = 0;
	while (batteryIndex < batteryLength) {
		for (let i = 0; i < entries.length; i++) {
			const isHigher = entries[i][1].some(
				(x) => x > index && x <= bank.length - batteryLength + batteryIndex,
			);
			if (isHigher) {
				index =
					entries[i][1].find(
						(x) => x > index && x <= bank.length - batteryLength + batteryIndex,
					) ?? index;
				string += entries[i][0];
				batteryIndex++;
				break;
			}
		}
	}
	return parseInt(string, 10);
};
