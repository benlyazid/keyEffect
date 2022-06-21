
const vscode = require('vscode');
const player = require('play-sound')()


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let label = 'turquoise'
	let default_sound = 'GENERIC_R0.mp3'
	let space_sound = 'SPACE.mp3'
	let enter_sound = 'ENTER.mp3'
	let musicpath = context.extensionPath + `/audio/${label}/press/${default_sound}`;
	function getAudio() {
		player.play(musicpath, function (err) {
			if (err) throw err;
		})
	}
	let items= [
		{
		  label: "Alpaca",
		},
		{
		  label: "bluealps",
		},
		{
		  label: "boxnavy",
		},
		{
		  label: "buckling",
		},
		{
		  label: "cream",
		},
		{
		  label: "holypanda",
		},
		{
		  label: "mxblack",
		},
		{
		  label: "mxblue",
		},
		{
		  label: "mxbrown",
		},
		{
		  label: "redink",
		},
		{
		  label: "topre",
		},
		{
		  label: "turquoise",
		},
	  ];

	let select = ()=>{
		let selected = vscode.window.showQuickPick(items)
		selected.then(ret => {
			label = ret.label
			musicpath = context.extensionPath + `/audio/${label}/press/GENERIC_R0.mp3`;
		})
	}

	let runEffect = (args)=>{
		if (args.text == ' '){
			musicpath = context.extensionPath + `/audio/${label}/press/${space_sound}`;

		}
			
		else if (args.text == '\n'){
			musicpath = context.extensionPath + `/audio/${label}/press/${enter_sound}`;

		}
		else if (args.text == '\r'){
			musicpath = context.extensionPath + `/audio/${label}/press/${enter_sound}`;

		}
		else{
			musicpath = context.extensionPath + `/audio/${label}/press/${default_sound}`;

		}
		getAudio();
		
	}

	let disposable = vscode.commands.registerCommand("type", (args) => {
		runEffect(args)
		vscode.commands.executeCommand("default:type", {
			text: args.text
		});
	});

	const chose_exp = vscode.commands.registerCommand('ext.selectSound', select);
	  
	  context.subscriptions.push(chose_exp);
	context.subscriptions.push(disposable);
}





// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
