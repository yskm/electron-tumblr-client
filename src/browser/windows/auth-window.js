import path from 'path';
import ipc from 'ipc';
import BrowserWindow from 'browser-window';
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
      'http://localhost/',
      'HMAC-SHA1'
    );
  }

  open() {
    this.window = new BrowserWindow({width: 1000, height: 800});
    this.window.loadUrl(`file://${this.windowPath}`);

    this.window.on('closed', function() {
      this.window = null;
    });

    return new Promise(this.registerAuthCallback.bind(this));
  }

  registerAuthCallback(resolve, reject) {
    ipc.on('start-auth', () => {
      this.auth.getOAuthRequestToken((err, oauthToken, oauthTokenSecret, results) => {
        if (err) {
          console.log(err);
          reject();
          return;
        }

        this.window.webContents.on('will-navigate', (event, url) => {
          event.preventDefault();
          const matched = url.match(/\?oauth_token=([^&#]*)&oauth_verifier=([^&#]*)/);
          if (matched === null) {
            reject();
            return;
          }

          this.auth.getOAuthAccessToken(
            oauthToken,
            oauthTokenSecret,
            matched[2],
            (err, oauthAccessToken, oauthAccessTokenSecret, results) => {
              if (err) {
                console.log(err);
                reject();
                return;
              }

              resolve({
                accessToken: oauthAccessToken,
                accessTokenSecret: oauthAccessTokenSecret
              });
            }
          );
        });

        this.window.loadUrl(`http://www.tumblr.com/oauth/authorize?oauth_token=${oauthToken}`);
      });
    });
  }

  close() {
    this.window.close();
  }
}