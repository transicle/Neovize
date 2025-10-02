import { Builder } from "./Builder/Constructor.js";

// Managers
const Constructor = new Builder();
const Dashboard = new Constructor.DashboardController();

// Simple Stuff
Constructor.changeLauncherMessage("meowvim :3");

// Finalize and Build
Constructor.buildConfig(Constructor.fetchSavedConfig());