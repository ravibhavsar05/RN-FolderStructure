import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { componentTemplates } from "./templates/componentTemplates";

interface FolderStructure {
	[key: string]: FolderStructure | string | undefined;
}

interface ComponentTemplate {
	component: string;
	test: string;
	styles: string;
}

interface ComponentTemplates {
	[key: string]: ComponentTemplate;
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

	// Register the folder structure generation command
	let generateCommand = vscode.commands.registerCommand(
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

			// Get configuration
			const config = vscode.workspace.getConfiguration('reactNativeFolderStructure');
			const template = config.get('template');
			const generateTests = config.get('generateTests');
			const generateStyles = config.get('generateStyles');
			const includeRedux = config.get('includeRedux');
			const includeNavigation = config.get('includeNavigation');

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
							Button: {
								"Button.tsx": componentTemplates.button.component,
								"Button.styles.ts": componentTemplates.button.styles,
								"__tests__": {
									"Button.test.tsx": componentTemplates.button.test
								},
								"index.ts": "export * from './Button';\n"
							},
							Card: {
								"Card.tsx": componentTemplates.card.component,
								"Card.styles.ts": componentTemplates.card.styles,
								"__tests__": {
									"Card.test.tsx": componentTemplates.card.test
								},
								"index.ts": "export * from './Card';\n"
							},
							"index.ts": "// Export all common components\nexport * from './Button';\nexport * from './Card';\n",
						},
					},
					navigation: includeNavigation ? {
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
					} : {},
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
					store: includeRedux ? {
						"index.ts": "// Export store configuration\n",
						reducers: {
							"index.ts": "// Export all reducers\n",
						},
						actions: {
							"index.ts": "// Export all actions\n",
						},
					} : {},
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

				// Generate test files if enabled
				if (generateTests) {
					await generateTestFiles(workspaceFolder.uri.fsPath);
				}

				// Generate style files if enabled
				if (generateStyles) {
					await generateStyleFiles(workspaceFolder.uri.fsPath);
				}

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

	// Register the component generation command
	let generateComponentCommand = vscode.commands.registerCommand(
		"react-native-folder-structure.generateComponent",
		async () => {
			const componentName = await vscode.window.showInputBox({
				prompt: "Enter component name",
				placeHolder: "MyComponent",
			});

			if (!componentName) {
				return;
			}

			const componentType = await vscode.window.showQuickPick(
				Object.keys(componentTemplates),
				{
					placeHolder: "Select component type",
				}
			);

			if (!componentType || !(componentType in componentTemplates)) {
				return;
			}

			const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
			if (!workspaceFolder) {
				vscode.window.showErrorMessage("Please open a workspace first!");
				return;
			}

			const componentsPath = path.join(
				workspaceFolder.uri.fsPath,
				"src",
				"components",
				"common",
				componentName
			);

			try {
				const template = componentTemplates[componentType as keyof typeof componentTemplates];
				
				// Create component directory
				fs.mkdirSync(componentsPath, { recursive: true });
				
				// Create component file
				const componentPath = path.join(
					componentsPath,
					`${componentName}.tsx`
				);
				fs.writeFileSync(
					componentPath,
					template.component.replace('../../theme', '../../../theme')
				);

				// Create test file if enabled
				const config = vscode.workspace.getConfiguration('reactNativeFolderStructure');
				if (config.get('generateTests')) {
					const testPath = path.join(
						componentsPath,
						`__tests__`,
						`${componentName}.test.tsx`
					);
					fs.mkdirSync(path.dirname(testPath), { recursive: true });
					fs.writeFileSync(
						testPath,
						template.test.replace('../' + componentName, '../' + componentName)
					);
				}

				// Create styles file if enabled
				if (config.get('generateStyles')) {
					const stylesPath = path.join(
						componentsPath,
						`${componentName}.styles.ts`
					);
					fs.writeFileSync(
						stylesPath,
						template.styles.replace('../../theme', '../../../theme')
					);
				}

				// Create index.ts for the component
				const indexPath = path.join(componentsPath, "index.ts");
				fs.writeFileSync(
					indexPath,
					`export * from './${componentName}';\n`
				);

				// Update common components index.ts
				const commonIndexPath = path.join(
					workspaceFolder.uri.fsPath,
					"src",
					"components",
					"common",
					"index.ts"
				);
				const commonIndexContent = fs.existsSync(commonIndexPath)
					? fs.readFileSync(commonIndexPath, "utf8")
					: "// Export all common components\n";
				fs.writeFileSync(
					commonIndexPath,
					commonIndexContent + `export * from './${componentName}';\n`
				);

				vscode.window.showInformationMessage(
					`Component ${componentName} created successfully!`
				);
			} catch (error) {
				vscode.window.showErrorMessage(
					`Error creating component: ${error}`
				);
			}
		}
	);

	context.subscriptions.push(generateCommand);
	context.subscriptions.push(generateComponentCommand);
	context.subscriptions.push(outputChannel);
}

async function createFolderStructure(
	basePath: string,
	structure: FolderStructure
) {
	for (const [name, subStructure] of Object.entries(structure)) {
		if (!subStructure) continue;
		
		const fullPath = path.join(basePath, name);
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

			await createFolderStructure(fullPath, subStructure);
		}
	}
}

async function generateTestFiles(basePath: string) {
	const componentsPath = path.join(basePath, "src", "components", "common");
	if (fs.existsSync(componentsPath)) {
		const components = fs.readdirSync(componentsPath);
		for (const component of components) {
			if (component.endsWith(".tsx") && !component.endsWith(".test.tsx")) {
				const componentName = path.basename(component, ".tsx");
				const testPath = path.join(
					componentsPath,
					"__tests__",
					`${componentName}.test.tsx`
				);
				fs.mkdirSync(path.dirname(testPath), { recursive: true });
				// Add basic test template
				fs.writeFileSync(
					testPath,
					`import React from 'react';
import { render } from '@testing-library/react-native';
import { ${componentName} } from '../${componentName}';

describe('${componentName}', () => {
	it('renders correctly', () => {
		const { getByTestId } = render(<${componentName} />);
		expect(getByTestId('${componentName.toLowerCase()}')).toBeTruthy();
	});
});`
				);
			}
		}
	}
}

async function generateStyleFiles(basePath: string) {
	const componentsPath = path.join(basePath, "src", "components", "common");
	if (fs.existsSync(componentsPath)) {
		const components = fs.readdirSync(componentsPath);
		for (const component of components) {
			if (component.endsWith(".tsx") && !component.endsWith(".styles.ts")) {
				const componentName = path.basename(component, ".tsx");
				const stylesPath = path.join(
					componentsPath,
					`${componentName}.styles.ts`
				);
				// Add basic styles template
				fs.writeFileSync(
					stylesPath,
					`import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: spacing.md,
	},
});`
				);
			}
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

	return `# ${folderName}\n\n${descriptions[folderName] || "Add description here."}\n`;
}

export function deactivate() { }
