import { fetchContent } from "./fileManager.js";

export const init = ["example", "init.lua"]; // Example config for now

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