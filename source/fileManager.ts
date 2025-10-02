import { join } from "node:path";
import { type PathLike, readFileSync, existsSync, writeFileSync, rm } from "node:fs";

export function path(
	filePath: string[]
): PathLike {
	return join(process.cwd(), filePath.join("/"));
}

export function fileExists(
	filePath: PathLike
): boolean {
	return existsSync(filePath);
}

export function fetchContent(
	filePath: string[]
): string {
	if (!fileExists(path(filePath))) return "";
	return readFileSync(path(filePath), "utf-8");
}

export function write(
	content: string,
	filePath: string[],
	override: boolean = false
) {
	const makeFile = () => {
		writeFileSync(path(filePath), content, "utf-8");
	}

	if (override) rm(path(filePath), makeFile);
	makeFile();
}	
