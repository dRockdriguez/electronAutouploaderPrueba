
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const log = require('electron-log');
const updater = require('../updater')

 
/*require('update-electron-app')({
  repo: 'https://github.com/dRockdriguez/pruebaIonicElectron',
  updateInterval: '5 minutes',
})*/

let win;

function createWindow() {
  console.log('creado windows ' + isDev);
  win = new BrowserWindow({
    width: 800,
    height: 800,
    backgroundColor: '#fabada'
  })

  const startUrl = url.format({
    pathname: path.join(__dirname, '/../www/index.html'),
    protocol: 'file:',
    slashes: true,
  });

  win.loadURL(startUrl);

  // win.webContents.openDevTools();

  win.on('closed', function () {
    win = null
  })
}

app.on('ready', function () {
  setTimeout(() => {
    updater.check()
  }, 2000)
  createWindow();
})

app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
})