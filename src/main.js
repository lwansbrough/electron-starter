var app = require('app'),
  shell = require('shell'),
  request = require('request'),
  path = require('path'),
  Menu = require('menu'),
  Tray = require('tray'),
  BrowserWindow = require('browser-window');

app.on('ready', function() {
  
  var win = new BrowserWindow({
    width: 1000,
    height: 600,
    'min-height': 600,
    'min-width': 800,
    show: false,
    frame: false
  });
  win.on('closed', function() {
    win = null;
  });
  
  win.loadUrl('file://' + __dirname + '/pages/index.html');
  win.show();
  
  var menu = Menu.buildFromTemplate(require('./menu/' + process.platform));
	Menu.setApplicationMenu(menu);
});