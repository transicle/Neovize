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
Constructor.changeLauncherMessage("meowvim :3");

// Dashboard Customizer
Dashboard.changeMessage("hi2 :)");

Dashboard.addButton("Open Folder", "openfolder", 1);
Dashboard.addButton("Open File", "openfile", 2);

Dashboard.alignButtons(1, "auto", 2, 1);

Dashboard.saveButtons();

// Finalize and Build
Constructor.buildConfig(fetchSavedConfig());