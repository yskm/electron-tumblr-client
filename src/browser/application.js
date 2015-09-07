'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');

var path = require('path');

class Application {
  constructor() {
    require('crash-reporter').start();

    var mainWindow = null;

    app.on('window-all-closed', function() {
      if (process.platform != 'darwin')
        app.quit();
    });

    app.on('ready', function() {
      mainWindow = new BrowserWindow({width: 1000, height: 600});
      var WindowPath = path.resolve(__dirname, "..", "renderer", "index.html");
      console.log(WindowPath);
      mainWindow.loadUrl('file://' + WindowPath);
      mainWindow.on('closed', function() {
        mainWindow = null;
      });
    });
  }
}

module.exports = Application;