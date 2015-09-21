import app from 'app';
import CrashReporter from 'crash-reporter';
import AuthWindow from './windows/auth-window';
import MainWindow from './windows/main-window';

export default class Application {
  constructor() {
    this.authWindow = new AuthWindow({
      consumerKey: 'dummy_key',
      consumerSecret: 'dummy_secret'
    });
    this.mainWindow = new MainWindow();
  }

  run() {
    CrashReporter.start();

    app.on('window-all-closed', () => {
      if (process.platform != 'darwin') {
        app.quit();
      }
    });

    app.on('ready', () => {
      this.authWindow.open();
    });
  }
}