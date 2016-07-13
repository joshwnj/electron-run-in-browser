# electron-run-in-browser

Run some js in a `BrowserWindow` and get the result.

## Usage

`runInBrowser(win, func, cb)`

- `win`: `BrowserWindow` instance.
- `func`: function. Serialized with `toString` so it needs to be self-contained.
- `cb`: callback function, called with (err, result)

### Example

```js
const BrowserWindow = require('electron').BrowserWindow
const runInBrowser = require('electron-run-in-browser')

const win = new BrowserWindow()

win.webContents.on('dom-ready', function (e) {
  runInBrowser(win, getDocumentTitle, function (err, title) {
    console.log('title:', title)
  })
})

function getDocumentTitle () {
  return document.title
}
```

## License

MIT

