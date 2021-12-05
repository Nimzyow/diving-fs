import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import AccountContainer from "./pages/account/AccountContainer"

export const App = (): JSX.Element => {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <AccountContainer />
                </Route>
            </Switch>
        </Router>
    )
}
