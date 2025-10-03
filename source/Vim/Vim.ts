import { readdirSync, rmSync } from "node:fs";
import {
    changeDirectory, copyDirectory, fetchContent,
    fileExists, newFolder, path
} from "../fileManager.js";
import { homedir } from "node:os";
import { append } from "../utility.js";

function fetchNeovimConfigPath(): string[] {
    return [homedir(), ".config", "nvim"];
}

export function saveOldConfig() {
    if (readdirSync(path(fetchNeovimConfigPath())).length === 0) {
        console.log("[!] No previous config to save.")
        return;
    }

    console.log("[/] Saving previous config ...");
    const preservedTime = Date.now();
    const folderName = `Neovize-Config-${preservedTime}`;
    const oldPath = [homedir(), ".config", "nvim", folderName];
    const finalPath = [process.cwd(), "configs", folderName];

    newFolder(oldPath);
    readdirSync(path(fetchNeovimConfigPath())).forEach(item => {
        const filePath = path(append(fetchNeovimConfigPath(), item));
        if (filePath !== path(oldPath)) {
            if (fileExists(filePath)) {
                changeDirectory(append(fetchNeovimConfigPath(), item), append(oldPath, item));
            }
        }
    });

    copyDirectory(oldPath, finalPath);
    rmSync(path(oldPath), {
        force: true,
        recursive: true
    });

    console.log(`[~] Saved previous config to "${path(finalPath)}".`);
}

export const init = append(fetchNeovimConfigPath(), "init.lua");

// Auto Commands
/**
 * 
 * Creates a new Neovim Auto Command without checking for duplicates.
 * 
 * @note We recommend using the **overrideAutoCommand** function instead, providing support for duplicate detection.
 * 
 * @warning The **callback** argument must be a string with Lua code.
 * @returns Formatted Neovim **`nvim_create_autocmd`** handle.
 */
export function newAutoCommand(
    name: string,
    callback: string
): string {
    return `vim.api.nvim_create_autocmd(${name}, {
    callback = function()
        ${callback}
    end
})`
}

/**
 * 
 * Searches through your **`init.lua`** for Neovim and overrides any matching Auto Commands
 *  with the information you provide.
 * 
 * @warning This function isn't designed to be called outside of the Neovim config builder!
 * @warning The **callback** argument must be a string with Lua code.
 */
export function overrideAutoCommand(
    autoCommand: string,
    callback: string
): string {
    const content = fetchContent(init);
    const regex = new RegExp(`vim\\.api\\.nvim_create_autocmd\\(\\s*${autoCommand}\\s*,\\s*{[\\s\\S]*?callback\\s*=\\s*function\\([^)]*\\)[\\s\\S]*?end[\\s\\S]*?}\\)`, "m");
    if (regex.test(content)) {
        return content.replace(regex, (match) => {
            return match.replace(/callback\s*=\s*function\([^)]*\)[\s\S]*?end/, `callback = function()\n        ${callback}\n    end`);
        });
    } else {
        return newAutoCommand(autoCommand, callback);
    }
}