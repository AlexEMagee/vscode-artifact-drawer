import * as vscode from 'vscode';
import * as path from 'path';
import ArtifactsListProvider from './ArtifactsListProvider.js';
import { getDataFile } from 'vscode-extension-utilities';

const config = {
	dataFile: {
		filename: "artifacts.json",
		settingName: "db-file",
		extensionName: "artifact-drawer"
	}
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let treeDataProvider = new ArtifactsListProvider(getDataFile(
		context,
		config.dataFile.filename,
		config.dataFile.settingName,
		config.dataFile.extensionName
	));

	vscode.window.createTreeView('artifacts', {
		treeDataProvider: treeDataProvider
	});

	context.subscriptions.push(
		vscode.commands.registerCommand('artifact-drawer.loadArtifactLibrary', function () {
			treeDataProvider.initializeArtifactLibrary(getDataFile(
				context,
				config.dataFile.filename,
				config.dataFile.settingName,
				config.dataFile.extensionName
			));
		}),
		vscode.commands.registerCommand('artifact-drawer.importArtifact', function (item) {
			item.placeAtCursor();
		})
	);

	context.subscriptions.push(
		vscode.lm.registerTool('artifact-drawer_get_categories_list', new GetCategoriesTool(treeDataProvider))
	);
}

// This method is called when your extension is deactivated
function deactivate() {}

/**
 * @implements {vscode.LanguageModelTool<object>}
 */
class GetCategoriesTool {
	/**
	 * @param {ArtifactsListProvider} provider
	 */
	constructor(provider) {
		this.provider = provider;
	}

	invoke() {
		const categories = this.provider.getCategoryNames();
		return new vscode.LanguageModelToolResult([
			new vscode.LanguageModelTextPart(JSON.stringify(categories))
		]);
	}
}

export {
	activate,
	deactivate
}
