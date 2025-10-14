/**
 * 
 * This is an example Neovim configuration until I finish the majority of it
 *  and transform this into an NPM/PNPM package.
 * 
 * Until then, this sample configuration will remain here.
 * 
 */

import { Builder, fetchSavedConfig } from "./Builder/Constructor.js";


// Managers

const Constructor = new Builder();
const Dashboard = new Constructor.DashboardController();


// Dashboard Customizer

Dashboard.changeMessage(["Neovize"], true, "Slant");

Dashboard.addButton("e", "New File", "ene <BAR> startinsert<CR>", 1);
Dashboard.addButton("l", "Open Previous", "e#<CR>", 2);

Dashboard.changeFooter("Neovim configuration made simple using JavaScript.");

Dashboard.saveButtons();


// Finalize and Build

Constructor.buildConfig(fetchSavedConfig());