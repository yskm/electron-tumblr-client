'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var path = require('path');
var mainWindowPath = path.resolve(__dirname, "..", "renderer", "index.html");

class Application {
  constructor() {
    require('crash-reporter').start();

    var mainWindow = null;

    app.on('window-all-closed', function() {
      if (process.platform != 'darwin')
        app.quit();
    });

    app.on('ready', function() {
      mainWindow = new BrowserWindow({width: 1000, height: 800});
      mainWindow.loadUrl('file://' + mainWindowPath);
      mainWindow.on('closed', function() {
        mainWindow = null;
      });
    });
  }
}

module.exports = Application;