import { fetchSavedConfig } from "../Builder/Constructor.js";
import { importPackage } from "./packageManager.js";

/**
 * 
 * Reads your saved configuration file and converts that into a legible Alpha.nvim Lua configuration that's able to be interpreted.
 * 
 * @note Automatically handles cases for missing items, such as buttons, footers, or headers.
 */
export function translateConfiguration(
    config: string = "editingConfig"
): string {
    const content = fetchSavedConfig(config);
    const dashboard = content.dashboard;

    const renderArray = (array?: string[]) => array && array.length ? `\n   ${array
        .map(message => `"${message.replace(/\\/g, "\\\\")}"`)
        .join(",\n   ")}\n` : "";
         
    const renderFooter = (footer?: string) => footer && footer.trim() !== "" ? `\n    "${footer}"\n` : "";
    const renderButtons = (buttons?: Record<string, {
        keybind: string,
        text: string,
        action: string
    }>) => {
        if (!buttons || Object.keys(buttons).length === 0) return " { }\n\n\n";
        return ` = {\n${Object.values(buttons)
            .map((button, index, array) => `    dashboard.button("${button.keybind}", "${button.text}", ":${button.action.replace(/^:/, "")}")${index < array.length - 1 ? "," : ""}`)
            .join("\n")}\n}\n\n\n`;
    };

    let source = "";

    source += "-- @Neovize/Alpha.nvim/Header --\n\n";
    source += "dashboard.section.header.opts = {\n    position = \"center\"\n}\n\n";
    source += `dashboard.section.header.val = {${renderArray(dashboard.message)}}\n\n\n`;

    source += "-- @Neovize/Alpha.nvim/Buttons --\n\n";
    source += "dashboard.section.buttons.opts = {\n    position = \"center\"\n}\n\n";
    source += `dashboard.section.buttons.val${renderButtons(dashboard.buttons)}`;

    source += "-- @Neovize/Alpha.nvim/Footer --\n\n";
    source += "dashboard.section.footer.opts = {\n    position = \"center\"\n}\n\n";
    source += `dashboard.section.footer.val = {${renderFooter(dashboard.footer)}}\n\n\n`;

    source += `local padding = math.floor((vim.fn.winheight(0) - (#dashboard.section.header.val + #dashboard.section.buttons.val + #dashboard.section.footer.val + 8)) / 2)\n\n`;

    source += `dashboard.config.layout = {
    {
        type = "padding",
        val = padding
    },
    dashboard.section.header,
    {
        type = "padding",
        val = 2
    },
    dashboard.section.buttons,
    {
        type = "padding",
        val = 2
    },
    dashboard.section.footer
}`;

    return source;
}


/**
 * 
 * Returns the Alpha.nvim package with the dashboard config relative to your configuration file.
 */
export function importAlpha(): string {
    return importPackage("goolord/alpha-nvim", `local dashboard = require(\"alpha.themes.dashboard\")\n\n${translateConfiguration()}\n\n__alpha_nvim.setup(dashboard.config)`);
}