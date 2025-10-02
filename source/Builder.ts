import { fetchContent, fileExists, path, write } from "./fileManager.js";

export class Builder {
	// Config Manager
	
	fetchSavedConfig(
		config: string = "editingConfig"
	): Object {
		const name = !config.includes(".json") ? `${config}.json` : config;

		if (!fileExists(path(["configs", name]))) write("{ }", ["configs", name]);
		return JSON.parse(fetchContent(["configs", name]));
	}

	updateConfig(
		data: [string, any], // [Name, Data: <any>]
		config: string = "editingConfig"
	) {
		const name = !config.includes(".json") ? `${config}.json` : config;
		const cached = Object.assign(this.fetchSavedConfig(), {
			[data[0]]: data[1]
		});

		write(JSON.stringify(cached, null, 2), ["configs", name])
	}

	buildConfig(
		data: Object
	) {
		if (Object.keys(data).length === 0) {
			console.log("~ Your config cannot be empty ~");
			console.log("~ Add at least one thing before pushing changes.\n");
		} else {
			for (const configItem of Object.keys(data)) {
				console.log(configItem);
			}
		}
	}

	// Constructor

	changeLauncherMessage(
		content: string
	) {
		this.updateConfig(["launcherMessage", content]);
	}
}
