import React, { createContext, useState } from "react"
import { Route, Switch } from "react-router-dom"
import ChattingRoom from "./chatting/ChattingRoom"
import Alert from "./common/Alert"
import Login from "./login/Login"
import Main from "./main/Main"
import Profile from "./profile/Profile"
import Signup from "./signup/Signup"

export const AlertContext = createContext(null)
const Router = () => {
    const [alertVisible, setAlertVisible] = useState(false)
    const [alertDescription, setAlertDescription] = useState("")
    const alertBind = {
        visible: alertVisible,
        setVisible: setAlertVisible,
        description: alertDescription,
    }
    return (
        <>
            <AlertContext.Provider
                value={{
                    alertVisible,
                    setVisible: setAlertVisible,
                    setDescription: setAlertDescription,
                }}>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/main/:tab" component={Main} />
                    <Route exact path="/profile" component={Profile} />
                    <Route
                        exact
                        path="/chatting/:roomIdx"
                        component={ChattingRoom}
                    />
                    {/* <Route path="/" component={Error} /> */}
                </Switch>
                <Alert {...alertBind} />
            </AlertContext.Provider>
        </>
    )
}

export default Router
