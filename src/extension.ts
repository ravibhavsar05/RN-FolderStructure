import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

interface FolderStructure {
	[key: string]: FolderStructure | string;
}

// Create output channel
let outputChannel: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext) {
	// Initialize output channel
	outputChannel = vscode.window.createOutputChannel(
		"React Native Folder Structure"
	);
	outputChannel.show();
	outputChannel.appendLine(
		'Extension "react-native-folder-structure" is now active!'
	);

	let disposable = vscode.commands.registerCommand(
		"react-native-folder-structure.generate",
		async () => {
			outputChannel.appendLine('Command "generate" was triggered');
			const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
			if (!workspaceFolder) {
				const errorMsg = "Please open a workspace first!";
				outputChannel.appendLine(`Error: ${errorMsg}`);
				vscode.window.showErrorMessage(errorMsg);
				return;
			}

			const folderStructure = {
				src: {
					api: {
						"index.ts": "// Export all API related functions\n",
						"endpoints.ts": "// Define API endpoints\n",
					},
					assets: {
						images: {},
						fonts: {},
						icons: {},
					},
					components: {
						common: {
							"Button.tsx":
								`import React from 'react';
								import { TouchableOpacity, Text, StyleSheet } from 'react-native';

							interface ButtonProps {
								title: string;
								onPress: () => void;
							}

							export const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
								return (
									<TouchableOpacity style={styles.button} onPress={onPress}>
										<Text style={styles.text}>{title}</Text>
									</TouchableOpacity>
								);
							};

							const styles = StyleSheet.create({
								button: {
									padding: 10,
									backgroundColor: '#007AFF',
									borderRadius: 5,
									alignItems: 'center',
								},
								text: {
									color: '#FFFFFF',
									fontSize: 16,
								},
							});`,
							"index.ts": "// Export all common components\nexport * from './Button';\n",
						},
					},
					navigation: {
						"index.ts": "// Export navigation configuration\n",
						"AppNavigator.tsx": `import React from 'react';
						import { NavigationContainer } from '@react-navigation/native';

							export const AppNavigator = () => {
								return (
									<NavigationContainer>
										{/* Add your navigation stack here */}
									</NavigationContainer>
								);
							};`,
					},
					screens: {
						Home: {
							"HomeScreen.tsx": `import React from 'react';
							import { View, Text, StyleSheet } from 'react-native';

							export const HomeScreen = () => {
								return (
									<View style={styles.container}>
										<Text>Welcome to Home Screen</Text>
									</View>
								);
							};

							const styles = StyleSheet.create({
								container: {
									flex: 1,
									justifyContent: 'center',
									alignItems: 'center',
								},
							});`,
							"styles.ts": "// Home screen styles\n",
						},
					},
					store: {
						"index.ts": "// Export store configuration\n",
						reducers: {
							"index.ts": "// Export all reducers\n",
						},
						actions: {
							"index.ts": "// Export all actions\n",
						},
					},
					utils: {
						"index.ts": "// Export utility functions\n",
						"helpers.ts": "// Helper functions\n",
					},
					hooks: {
						"index.ts": "// Export custom hooks\n",
						"useForm.ts": `import { useState } from 'react';

					export const useForm = <T extends object>(initialState: T) => {
						const [values, setValues] = useState(initialState);

						const handleChange = (name: keyof T, value: any) => {
							setValues(prev => ({
								...prev,
								[name]: value
							}));
						};

						return {
							values,
							handleChange,
						};
					};`,
					},
					theme: {
						"index.ts": "// Export theme configuration\n",
						"colors.ts": `export const colors = {
								primary: '#007AFF',
								secondary: '#5856D6',
								success: '#34C759',
								danger: '#FF3B30',
								warning: '#FF9500',
								info: '#5AC8FA',
								light: '#F2F2F7',
								dark: '#1C1C1E',
								white: '#FFFFFF',
								black: '#000000',
							};`,
						"spacing.ts": `export const spacing = {
							xs: 4,
							sm: 8,
							md: 16,
							lg: 24,
							xl: 32,
						};`,
					},
				},
			};

			
			try {
				await createFolderStructure(
					workspaceFolder.uri.fsPath,
					folderStructure
				);
				const successMsg =
					"React Native folder structure created successfully!";
				outputChannel.appendLine(successMsg);
				vscode.window.showInformationMessage(successMsg);
			} catch (error) {
				const errorMsg = `Error creating folder structure: ${error}`;
				outputChannel.appendLine(errorMsg);
				vscode.window.showErrorMessage(errorMsg);
			}
		}
	);

	context.subscriptions.push(disposable);
	// Add output channel to subscriptions to properly dispose
	context.subscriptions.push(outputChannel);
}

