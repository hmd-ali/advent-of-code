import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const loadInput = async <T = string>(
	year: number,
	day: number,
): Promise<T> => {
	const filePath = join(
		process.cwd(),
		"inputs",
		year.toString(),
		`${day.toString().padStart(2, "0")}.txt`,
	);
	try {
		const data = await readFile(filePath, "utf-8");
		return data as unknown as T;
	} catch (error) {
		console.error(`Error reading input file at ${filePath}:`, error);
		throw error;
	}
};
