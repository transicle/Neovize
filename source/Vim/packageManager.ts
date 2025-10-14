import { fetchSavedConfig, updateConfig } from "../Builder/Constructor.js";

/**
 * 
 * Checks your Neovim configuration and determines if said package is downloaded.
 * 
 * @warning This function isn't intended to be used outside of **`installPackage`**, however it will still work.
 * 
 * @returns A boolean value based off if the package is installed or not.
 */
export function isPackageInstalled(
    name: string
): boolean {
    updateConfig(["packages", []]);
    return fetchSavedConfig().packages.includes(name.toLowerCase());
}

/**
 * 
 * Extracts the package name from the URL and determines if it's already installed. If not,
 *  it will install it for you.
 * 
 * @note Installations will be applied *after* building your configuration. Until then, it's stored in your **`editingConfig.json`** file.
 */
export function installPackage(
    URL: string
) {
    const newPackage = URL.toLowerCase().replace("https://github.com/", "");
    if (!isPackageInstalled(newPackage)) {
        updateConfig(["packages", [...fetchSavedConfig().packages, newPackage]]);
        console.log(`[~] Added package: "${newPackage}"`);
    } else {
        console.log(`[!] Package "${newPackage}" already installed.`);
    }
}

/**
 * 
 * Returns the block of Lua code to install plugins without a plugin manager.
 * 
 * Made possible using Neovim's built-in "packadd" and modules for executing commands.
 * 
 * @note This shouldn't be used standalone. This module is used alongside `importPackage` for downloading plugins.
 */
export function createPackageInstaller(
    URL: string
): string {
    return `-- @Neovize/Packages ~ "${URL}" --
do
    local installPath = vim.fn.stdpath("config") .. "/pack/plugins/start/" .. (("${URL}"):match(".*/(.-)%.git$") or ("${URL}"):match(".*/(.-)$"))
    if vim.fn.empty(vim.fn.glob(installPath)) > 0 then
        vim.fn.system({ "git", "clone", "--depth=1", "${URL}", installPath })
        vim.cmd("packadd " .. (("${URL}"):match(".*/(.-)%.git$") or ("${URL}"):match(".*/(.-)$")))
    end

    vim.opt.rtp:prepend(installPath)
end`;
}

/**
 * 
 * @async
 * 
 * Search a **GitHub** repository for the plugin's initialization file.
 * 
 * The search result is the correct string which'll be used for the plugin's import.
 * 
 * @note Plugins written in VimScript are not supported. Only use plugins written in Lua that have a `**"lua"**` folder located in the root directory.
 */
export async function fetchPluginName(
    repository: string
): Promise<string> {
    const response = await fetch(`https://api.github.com/repos/${repository}/contents/lua`);
    if (!response.ok) {
        throw new Error(`[!] Failed to retrice the plugin's name, responded with code: ${response.status}`);
    }

    const data = await response.json() as { name: string }[]
    const file = data.find((found: any) => found.name.endsWith(".lua"));
    
    return file ? file.name : "init.lua";
}

/**
 * 
 * @async
 * 
 * Generate a Lua require block for a package.
 * 
 * Automatically extracts the plugin name from GitHub-style repository strings.
 * 
 * @param repo GitHub repo string, e.g. "goolord/alpha-nvim".
 * @param body Optional Lua code to put inside the `if ok then` block.
 */
export async function importPackage(
    repository: string,
    body: string = ""
): Promise<string> {
    const URL = `https://github.com/${repository}`;
    const pluginName = repository.split("/")[1]!.split(".")[0]!.replace(/\.git$/, "");
    const pluginVar = pluginName.replaceAll(".", "_").replaceAll("-", "_");
    const toRequire = (await fetchPluginName(repository)).replace(".lua", "");

    installPackage(URL);
    return `${createPackageInstaller(URL)}\n
local ok, __${pluginVar} = pcall(require, "${toRequire}")
if ok then
${body.split("\n").map(line => "    " + line).join("\n")}
end`;
}