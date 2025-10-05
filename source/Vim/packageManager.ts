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
    const newPackage = URL.toLowerCase().replace("https://github.com/", "")
    if (!isPackageInstalled(newPackage)) {
        updateConfig(["packages", [...fetchSavedConfig().packages, newPackage]]);
        console.log(`[~] Added package: "${newPackage}"`);
    }
}