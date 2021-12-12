import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { useAuth } from "./hooks/useAuth"
import AccountContainer from "./pages/account/AccountContainer"
import Home from "./pages/home/Home"
import NotRecognised from "./pages/not-recognised/NotRecognised"
import { RootStyling, GlobalStyles } from "./styles/RootStyling"
import PrivateRoute from "./utils/PrivateRoute"

export const App = (): JSX.Element => {
    const { userData, userLoading } = useAuth()

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
                    <Switch>
                        {!userData && (
                            <>
                                <Route exact path="/account">
                                    <AccountContainer />
                                </Route>
                                <Route component={NotRecognised} />
                            </>
                        )}
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
