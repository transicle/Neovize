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

// Simple Stuff
Constructor.changeLauncherMessage("Close Neovim using :q ~ Learn more using :help ~ Use commands using :");

// Dashboard Customizer
Dashboard.changeMessage("Neovize");

Dashboard.addButton("e", "New File", "ene <BAR> startinsert<CR>", 2);

Dashboard.changeFooter("Neovim styled beautifully using JavaScript");

Dashboard.saveButtons();

// Finalize and Build
Constructor.buildConfig(fetchSavedConfig());