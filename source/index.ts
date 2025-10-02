import { Builder } from "./Builder.js";

const ConfigBuilder = new Builder();

ConfigBuilder.changeLauncherMessage("hello :3");
ConfigBuilder.buildConfig(ConfigBuilder.fetchSavedConfig());