import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import { HashRouter } from "react-router-dom"
import Root from "./components/router"
import { Provider } from "react-redux"
import createSagaMiddleware from "redux-saga"
import { composeWithDevTools } from "redux-devtools-extension"
import { createStore, applyMiddleware } from "redux"
import rootSaga from "./middleware/rootSaga"
import rootReducer from "./reducers/reducers"
import "./styles/common.sass"
import "./styles/icon.sass"

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Root />
        </HashRouter>
    </Provider>,
    document.getElementById("root")
)

document.body.setAttribute("spellcheck", "false")

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
