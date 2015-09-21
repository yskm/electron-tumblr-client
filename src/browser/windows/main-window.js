import path from 'path';
import BrowserWindow from 'browser-window';
import tumblr from 'tumblr.js';

export default class MainWindow {
  constructor({consumerKey, consumerSecret, accessToken, accessTokenSecret}) {
    this.windowPath = path.resolve(__dirname, "../..", "renderer", "index.html");
    this.tumblrClient = tumblr.createClient({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      token: accessToken,
      token_secret: accessTokenSecret
    });
  }

  open() {
    return new Promise((resolve, reject) => {
      this.window = new BrowserWindow({width: 1000, height: 800});
      this.window.webContents.on('did-finish-load', (event, url) => {
        resolve();
      });
      this.window.on('closed', function() {
        this.window = null;
      });
      this.window.loadUrl(`file://${this.windowPath}`);
    });
  }
}