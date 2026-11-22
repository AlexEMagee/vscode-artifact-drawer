import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { Library } from 'artifact-package';

/**
 * @implements {vscode.TreeDataProvider<Dependency>}
 */
export default class ArtifactsListProvider {
  constructor(dbFile) {
    this.initializeArtifactLibrary(dbFile);
  }

  // Set up refresh event for initializeArtifactLibrary to repaint
  _onDidChangeTreeData = new vscode.EventEmitter();
  onDidChangeTreeData = this._onDidChangeTreeData.event;

  refresh() {
    this._onDidChangeTreeData.fire();
  }

  /**
   * @param {Artifact} element
   * @returns {vscode.TreeItem}
   */
  getTreeItem(element) {
    return element;
  }

  /**
   * @param {Artifact} element [null]
   * @return {Thenable<Artifact[]>}
   */
  getChildren(element) {
    if (!this.artifactLibrary) {
      vscode.window.showInformationMessage('No Artifact Library');
      return Promise.resolve([]);
    }

    if (element) {
      // return array of children of element but only if element is a category
      if(element instanceof Category) {
        return Promise.resolve(element.getArtifacts());
      }
      return Promise.resolve([]);
    } else {
      // return all of the categories
      return Promise.resolve(this.artifactLibrary);
    }
  }

  /** 
   * @param {string} dbFile
  */
  initializeArtifactLibrary(dbFile) {
    fs.mkdirSync(path.dirname(dbFile), { recursive: true });
    if(!fs.existsSync(dbFile)) {
      fs.writeFileSync(dbFile, JSON.stringify({ schemaVersion: 1, categories: [] }), 'utf8');
    }

    const artifactLibrary = Library.fromJSON(fs.readFileSync(dbFile));

    let categories;
    if(!fs.existsSync(dbFile)) {
      categories = [];
      vscode.window.showWarningMessage("No dbFile found at " + dbFile);
    } else {
      categories = JSON.parse(fs.readFileSync(dbFile));
    }
    vscode.window.showInformationMessage(categories);
    this.artifactLibrary = [];
    artifactLibrary.getCategories().forEach(category => {
      let artifacts = [];
      artifactLibrary.getCategoryArtifacts(category).forEach(artifact => {
        artifacts.push(new Artifact(artifact, artifactLibrary.getArtifact(category, artifact).snippet));
      });
      this.artifactLibrary.push(new Category(category, artifacts));
    });
    this.refresh();
  }
}

class Category extends vscode.TreeItem {
  constructor(label, artifacts) {
    super(label, vscode.TreeItemCollapsibleState.Collapsed);
    this.artifacts = artifacts;
    this.contextValue = "category";
  }

  getArtifacts() {
    return this.artifacts;
  }
}

class Artifact extends vscode.TreeItem {
  constructor(label, snippet) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.snippet = snippet;
    if(snippet.length > 25 ) {
      this.tooltip = snippet.substring(0, 25) + "...";
    } else {
      this.tooltip = snippet;
    }
    this.contextValue = "artifact";
  }

  placeAtCursor() {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showWarningMessage('No active editor');
      return;
    }

    editor.edit(editBuilder => {
      editBuilder.insert(editor.selection.active, this.snippet);
    });
  }
}
