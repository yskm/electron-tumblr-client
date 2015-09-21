import path from 'path';
import BrowserWindow from 'browser-window';
import tumblr from 'tumblr.js';
import {OAuth} from 'oauth';

export default class authWindow {
  constructor({consumerKey, consumerSecret}) {
    this.windowPath = path.resolve(__dirname, "../..", "renderer", "auth.html");

    this.auth = new OAuth(
      'http://www.tumblr.com/oauth/request_token',
      'http://www.tumblr.com/oauth/access_token',
      consumerKey,
      consumerSecret,
      '1.0',
      'http://example.com/',
      'HMAC-SHA1'
    );
  }

  open() {
    this.window = new BrowserWindow({width: 1000, height: 800});
    this.window.loadUrl(`file://${this.windowPath}`);

    this.window.on('closed', function() {
      this.window = null;
    });
  }
}