async function createFolderStructure(
	basePath: string,
	structure: FolderStructure
) {
	for (const [name, subStructure] of Object.entries(structure)) {
		const fullPath = path.join(basePath, name);
<<<<<<< HEAD
		outputChannel.appendLine(`Processing: ${fullPath}`);

		if (typeof subStructure === "string") {
			// This is a file
			fs.writeFileSync(fullPath, subStructure);
			outputChannel.appendLine(`Created file: ${fullPath}`);
		} else {
			// This is a directory
			if (!fs.existsSync(fullPath)) {
				fs.mkdirSync(fullPath, { recursive: true });
				outputChannel.appendLine(`Created directory: ${fullPath}`);
			} else {
				outputChannel.appendLine(`Directory already exists: ${fullPath}`);
			}

			// Create a README.md file in each folder explaining its purpose
			const readmePath = path.join(fullPath, "README.md");
			outputChannel.appendLine(`Creating README.md in: ${fullPath}`);
			const readmeContent = generateReadmeContent(name);
			fs.writeFileSync(readmePath, readmeContent);
			outputChannel.appendLine(`Created README.md in: ${fullPath}`);

=======
		outputChannel.appendLine(`Creating directory: ${fullPath}`);

		if (!fs.existsSync(fullPath)) {
			fs.mkdirSync(fullPath, { recursive: true });
			outputChannel.appendLine(`Created directory: ${fullPath}`);
		} else {
			outputChannel.appendLine(`Directory already exists: ${fullPath}`);
		}

		// Create a README.md file in each folder explaining its purpose
		const readmePath = path.join(fullPath, "README.md");
		outputChannel.appendLine(`Creating README.md in: ${fullPath}`);
		const readmeContent = generateReadmeContent(name);
		fs.writeFileSync(readmePath, readmeContent);
		outputChannel.appendLine(`Created README.md in: ${fullPath}`);

		if (typeof subStructure === "object") {
>>>>>>> 516cab6adc698a4b2eae268c748dd1b09f249945
			await createFolderStructure(fullPath, subStructure);
		}
	}
}

function generateReadmeContent(folderName: string): string {
	const descriptions: { [key: string]: string } = {
		src: "Source code for the React Native application",
		assets: "Static assets like images, fonts, etc.",
		images: "Image assets used in the application",
		fonts: "Custom fonts used in the application",
		components: "Reusable React Native components",
		common: "Common/shared components used across the application",
		screens: "Screen-specific components",
		navigation: "Navigation configuration and stack navigators",
		services: "Services for API calls, storage, etc.",
		api: "API service configurations and implementations",
		storage: "Local storage implementations",
		utils: "Utility functions and helper methods",
		hooks: "Custom React hooks",
		store: "State management (Redux/Context) related files",
		actions: "Redux actions/action creators",
		reducers: "Redux reducers",
		types: "TypeScript type definitions",
		theme: "Theme configuration (colors, typography, etc.)",
		localization: "Internationalization and localization files",
		config: "Application configuration files",
	};

	return `# ${folderName}\n\n${descriptions[folderName] || "Add description here."
		}\n`;
}

export function deactivate() { }
