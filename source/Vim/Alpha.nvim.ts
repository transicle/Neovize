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
        source += `dashboard.section.footer.val = {\n    "${dashboard.footer}"\n}`;
    } else {
        source += "dashboard.section.footer.val = { }";
    }

    return source;
}

/**
 * 
 * Returns the Alpha.nvim package with the dashboard config relative to your configuration file.
 */
export function importAlpha(): string {
    return importPackage("goolord/alpha-nvim", `local dashboard = require(\"alpha.themes.dashboard\")\n\n${translateConfiguration()}\n\nalpha.setup(dashboard.config)`);
}