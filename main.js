const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 400, // Largura ideal simulando um celular
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Carrega o arquivo gerado pelo Expo
  win.loadFile(path.join(__dirname, 'dist', 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});