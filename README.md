# React Native Folder Structure Generator

A VS Code extension that generates a standardized folder structure for React Native projects. This extension helps you maintain a clean and organized codebase by creating a well-structured directory layout following React Native best practices.

## Features

- Creates a complete folder structure for React Native projects
- Adds README files in each directory explaining its purpose
- Follows React Native best practices and common patterns
- Easy to use through VS Code Command Palette

## Generated Structure

```
src/
├── assets/
│   ├── images/
│   └── fonts/
├── components/
│   ├── common/
│   └── screens/
├── navigation/
├── services/
│   ├── api/
│   └── storage/
├── utils/
├── hooks/
├── store/
│   ├── actions/
│   ├── reducers/
│   └── types/
├── theme/
├── localization/
└── config/
```

### Directory Purposes

- **assets**: Static assets like images, fonts, etc.
- **components**: Reusable React Native components
  - **common**: Shared components used across the application
  - **screens**: Screen-specific components
- **navigation**: Navigation configuration and stack navigators
- **services**: Services for API calls, storage, etc.
  - **api**: API service configurations and implementations
  - **storage**: Local storage implementations
- **utils**: Utility functions and helper methods
- **hooks**: Custom React hooks
- **store**: State management (Redux/Context) related files
- **theme**: Theme configuration (colors, typography, etc.)
- **localization**: Internationalization and localization files
- **config**: Application configuration files

## Usage

1. Install the extension from VS Code Marketplace
2. Open your React Native project in VS Code
3. Press `Cmd/Ctrl + Shift + P` to open the Command Palette
4. Type "Generate React Native Folder Structure" and select the command
5. The folder structure will be created in your workspace

## Requirements

- Visual Studio Code 1.60.0 or higher
- A React Native project (or any JavaScript/TypeScript project)

## Extension Settings

This extension doesn't require any additional settings.

## Known Issues

None at the moment.

## Release Notes

### 1.0.6

Initial release of React Native Folder Structure Generator

## Contributing

Feel free to open issues or submit pull requests on the [GitHub repository](https://github.com/ravibhavsar05/RN-FolderStructure).

## License

MIT
