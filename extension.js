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

}

// This method is called when your extension is deactivated
function deactivate() {}

export {
	activate,
	deactivate
}
