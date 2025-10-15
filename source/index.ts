/**
 * 
 * This is an example Neovim configuration until I finish the majority of it
 *  and transform this into an NPM/PNPM package.
 * 
 * Until then, this sample configuration will remain here.
 * 
 */

import { Builder } from "./Builder/Constructor.js";


// Managers

const Constructor = new Builder();
const Dashboard = new Constructor.DashboardController();


// Dashboard Customizer

Dashboard.changeMessage(["Neovize"], true, "Banner");

Dashboard.addButton("Control + C", "New File", "ene <BAR> startinsert<CR>", 1);
Dashboard.addButton("Alt + O", "Open Previous", "e#<CR>", 2);

Dashboard.changeFooter("Neovim configuration made simple using JavaScript.");

Dashboard.saveButtons();


// Packages

await Constructor.downloadPackage("nvim-tree/nvim-tree.lua", `__nvim_tree.setup()`);


// Finalize and Build

await Constructor.buildConfig();