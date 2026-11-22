# Changelog

All notable changes to Artifact Drawer are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added `artifact-package` support for reading and organizing artifact libraries.

### Changed

- Centralized artifact library file resolution through `vscode-extension-utilities`.
- Added automatic creation of the configured artifact data file and its parent directory.

### Removed

- Removed the old VS Code extension quickstart document.

## [0.0.1] - 2026-11-12

### Added

- Added an Explorer view named **Artifacts**.
- Added category and artifact browsing from a JSON data file.
- Added an inline command for placing artifact snippets at the cursor.
- Added a refresh command for reloading the artifact library.
- Added the `artifact-drawer.db-file` setting for selecting a custom data file.
- Added support for workspace-specific and user-specific artifact data files.
- Added an initial data conversion utility.

### Changed

- Updated project documentation and license metadata.
- Updated extension dependencies and VS Code test tooling.
