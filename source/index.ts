import { Builder } from "./Builder.js";

const ConfigBuilder = new Builder();

ConfigBuilder.changeLauncherMessage("uwu");
ConfigBuilder.buildConfig(ConfigBuilder.fetchSavedConfig());