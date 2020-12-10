/* const { app, BrowserWindow } = require("electron")
const path = require("path")
const isDev = require("electron-is-dev")
const React = require("react")
const ReactDOM = require("react-dom")

class MyWindowPortal extends React.PureComponent {
    constructor(props) {
        super(props)
        // STEP 1: create a container <div>
        this.containerEl = document.createElement("div")
        this.externalWindow = null
    }

    render() {
        // STEP 2: append props.children to the container <div> that isn't mounted anywhere yet
        return ReactDOM.createPortal(this.props.children, this.containerEl)
    }

    componentDidMount() {
        // STEP 3: open a new browser window and store a reference to it
        this.externalWindow = createWindow()
    }
    componentWillUnmount() {
        // STEP 5: This will fire when this.state.showWindowPortal in the parent component becomes false
        // So we tidy up by closing the window
        this.externalWindow.close()
    }
}

function createWindow() {
    // Create the browser window.
    let mainWindow = new BrowserWindow({
        width: 390,
        height: 620,
        minWidth: 390,
        minHeight: 620,
        show: true,
        frame: true,
        fullscreenable: false,
        transparent: false,
        webPreferences: {
            // preload: path.join(__dirname, 'preload.js')
        },
    })

    // and load the index.html of the app.

    //mainWindow.loadFile('index.html')
    // process.env.NODE_ENV ?
    //   mainWindow.loadURL('http://localhost:3030')
    //   :
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3030"
            : `file://${path.join(__dirname, "../build/index.html")}`
    )
    mainWindow.setMenuBarVisibility(false)
    mainWindow.on("closed", () => (mainWindow = null))
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit()
})

export default MyWindowPortal
 */
