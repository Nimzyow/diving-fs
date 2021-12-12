import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Navigation from "./components/navbar/Navigation"
import { useAuth } from "./hooks/useAuth"
import AccountContainer from "./pages/account/AccountContainer"
import Home from "./pages/home/Home"
import NotRecognised from "./pages/not-recognised/NotRecognised"
import { RootStyling, GlobalStyles } from "./styles/RootStyling"
import PrivateRoute from "./utils/PrivateRoute"

export const App = (): JSX.Element => {
    const { userLoading } = useAuth()

    if (userLoading) {
        return <div />
    }

    return (
        <div
            style={{
                minWidth: 320,
            }}
        >
            <Router>
                <GlobalStyles />
                <RootStyling>
                    <Navigation />
                    <Switch>
                        <Route exact path="/account">
                            <AccountContainer />
                        </Route>
                        <PrivateRoute exact={true} path="/">
                            <Home />
                        </PrivateRoute>
                        <Route path="*">
                            <NotRecognised />
                        </Route>
                    </Switch>
                </RootStyling>
            </Router>
        </div>
    )
}
