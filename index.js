const electron = require('electron')
const ipcMain = electron.ipcMain

let lastQuerySeq = 0
const channel = '__runInBrowser'

/*

Run some js in a BrowserWindow and get the result.

- `win`: `BrowserWindow` instance.
- `func`: function. Serialized with `toString` so it needs to be self-contained.
- `cb`: callback function, called with (err, result)

*/
module.exports = function runInBrowser (win, func, cb) {
  lastQuerySeq += 1
  const querySeq = lastQuerySeq
  const listener = function (event, res) {
    if (res.seq === querySeq) {
      // stop listening when we find the response to our query
      ipcMain.removeListener(channel, listener)
      cb(null, res.value)
    }
  }

  // start listening
  ipcMain.on(channel, listener)

  win.webContents.executeJavaScript(`(function () {
const value = (${func.toString()})()
const ipcRenderer = require('electron').ipcRenderer
ipcRenderer.send('${channel}', { seq: ${querySeq}, value })
})()`);
}
