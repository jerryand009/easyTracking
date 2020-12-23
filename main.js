const {app,BrowserWindow,shell,ipcMain,Menu} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
let mainWindow;
const menu = Menu;
app.on('ready',()=>{
    menu.setApplicationMenu(null);
    mainWindow = new BrowserWindow({
        width:1280,
        height:720,
        webPreferences:{
            nodeIntegration:true,
            enableRemoteModule:true,
            webSecurity: false,
            webviewTag:true
        }
    });
    // mainWindow.webContents.openDevTools(); // 开启调试模式
    const urlLocation= isDev?'http://localhost:3000':`file://${path.join(__dirname,'./build/index.html')}`;
    mainWindow.loadURL(urlLocation);
});

// 调用本地默认浏览器打开链接
ipcMain.on('open-url', (event, url) => {
    shell.openExternal(url);
});
// 新建Electron窗口打开链接
ipcMain.on('open-url-newWin',(event,url)=>{
    console.log("url",url);
    let win = new BrowserWindow();
    win.webContents.loadURL(url)
});
// 打开调试模式
ipcMain.on('open-devtools', (event, arg) => {
    mainWindow.openDevTools();
});