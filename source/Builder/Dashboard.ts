import type { AsciiArtFonts } from "../types.js";
import { textToAscii } from "../utility.js";

/**
 * 
 *  Neovim Dashboard manager powered by **Alpha.nvim**,
 *               made easy with Neovize
 * 
 * @GitHub https://github.com/goolord/alpha-nvim
 */
export class Dashboard {
    /**
     * 
     * Changes the center-most text you see in Neovim when no
     *  file is opened.
     * 
     * @param isAsciiArt Determines 
     */
    changeMessage(
        content: string,
        isAsciiArt: boolean = false,
        ArtFont: AsciiArtFonts = "Standard"
    ) {
        const message = !isAsciiArt ? content : textToAscii(content, ArtFont);
        
    }

    // Button Manager
    /**
     * 
     * Adds a button that goes *below* your dashboard text.
     * 
     * @note Buttons will automatically be aligned on the Y axis. Override this using the **`alignButtons`** method.
     */
    addButton(
        content: string,
        callback: () => any
    ) {

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
     */
    removeButton(
        index: number
    ) {

    }

    /**
     * 
     * Aligns buttons in a grid-like pattern.
     * 
     * @param gridWidth How many buttons should be aligned horizontally before a line break.
     * @param gridHeight The amount of buttons to be aligned vertically before cutting off. **Recommended**: "auto"
     * 
     * @param horizontalSpacing How many spaces (" ") should be present inbetween each button aligned horizontally.
     * @param verticalSpacing Amount of **line breaks** inbetween each item aligned vertically.
     * 
     * @note **Spaces** and **line breaks** can be different sizes.
     */
    alignButtons(
        gridWidth: number = 1,
        gridHeight: string | number = "auto",

        horizontalSpacing: number = 2,
        verticalSpacing: number = 1
    ) {

    }
}