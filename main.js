const {app,BrowserWindow,shell,ipcMain,Menu,dialog} = require('electron');
const {autoUpdater} = require('electron-updater');
const path = require('path');
const isDev = require('electron-is-dev');
let mainWindow;
const menu = Menu;
app.on('ready',()=>{
    if (isDev){
        autoUpdater.updateConfigPath = path.join(__dirname,'dev-app-updated.yml');
    }
    autoUpdater.autoDownload = false;
    // autoUpdater.checkForUpdatesAndNotify();
    autoUpdater.checkForUpdates();
    autoUpdater.on("error",(error)=>{
        console.log("错误",error);
        dialog.showErrorBox("Error:",error==null?"unknow":(error.stack))
    });
    autoUpdater.on('checking-for-update',()=>{
        console.log('Checking for update...');
    });
    autoUpdater.on("update-available",()=>{
        dialog.showMessageBox({
            type:'info',
            title:'应用程序有新版本',
            message:'发现新版本，是否现在更新？',
            buttons:['是','否']
        },(buttonIndex)=>{
            if (buttonIndex===0){
                autoUpdater.downloadUpdate()
            }
        })
    });
    autoUpdater.on('download-progress',(progressObj)=>{
        let log_msg = 'Download speed:' + progressObj.bytesPerSecond;
        log_msg = log_msg + ' - Downloaded' +progressObj.percent + '%';
        log_msg = log_msg + '(' + progressObj.transferred + '/' + progressObj.total + ')';
        console.log(log_msg)
    });
    // autoUpdater.on('update-not-available',()=>{
    //     dialog.showMessageBox({
    //         title:'没有更新的版本',
    //         message:'当前已经是最新版本'
    //     })
    // });
    autoUpdater.on('update-downloaded',()=>{
        dialog.showMessageBox({
            title:'安装更新',
            message:'更新下载完毕，应用将重启并进行安装'
        },()=>{
            setImmediate(()=>{
                autoUpdater.quitAndInstall()
            })
        })
    });

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