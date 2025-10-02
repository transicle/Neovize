import { Builder } from "./Builder.js";

const ConfigBuilder = new Builder();

ConfigBuilder.changeLauncherMessage("meowvim :3");


ConfigBuilder.buildConfig(ConfigBuilder.fetchSavedConfig());