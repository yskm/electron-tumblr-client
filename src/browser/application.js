import app from 'app';
import BrowserWindow from 'browser-window';
import path from 'path';

const mainWindowPath = path.resolve(__dirname, "..", "renderer", "index.html");

export default class Application {
  constructor() {
    require('crash-reporter').start();

    let mainWindow = null;

    app.on('window-all-closed', function() {
      if (process.platform != 'darwin')
        app.quit();
    });

    app.on('ready', function() {
      mainWindow = new BrowserWindow({width: 1000, height: 800});
      mainWindow.loadUrl(`file://${mainWindowPath}`);
      mainWindow.on('closed', function() {
        mainWindow = null;
      });
    });
  }
}