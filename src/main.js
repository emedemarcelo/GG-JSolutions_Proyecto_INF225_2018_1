const electron = require('electron');
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
// For 1st deliverable (viability of the project)
const yahooFinance = require('yahoo-finance');  // For getting API data

// Keep a global reference of the windows object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow(){
	//Create a browser window
	win = new BrowserWindow({
		width: 800,
		height: 600
	});

	win.loadURL(url.format({
		pathname: path.join(__dirname, 'display.html'),
		protocol: 'file:',
		slashes: true
	}));

	// Emitted when the window is closed
	win.on('closed', () => {
		//Derreference the window object, usually you would store windows
		//in an array if your app supports multi windows. This is the time
		//when you should delete the corresponding element.
		win = null;
	});

	yahooFinance.historical({
		symbol: '^IPSA',
		from: '2018-01-01',
		to: '2018-01-31'
	}, function(err, quotes){
		console.log("DSA ERR");
		console.log(err);
		console.log(quotes);
	});

}

//This method will be called when Electron has finished
//initialization and is ready to create browser windows.
//Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('window-all-closed', () => {
	//On MacOS it is common for applications and their menu bar
	//to stay active until the user quits explicitly with Cmd+Q
	if (process.platform !== 'darwin'){
		app.quit();
	}
});

app.on('activate', () => {
	//On MacOS it's common to re-create a window in the app when the
	//dock icon is clicked and there are no other windows open.
	if (win === null){
		createWindow();
	}
});

//In this file you can include the rest of your app's specific main process
//code. You can also put them in separate files and require them here.