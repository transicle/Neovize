import { write } from "../fileManager.js";
import type { AsciiArtFonts } from "../types.js";
import { textToAscii, toNeovimKeybind } from "../utility.js";
import { installPackage } from "../Vim/packageManager.js";
import { fetchSavedConfig, updateConfig } from "./Constructor.js";

/**
 * 
 * Neovize's dashboard handler, powered by **Alpha.nvim**.
 * 
 * Easily design a beautiful Neovim dashboard using the built in methods for this class.
 */
export class Dashboard {
    /**
     * 
     * @async
     * 
     * Changes the center-most text you see in Neovim when no
     *  file is opened.
     * 
     * @param isAsciiArt Determines if the text provided should be converted into ascii art.
     */
    async changeMessage(
        content: string[],
        isAsciiArt: boolean = false,
        ArtFont: AsciiArtFonts = "Standard"
    ) {
        let current = "";
        for (const message of content) {
            current += message;
        }

        const message = !isAsciiArt ? content : await textToAscii(current, ArtFont, 80);
        const config = fetchSavedConfig();
        config.dashboard = {
            ...config.dashboard,
            message: []
        };

        write(JSON.stringify(config, null, 2), ["configs", "editingConfig.json"]);
        updateConfig(["dashboard", {
            "message": message
        }]);

        console.log("[!] Updated dashboard header.");
    }

    changeFooter(
        content: string
    ) {
        updateConfig(["dashboard", {
            "footer": content
        }]);

        console.log("[!] Updated dashboard footer.");
    }

    // Button Manager
    /**
     * 
     * Adds a button that goes *below* your dashboard text.
     * 
     * @note Buttons will automatically be aligned on the Y axis. Override this using the **`alignButtons`** method.
     * @warning To save buttons, use the **`saveButtons()`** method.
     */
    private pendingButtons: {[key: string]: { keybind: string, text: string, action: string } } = {};
    addButton(
        keybind: string,
        content: string,
        action: string,
        index: number
    ) {
        // const nextIndex = Object.keys(this.pendingButtons).length + 1;
        this.pendingButtons[`Button${index}`] = {
            keybind: toNeovimKeybind(keybind),
            text: content,
            action
        };

        console.log(`[!] Added "${content}" to the pending buttons.`);
    }

    /**
     * 
     * Removes a button based off the index of the button.
     * 
     * @example
     * ```
     * const Constructor = new Builder();
     * const Dashboard = new Constructor.DashboardController();
     * 
     * Dashboard.removeButton(2); // Removes the 2nd button.
     * ```
     * 
     * @note Every index higher than the removed index will be shifted down 1 to account for the loss.
     * @warning To save buttons, use the **`saveButtons()`** method.
     */
    removeButton(
        index: number
    ) {
        const button = `Button${index}`; // 1-based indexing, similar to Lua's standards.
        const name = this.pendingButtons[button]?.text;

        console.log(`[/] Removing "${name}" from the pending buttons ...`);

        delete this.pendingButtons[button];
        for (const [key, button] of Object.entries(this.pendingButtons)) {
            if (!button) continue;
            const thisIndex = parseInt(key.replace("Button", ""));
            delete this.pendingButtons[key];

            this.pendingButtons[`Button${thisIndex - 1}`] = button;
        }

        console.log(`[!] "${name}" has been removed.`);
    }

    /**
     * 
     * Save all previously added buttons to your configuration file.
     * 
     * @warning All buttons left unsaved will not be applied when building your configuration.
     */
    saveButtons() {
        installPackage("https://github.com/goolord/alpha-nvim");

        const config = fetchSavedConfig();
        config.dashboard = {
            ...config.dashboard,
            buttons: { ...this.pendingButtons }
        };

        write(JSON.stringify(config, null, 2), ["configs", "editingConfig.json"]);
    }
}