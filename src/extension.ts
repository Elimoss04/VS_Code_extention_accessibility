// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


// WEBVIEW PROVIDER FOR DOCUMENTATION VIEW
class DocumentationViewProvider implements vscode.WebviewViewProvider {

	public static readonly viewType = 'documentation';

	constructor(private readonly _extensionUri: vscode.Uri) {
		console.log('DocumentationViewProvider initialized with extension URI:');
	}

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		_context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken
	) {
		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [this._extensionUri]
		};

		webviewView.webview.html = this.getWebviewContent(webviewView.webview);
		console.log('Documentation view resolved');
	}

	private getWebviewContent(webview: vscode.Webview): string {
	
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<style>
			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}
			body {
				font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
				padding: 20px;
				line-height: 1.6;
				color: var(--vscode-foreground);
				background-color: var(--vscode-editor-background);
			}
			h1 {
				color: var(--vscode-textLink-foreground);
				margin-bottom: 15px;
				font-size: 24px;
			}
			p {
				margin-bottom: 12px;
				font-size: 14px;
			}
		</style>
	</head>

	<body>
		<p> Insert documentation here </p>
	</body>

	</html>`;
	
	}
}

// WEBVIEW PROVIDER FOR ANALYSIS VIEW
class AnalysisViewProvider implements vscode.WebviewViewProvider {

	public static readonly viewType = 'analysis';

	constructor(private readonly _extensionUri: vscode.Uri) {}

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		_context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken
	) {
		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [this._extensionUri]
		};

		webviewView.webview.html = this.getWebviewContent(webviewView.webview);
		console.log('Analysis view resolved');
	}

	private getWebviewContent(webview: vscode.Webview): string {
	
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
	</head>

	<body>
		<h1>Analysis</h1>
		<p>Code analysis tools and results will appear here.</p>
	</body>

	</html>`;
	
	}
}




// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "accessibility-assistant" is now active!');

	// Register webview view providers for both sidebar views
	const docProvider = new DocumentationViewProvider(context.extensionUri);
	console.log('Registering DocumentationViewProvider with view type:');
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(DocumentationViewProvider.viewType, docProvider)
	);

	const analysisProvider = new AnalysisViewProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(AnalysisViewProvider.viewType, analysisProvider)
	);




	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('accessibility-assistant.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hi there! Accessibility Assistant is here to help you. Let\'s get started!');
		var panel = vscode.window.createWebviewPanel(
			'accessibilityAssistant', // Identifies the type of the webview. Used internally
			'Accessibility Assistant', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{
				enableScripts: true // Enable scripts in the webview
			}
		);
		
		panel.webview.html = getWebviewContent();
	});



	context.subscriptions.push(disposable);

	console.log('Extension activation complete');
}

function getWebviewContent() {
	return `<!DOCTYPE html>
	<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            padding: 20px;
            line-height: 1.6;
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
        }
        h1 {
            color: var(--vscode-textLink-foreground);
            margin-bottom: 15px;
        }
        p {
            margin-bottom: 10px;
        }
    </style>
</head>

<body>
    <h1>Welcome to Accessibility Assistant!</h1>
    <p>This extension is designed to help you improve the accessibility of your code. 
    It provides tools and resources to identify and fix accessibility issues in your projects.</p>
    <p>To get started, simply run the command "Check Accessibility" from the command palette. 
    The extension will analyze your code and provide feedback on any accessibility issues it finds, along with suggestions for how to fix them.</p>
    <p>Whether you're a seasoned developer or just starting out, 
    Accessibility Assistant is here to help you create more inclusive and accessible applications. Let's work together to make the web a better place for everyone!</p>
    <script>
        console.log('Webview loaded');
    </script>
</body>

</html>`;
}



// This method is called when your extension is deactivated
export function deactivate() {}
