import path from 'path';
import BrowserWindow from 'browser-window';

export default class MainWindow {
  constructor() {
    this.windowPath = path.resolve(__dirname, "../..", "renderer", "index.html");
  }

  open() {
    this.window = new BrowserWindow({width: 1000, height: 800});
    this.window.loadUrl(`file://${this.windowPath}`);

    this.window.on('closed', function() {
      this.window = null;
    });
  }
}