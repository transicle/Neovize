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
    // This function is a huge mess, but luckily this'll only need to be finished one time.

    let source = "";

    const content = fetchSavedConfig(config);
    const dashboard = content.dashboard;

    source += "-- @Neovize/Alpha.nvim/Header --\n\n";
    source += "dashboard.section.header.opts = {\n    position = \"center\"\n}\n\n";
    if (dashboard.message && dashboard.message.trim() !== "") {
        source += `dashboard.section.header.val = {\n   "${dashboard.message}"\n}\n\n\n`;
    } else {
        source += "dashboard.section.header.val = { }\n\n\n";
    }

    source += "-- @Neovize/Alpha.nvim/Buttons --\n\n";
    source += "dashboard.section.buttons.opts = {\n    position = \"center\"\n}\n\n";
    if (dashboard.buttons && Object.keys(dashboard.buttons).length > 0) {
        let table = "dashboard.section.buttons.val = {\n";
        const entries = Object.values(dashboard.buttons);
        entries.forEach((values, index) => {
            const comma = index < entries.length - 1 ? "," : "";
            table += `    dashboard.button("${values.keybind}", "${values.text}", ":${values.action.replace(/^:/, "")}")${comma}\n`;
        });

        table += "}\n\n\n";
        source += table;
    } else {
        source += "dashboard.section.buttons.val = { }\n\n\n";
    }

    source += "-- @Neovize/Alpha.nvim/Footer --\n\n";
    source += "dashboard.section.footer.opts = {\n    position = \"center\"\n}\n\n";
    if (dashboard.footer && dashboard.footer.trim() !== "") {
        source += `dashboard.section.footer.val = {\n    "${dashboard.footer}"\n}\n\n\n`;
    } else {
        source += "dashboard.section.footer.val = { }\n\n\n";
    }

    // Vertical Centering after Horizontal

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
    return importPackage("goolord/alpha-nvim", `local dashboard = require(\"alpha.themes.dashboard\")\n\n${translateConfiguration()}\n\nalpha.setup(dashboard.config)`);
}