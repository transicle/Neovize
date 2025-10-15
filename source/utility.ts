import figlet from "figlet";
import { fetchContent } from "./fileManager.js";
import type { AsciiArtFonts } from "./types.js";

/**
 * 
 * Alternative to the **`.push`** method on Arrays, but returning
 *  an Array object instead of the index of the added object (number).
 */
export function append<T>(
    array: T[],
    data: T
): T[] {
    return [...array, data];
}

/**
 * 
 * Barebones ascii text art generator powered by Figlet.
 */
export function textToAscii(
    content: string,
    font: AsciiArtFonts = "Standard",
    artSize: number = 80
): Promise<string[]> {
    return new Promise((resolve, reject) => {
        figlet.text(content, {
            font,
            horizontalLayout: "default",
            verticalLayout: "default",
            width: artSize,
            whitespaceBreak: true
        }, (issue, result) => {
            if (issue) return reject(issue);
            resolve((result || "").split("\n"));
        });
    });
}

export function merge(
    target: any,
    source: any
): any {
    for (const key in source) {
        const sourceVal = source[key];
        let targetVal = target[key];
        if (sourceVal && typeof sourceVal === "object" && !Array.isArray(sourceVal)) {
            if (!targetVal || typeof targetVal !== "object") {
                target[key] = {};
                targetVal = target[key];
            }
            
            merge(targetVal, sourceVal);
        } else if (Array.isArray(sourceVal)) {
            target[key] = Array.isArray(targetVal)
                ? [...targetVal, ...sourceVal.filter((value: any) => !targetVal.includes(value))]
                : [...sourceVal];
        } else target[key] = sourceVal;
    }

    return target;
}

export function fetchNeovizeVersion(): string {
    return JSON.parse(fetchContent(["package.json"])).version;
}

/**
 * 
 * Translate strings such as `**"Control + C"**` to Neovim-legible keybinds like `**"<C-C>"**`.
 * 
 * @note This function is used inside Neovize, usage outside of Neovize's internals is not needed.
 */
export function toNeovimKeybind(
    input: string
): string {
    const parts = input.split(/\s*\+\s*/).map(p => p.trim().toLowerCase());

    let mainKey = parts.pop() || "";
    const mods = parts.map(modifier => modifiers[modifier] || "").filter(Boolean);

    if (mainKey === "space") mainKey = "Space";
    if (mods.length > 0) {
        return mods.join("") + mainKey.toUpperCase() + (mods[0]!.endsWith("-") ? ">" : "");
    }

    return mainKey.length === 1 ? mainKey : `<${mainKey.toUpperCase()}>`;
}

const modifiers: { [key: string]: string } = {
    "ctrl": "<C-",
    "control": "<C-",
    "lctrl": "<C-",
    "lcontrol": "<C-",
    "rctrl": "<C-",
    "rcontrol": "<C-",
    "alt": "<A-",
    "lalt": "<A-",
    "ralt": "<A-",
    "super": "<D-",
    "cmd": "<D-",
    "space": "<Space>"
}