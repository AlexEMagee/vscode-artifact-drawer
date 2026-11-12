import * as vscode from 'vscode';
import * as path from 'path';
import ArtifactsListProvider from './ArtifactsListProvider.js';

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let treeDataProvider = new ArtifactsListProvider(getDbFile(context))

	vscode.window.createTreeView('artifacts', {
		treeDataProvider: treeDataProvider
	});

	context.subscriptions.push(
		vscode.commands.registerCommand('artifact-drawer.loadArtifactLibrary', function () {
			treeDataProvider.initializeArtifactLibrary(getDbFile(context));
		}),
		vscode.commands.registerCommand('artifact-drawer.importArtifact', function (item) {
			item.placeAtCursor();
		})
	);

}

function getDbFile(context) {
	let config = vscode.workspace.getConfiguration("artifact-drawer");
	let customDbFile = config.get('db-file', '');
	let dbFile;
	if(customDbFile == "") {
		dbFile = path.join(context.globalStorageUri.fsPath, "artifacts.json");
	} else {
		dbFile = customDbFile;
	}
	return dbFile;
}

// This method is called when your extension is deactivated
function deactivate() {}

export {
	activate,
	deactivate
}
