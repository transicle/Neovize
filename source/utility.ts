import figlet from "figlet";
import type { AsciiArtFonts } from "./types.js";

/**
 * 
 * Alternative to the **`.pop`** method on Arrays, but returning
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