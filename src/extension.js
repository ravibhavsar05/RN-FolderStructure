"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
function activate(context) {
    console.log('Extension "react-native-folder-structure" is now active!');
    let disposable = vscode.commands.registerCommand('react-native-folder-structure.generate', () => __awaiter(this, void 0, void 0, function* () {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('Please open a folder before generating React Native structure.');
            return;
        }
        const rootPath = workspaceFolders[0].uri.fsPath;
        try {
            // Ask for project name
            const projectName = yield vscode.window.showInputBox({
                prompt: 'Enter your React Native project name',
                placeHolder: 'MyAwesomeApp'
            });
            if (!projectName) {
                return; // User cancelled
            }
            // Generate folder structure
            createFolderStructure(rootPath, projectName);
            vscode.window.showInformationMessage(`React Native folder structure for ${projectName} created successfully!`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error creating folder structure: ${error}`);
        }
    }));
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function createFolderStructure(rootPath, projectName) {
    // Main folders
    const folders = [
        'src',
        'src/assets',
        'src/assets/images',
        'src/assets/fonts',
        'src/components',
        'src/components/common',
        'src/components/screens',
        'src/navigation',
        'src/services',
        'src/utils',
        'src/hooks',
        'src/redux',
        'src/redux/actions',
        'src/redux/reducers',
        'src/redux/store',
        'src/config',
        'src/types',
    ];
    // Create directories
    folders.forEach(folder => {
        const folderPath = path.join(rootPath, folder);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
    });
    // Create basic files
    const files = [
        {
            path: 'src/components/common/Button.tsx',
            content: `import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, disabled && styles.disabled]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#CCCCCC',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Button;`
        },
        {
            path: 'src/components/screens/HomeScreen.tsx',
            content: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../common/Button';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ${projectName}</Text>
      <Button 
        title="Press Me" 
        onPress={() => console.log('Button pressed')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;`
        },
        {
            path: 'src/navigation/AppNavigator.tsx',
            content: `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/screens/HomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: '${projectName}' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;`
        },
        {
            path: 'src/utils/helpers.ts',
            content: `/**
 * Format a date to a readable string
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Validate an email address
 */
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
};`
        },
        {
            path: 'src/hooks/useToggle.ts',
            content: `import { useState, useCallback } from 'react';

/**
 * A hook that provides toggle functionality
 */
const useToggle = (initialState = false): [boolean, () => void] => {
  const [state, setState] = useState(initialState);
  
  const toggle = useCallback(() => {
    setState(prevState => !prevState);
  }, []);
  
  return [state, toggle];
};

export default useToggle;`
        },
        {
            path: 'src/App.tsx',
            content: `import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;`
        },
        {
            path: 'src/types/index.ts',
            content: `export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AppError {
  code: string;
  message: string;
}

// Add more types as needed`
        },
        {
            path: 'package.json',
            content: `{
  "name": "${projectName.toLowerCase()}",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.72.6",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "react-native-safe-area-context": "^4.7.4",
    "react-native-screens": "^3.27.0",
    "react-native-gesture-handler": "^2.13.4"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-native": "^0.72.5",
    "typescript": "^5.2.2"
  }
}`
        }
    ];
    // Create files
    files.forEach(file => {
        const filePath = path.join(rootPath, file.path);
        fs.writeFileSync(filePath, file.content);
    });
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map