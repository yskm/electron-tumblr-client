import app from 'app';
import path from 'path';
import BrowserWindow from 'browser-window';
import CrashReporter from 'crash-reporter';

export default class Application {
  constructor() {
    this.mainWindow = null;
    this.mainWindowPath = path.resolve(__dirname, "..", "renderer", "index.html");
    this.defaultWindowSize = {
      width: 1000,
      height: 800
    }

    this.initialize();
  }

  initialize() {
    CrashReporter.start();

    app.on('window-all-closed', () => {
      if (process.platform != 'darwin')
        app.quit();
    });

    app.on('ready', () => {
      this.createMainWindow();
    });
  }

  createMainWindow() {
    this.mainWindow = new BrowserWindow(this.defaultWindowSize);
    this.mainWindow.loadUrl(`file://${this.mainWindowPath}`);

    this.mainWindow.on('closed', function() {
      this.mainWindow = null;
    });
  }
}