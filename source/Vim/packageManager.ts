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
 * Generate a Lua require block for a package.
 * 
 * Automatically extracts the plugin name from GitHub-style repository strings.
 * 
 * @param repo GitHub repo string, e.g. "goolord/alpha-nvim".
 * @param body Optional Lua code to put inside the `if ok then` block.
 */
export function importPackage(
    repository: string,
    body: string = ""
): string {
    const URL = `https://github.com/${repository}`;
    const pluginName = repository.split("/")[1]!.split(".")[0]!.replace(/\.git$/, "");
    const pluginVar = pluginName.replaceAll(".", "_").replaceAll("-", "_");

    installPackage(URL);
    return `${createPackageInstaller(URL)}\n
local ok, __${pluginVar} = pcall(require, "${pluginName}")
if ok then
${body.split("\n").map(line => "    " + line).join("\n")}
end`;
}