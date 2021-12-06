import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import AccountContainer from "./pages/account/AccountContainer"
import Home from "./pages/home/Home"
import { RootStyling, GlobalStyles } from "./styles/RootStyling"

export const App = (): JSX.Element => {
    return (
        <div
            style={{
                minWidth: 320,
            }}
        >
            <Router>
                <GlobalStyles />
                <RootStyling>
                    <Switch>
                        <Route exact path="/account">
                            <AccountContainer />
                        </Route>
                        <Route exact path="/">
                            <Home />
                        </Route>
                    </Switch>
                </RootStyling>
            </Router>
        </div>
    )
}
