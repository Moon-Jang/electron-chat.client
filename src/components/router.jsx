import React from 'react';
import { Route, Switch } from "react-router-dom"
import Login from "./login/Login"
import Signup from "./signup/Signup"

const router = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/signup" component={Signup} />
                {/* <Route path="/" component={Error} /> */}
            </Switch>
        </>
    )
}

export default router