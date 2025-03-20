# React Native Folder Structure Generator

A VS Code extension that generates a standardized folder structure for React Native projects. This extension helps you maintain a clean and organized codebase by creating a well-structured directory layout following React Native best practices.

## Features

- Creates a complete folder structure for React Native projects
- Adds README files in each directory explaining its purpose
- Follows React Native best practices and common patterns
- Easy to use through VS Code Command Palette

## Smart Component Generation

The extension provides a powerful component generation feature that helps you create React Native components with TypeScript support, tests, and styles.

### How to Generate a Component

1. Open the Command Palette (Cmd+Shift+P on macOS or Ctrl+Shift+P on Windows/Linux)
2. Type "React Native: Generate Component" and select it
3. Enter the component name when prompted (e.g., "CustomButton")
4. Select the component type from the available templates:
   - Button
   - Card
   - (More templates coming soon)

### What Gets Generated

For each component, the following structure is created:

```
components/
└── common/
    ├── Button/
    │   ├── Button.tsx
    │   ├── Button.styles.ts
    │   ├── __tests__/
    │   │   └── Button.test.tsx
    │   └── index.ts
    ├── Card/
    │   ├── Card.tsx
    │   ├── Card.styles.ts
    │   ├── __tests__/
    │   │   └── Card.test.tsx
    │   └── index.ts
    └── index.ts
```

1. **Component Directory** (`ComponentName/`):
   - Contains all files related to the component
   - Has its own `index.ts` for clean exports
   - Includes styles and tests in the same directory

2. **Component File** (`ComponentName.tsx`):
   - TypeScript React Native component
   - Props interface
   - Basic component structure
   - TestID for testing
   - Proper theme imports

3. **Test File** (`__tests__/ComponentName.test.tsx`):
   - Jest test setup
   - Basic render test
   - Test utilities

4. **Styles File** (`ComponentName.styles.ts`):
   - StyleSheet configuration
   - Theme integration
   - Common styling patterns

### Example Generated Files

#### Component File
```typescript
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../../theme';
import { styles } from './Button.styles';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                styles[variant],
                styles[size],
                disabled && styles.disabled,
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.text, styles[`${variant}Text`]]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};
```

#### Component Index File
```typescript
export * from './Button';
```

#### Common Components Index File
```typescript
// Export all common components
export * from './Button';
export * from './Card';
// ... other components
```

### Configuration Options

You can customize the component generation through VS Code settings:

1. Open VS Code Settings (Cmd+, on macOS or Ctrl+, on Windows/Linux)
2. Search for "React Native Folder Structure"
3. Configure the following options:
   - `generateTests`: Enable/disable test file generation
   - `generateStyles`: Enable/disable style file generation
   - `template`: Choose the default component template

### Best Practices

1. Use PascalCase for component names (e.g., `CustomButton`, `UserCard`)
2. Keep components in the appropriate directory structure
3. Write tests for all generated components
4. Use the theme system for consistent styling
5. Export components through the index.ts file

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

### 1.1.2
- Added smart component generation with templates
- Added configuration options for folder structure customization
- Added test file generation with Jest templates
- Added separate style file generation
- Added support for Redux and Navigation setup options
- Added Button and Card component templates with TypeScript support
- Improved error handling and user feedback
- Added output channel for better debugging


## Contributing

Feel free to open issues or submit pull requests on the [GitHub repository](https://github.com/ravibhavsar05/RN-FolderStructure).

## License

MIT
