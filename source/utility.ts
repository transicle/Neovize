import figlet from "figlet";
import type { AsciiArtFonts } from "./types.js";

/**
 * 
 * Alternative to the **`.push`** method on Arrays, but returning
 *  an Array object instead of a number.
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
    font: AsciiArtFonts = "Standard"
): Promise<string> {
    return new Promise((resolve, reject) => {
        figlet.text(content, {
            font: font,
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 80,
            whitespaceBreak: true
        }, (issue, result) => {
            if (issue) reject(issue);
            else resolve(result || "");
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
