const {app, BrowserWindow} = require("electron")

require('@electron/remote/main').initialize()
function createWindow(){
    //when the app is ready will create our window 
    //that will load or react url
    const win = new BrowserWindow({
        width: 1200,
        height:800,
        webPreferences:{
            nodeIntegration:true,
            enableRemoteModule: true 
        }
    })
    win.loadURL('http://localhost:3000')
}
app.on('ready',createWindow)

//Quit when all windows are close
app.on('window-all-closed', function(){
    if (process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('activate', function(){
    if(BrowserWindow.getAllWindows().length === 0) createWindow()
})

//To allow react to trigger events in the electron process we use (IPC) Interprocess communication
//This will allow us to send events from react to electron 
//to handle IPC electron has a module for common operation (@electron/remote)
//Once installed we need to initialize it in the main.js file and enable the romte module 
//that is running our react app