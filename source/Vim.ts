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
 * Searches 
 */
export function overrideAutoCommand(
    autoCommand: string,
    callback: string
): string {
    const regex = new RegExp(`vim\\.api\\.nvim_create_autocmd\\(\\s*${autoCommand}\\s*, \\s*\\{`, "m");
    const content = fetchContent(init);
    if (regex.test(fetchContent(init))) {
        return content.replace(regex, (_, beforeCallback, __, afterCallback) => {
            return `${beforeCallback}    ${callback}\n${afterCallback}`;
        });;
    } else {
        return newAutoCommand(autoCommand, callback);
    }
}