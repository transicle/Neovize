import { join } from "node:path";
import { append } from "./utility.js";
import {
	type PathLike, readFileSync, existsSync,
	writeFileSync, rm, mkdirSync,
	readdirSync, lstatSync, copyFileSync,
	rmSync
} from "node:fs";

export function path(
	filePath: string[]
): PathLike {
	return join(...filePath);
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

export function changeDirectory(
	filePath: string[],
	newDirectory: string[]
) {
	if (lstatSync(path(filePath)).isDirectory()) {
		copyDirectory(filePath, newDirectory);
		rmSync(path(filePath), {
			recursive: true,
			force: true
		});
	} else {
		copyFileSync(path(filePath), path(newDirectory));
		rmSync(path(filePath));
	}
}

export function newFolder(
	filePath: string[]
) {
	mkdirSync(path(filePath), {
		recursive: true
	});
}

export function copyDirectory(
	previousPath: string[],
	newPath: string[]
) {
	if (!fileExists(path(newPath))) {
		newFolder(newPath);
	}

	const items = readdirSync(path(previousPath));
	items.forEach(value => {
		if (lstatSync(path(append(previousPath, value))).isDirectory()) {
			copyDirectory(append(previousPath, value), append(newPath, value));
		} else {
			copyFileSync(path(append(previousPath, value)), path(append(newPath, value)));
		}
	});
}

export function remove(
	filePath: string[]
) {
	rmSync(path(filePath), {
		force: true
	});
}