# artifact-drawer README

The Artifact Drawer is a tool for viewing and placing code snippets from a library.

## Features

This extension adds a view to the Explorer called "Artifacts" that shows all current Artifacts and any relevant snippets contained by them. Each snippet includes a button to insert the code at your cursor.

The Artifacts Drawer includes a refresh button so you can reload the library when making changes to the data file or modifying the dbFile setting.

The data files can be saved per workspace or per user.

## Requirements

Currently there are no requirements other than vscode.

## Extension Settings

This extension contributes the following settings:

* `artifact-drawer.dbFile`: Customize where the extension looks for the library data file.

## Release Notes

### 0.0.1

Initial testing release. You must manually create the JSON data file.

## Future Plans

- Support for online data files and authentication for sensitive or proprietary code snippets
- A companion extension that will help create artifacts
- "Intended file path" option for automating implementation into js, sass, or other utility files
- Single-click import for Artifacts to avoid the headache of multiple implementation targets
- MCP for agent implementation

## Building a data file

Data files are stored in JSON format. Until I have a workbench put together, data files must be built manually as shown below.

Create an array of titled Categories. Categories could be a website widget or a java class framework (*Example Div* in the code block below).

Each Category should include an array titled *artifacts* that contain an object with a title and snippet. The artifacts array should contain all pieces of code needed to properly recreate the element you are building. In the example below, I have defined an html, css, and JavaScript snippet.

```json
[
    {
        "title": "Example Div",
        "artifacts": [
            {
                "title": "html",
                "snippet": "<div>\nHello World\n</div>"
            },
            {
                "title": "css",
                "snippet": "div {color: blue}"
            },
            {
                "title": "js",
                "snippet": "console.log(\"It works!\");"
            }
        ]
    }
]
```