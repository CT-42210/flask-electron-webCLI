const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const node_path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: node_path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    }
  })

  win.loadFile(path.join(__dirname, '..', 'templates', 'index.html'))
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})



app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

ipcMain.handle('create-window', (event, { width, height, url, title }) => {
  let win = new BrowserWindow({
    width,
    height,
    title,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadURL(url)
})

