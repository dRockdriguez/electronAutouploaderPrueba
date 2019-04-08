
const { app, autoUpdater, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const log = require('electron-log');

const server = "https://hazel.drock.now.sh"
const feed = `${server}/update/${process.platform}/${app.getVersion()}`
 
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

  win.webContents.openDevTools();

  win.on('closed', function () {
    win = null
  })
}

app.on('ready', function () {
  createWindow();
  autoUpdater.setFeedURL(feed)
  autoUpdater.checkForUpdates()
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

autoUpdater.on('error', message => {
  log.info('ERROR');
  console.error('ERROR');
  log.info(message);
  console.error(message)
})

autoUpdater.on('checking-for-update', () => {
  console.error('checking-for-update');
  log.info('checking-for-update');
});

autoUpdater.on('update-available', () => {
  console.error('update-available');
  log.info('update-available');
});

autoUpdater.on('update-not-available', () => {
  console.error('update-not-available');
  log.info('update-not-available');
});

autoUpdater.on('update-downloaded', () => {
  console.error('update-downloaded');
  log.info('update-downloaded');
});
/*autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  console.log('updatedownload')
  const dialogOpts = {
    type: 'información',
    buttons: ['Reiniciar', 'Despues'],
    title: 'Actualización de aplicación',
    message: 'hay actualizaciones'
  }

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
})*/