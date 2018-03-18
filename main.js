
if (nw.App.argv.find(arg => arg === '--from-startup')) {
  nw.Window.open('startup-index.html', { show: false }, (win) => { 
    // win.showDevTools();
  });
} else {
  nw.Window.open('ui-index.html', { show: true }, (win) => { 
    win.showDevTools();
  });
}

