# artifact-drawer README

The Artifact Drawer is a tool for viewing and placing code snippets from a library.

## Features

This extension adds a view to the Explorer called "Artifacts" that shows all current Artifacts and any relevant snippets contained by them. Each snippet includes a button to insert the code at your cursor.

The Artifacts Drawer includes a refresh button so you can reload the library when making changes to the data file or modifying the dbFile setting.

The data files can be saved per workspace or per user.

## Language Model Tools

The extension contributes four tools to VS Code Chat and agent mode. Reference them in a chat prompt with `#`:

| Tool reference | Purpose | Input |
| --- | --- | --- |
| `#artifactCategories` | Lists the categories in the current artifact library. | None |
| `#artifactArtifactsFromCategory` | Lists artifact names in a category. | `category`: the category name |
| `#artifactArtifactSnippet` | Returns the code snippet for an artifact. | `category`: the category name; `artifact`: the artifact name |
| `#artifactArtifactType` | Returns the type description for an artifact, to help explain its role and format. | `category`: the category name; `artifact`: the artifact name |

For example, ask the agent to list the categories, find artifacts in a selected category, check an artifact's type, and retrieve its snippet.

## Requirements

VS Code 1.146.0 or later. Use a VS Code Chat or agent experience that supports extension language model tools to access the tools.

## Extension Settings

This extension contributes the following settings:

* `artifact-drawer.db-file`: Customize where the extension looks for the library data file.

## Release Notes

### 0.0.3

Added language model tools for listing categories and artifacts, retrieving artifact types, and retrieving snippets.

## 0.0.2

Internal version for testing vscode agent integration.

### 0.0.1

Initial testing release. You must manually create the JSON data file.

## Future Plans

- Support for online data files and authentication for sensitive or proprietary code snippets
- A companion extension that will help create artifacts
- "Intended file path" option for automating implementation into js, sass, or other utility files
- Single-click import for Artifacts to avoid the headache of multiple implementation targets

## Building a data file

Data files are stored in JSON format. Until I have a workbench put together, data files must be built manually as shown below. The top-level object must include `schemaVersion: 1` and a `categories` array.

Each category has a `title` and an `artifacts` array. Categories could be a website widget or a java class framework (*Example Div* in the code block below).

Each artifact has a `title`, `type`, and `snippet`. The artifacts array should contain all pieces of code needed to properly recreate the element you are building. In the example below, I have defined an html, css, and JavaScript snippet.

```json
{
  "schemaVersion": 1,
  "categories": [
    {
      "title": "Example Div",
      "artifacts": [
        {
          "title": "markup",
          "type": "html",
          "snippet": "<div>\nHello World\n</div>"
        },
        {
          "title": "styles",
          "type": "css",
          "snippet": "div {color: blue}"
        },
        {
          "title": "behavior",
          "type": "js",
          "snippet": "console.log(\"It works!\");"
        }
      ]
    }
  ]
}
```