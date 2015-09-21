import app from 'app';
import CrashReporter from 'crash-reporter';
import AuthWindow from './windows/auth-window';
import MainWindow from './windows/main-window';

export default class Application {
  constructor() {
    this.consumerKey = 'jLQusEeWb1fKWEqUxE2XPvoAD02Vu4Y6wOonmYC3OVtf7kxe41';
    this.consumerSecret = 'YMeyjVZYUw6p9EkzrPEKc1fYh8qYrnF0d9b0zblOsMtqv4NYrc';
    this.authWindow = new AuthWindow({
      consumerKey: this.consumerKey,
      consumerSecret: this.consumerSecret
    });
    this.mainWindow = null;
  }

  run() {
    CrashReporter.start();

    app.on('window-all-closed', () => {
      if (process.platform != 'darwin') {
        app.quit();
      }
    });

    app.on('ready', () => {
      this.authWindow.open()
        .then(({accessToken, accessTokenSecret}) => {
          this.mainWindow = new MainWindow({
            consumerKey: this.consumerKey,
            consumerSecret: this.consumerSecret,
            accessToken: accessToken,
            accessTokenSecret: accessTokenSecret
          });
          return this.mainWindow.open();
        })
        .then(() =>{
          this.authWindow.close();
        });
    });
  }
}