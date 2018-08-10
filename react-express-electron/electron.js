const electron = require('electron');
//const app = electron.app;
//const BrowserWindow = electron.BrowserWindow;
const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const server = require('./app');
const path = require('path');
const url = require('url');

process.env.NODE_ENV = "development";

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({
        //frame: false,
        width: 800,
        height: 700 }
    );

    mainWindow.loadURL('http://localhost:5000/');
    // mainWindow.loadURL(url.format({
    //     pathname: path.join(__dirname, 'index.html'),
    //     protocol: 'file:',
    //     slashes: true
    // }));

    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        //mainWindow = null;
        app.quit();
    });

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const mainMenuTemplate = [
    {
        label: "Archivo",
        submenu: [
            {
                label: "Ingresar Formulario",
                click(){
                    console.log("Ingresar Formulario");
                }
            },
            {
                label: "Subir Archivo",
                click(){
                    console.log("Subir Archivo");
                }
            },
            {
                label: "Salir",
                accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
                click(){
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Editar',
        submenu: [
            {
                role: 'undo',
                label: 'Deshacer'
            },
            {
                role: 'redo',
                label: 'Rehacer'
            },
            {
                type: 'separator'
            },
            {
                role: 'cut',
                label: 'Cortar'
            },
            {
                role: 'copy',
                label: 'Copiar'
            },
            {
                role: 'paste',
                label: 'Pegar'
            },
            {
                role: 'selectall',
                label: 'Seleccionar Todo'
            }
        ]
    },
    {
        label: 'Ver',
        submenu: [
            {
                role: 'resetzoom',
                label: 'Restaurar Zoom'
            },
            {
                role: 'zoomin',
                label: 'Acercar'
            },
            {
                role: 'zoomout',
                label: 'Alejar'
             },
            {
                type: 'separator'
            },
            {
                role: 'togglefullscreen',
                label: 'Pantalla Completa'
            }
        ]
    },
    {
        role: 'window',
        label: 'Ventana',
        submenu: [
            {
                role: 'minimize',
                label: 'Minimizar'
            },
            {
                role: 'close',
                label: 'Cerrar'
            }
        ]
    },
    {
        role: 'help',
        label: 'Ayuda',
        submenu: [
            {
                label: 'Saber Más',
                click () { require('electron').shell.openExternal('https://electronjs.org') }
            }
        ]
    }
];

// If in a Mac, add empty object to menu (so it displays 'File' instead of 'Electron')
if (process.platform === "darwin"){
    mainMenuTemplate.unshift({}); // unshift method add an empty array to the beginning of the array
}

// Add developer tools if not in production
if (process.env.NODE_ENV !== "production"){
    mainMenuTemplate.push({
        label: "Dev Tools",
        submenu: [
            {
                label: "Developer Tools",
                accelerator: process.platform === "darwin" ? "Command+I" : "Ctrl+I",
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: "reload"
            }
        ]
    })
};