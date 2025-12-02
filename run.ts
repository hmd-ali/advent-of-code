#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { join } from "node:path";

const year = process.argv[2]
	? parseInt(process.argv[2], 10)
	: new Date().getFullYear();
const day = process.argv[3]
	? parseInt(process.argv[3], 10)
	: new Date().getDate();
const part = process.argv[4] ? parseInt(process.argv[4], 10) : 1;

console.log(`Running Year: ${year}, Day: ${day}, Part: ${part}`);

const modulePath = join(
	process.cwd(),
	"src",
	year.toString(),
	day.toString().padStart(2, "0"),
	`part-${part === 1 ? "one" : "two"}.js`,
);

const isExample = process.env.EXAMPLE === "true";
const inputPath = join(
	process.cwd(),
	"inputs",
	year.toString(),
	`${day.toString().padStart(2, "0")}${isExample ? "-example" : ""}.txt`,
);

let input: string | null = null;

try {
	input = await readFile(inputPath, "utf-8");
} catch (error) {
	console.error(`Error reading input file at ${inputPath}:`, error);
	process.exit(1);
}
try {
	const module = await import(modulePath);
	const result = await module.default(input);
	console.log(`${year}-${day} Part ${part} Result:`, result);
} catch (error) {
	console.error(`Error importing or executing module at ${modulePath}:`, error);
	process.exit(1);
}
