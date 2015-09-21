import app from 'app';
import CrashReporter from 'crash-reporter';
import MainWindow from './windows/main-window';

export default class Application {
  constructor() {
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
      this.mainWindow.open();
    });
  }
}