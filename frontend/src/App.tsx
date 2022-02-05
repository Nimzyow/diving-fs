import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { Footer } from "./components/footer/Footer"
import { Navigation } from "./components/navbar/Navigation"
import { useAuth } from "./hooks/useAuth"
import { Main } from "./layouts/Main"
import { AccountContainer } from "./pages/account/AccountContainer"
import { Home } from "./pages/home/Home"
import { NotRecognised } from "./pages/not-recognised/NotRecognised"
import { RootStyling, GlobalStyles } from "./styles/RootStyling"
import { PrivateRoute } from "./utils/PrivateRoute"

export const App = (): JSX.Element => {
    const { userLoading } = useAuth()

    if (userLoading) {
        return <div />
    }

    return (
        <div>
            <Router>
                <GlobalStyles />
                <RootStyling>
                    {/* <Navigation /> */}
                    <Switch>
                        <Route exact path="/account">
                            <AccountContainer />
                        </Route>
                        <Main>
                            <PrivateRoute exact={true} path="/">
                                <Home />
                            </PrivateRoute>
                        </Main>
                        <Route path="*">
                            <NotRecognised />
                        </Route>
                    </Switch>
                    {/* <Footer /> */}
                </RootStyling>
            </Router>
        </div>
    )
}

// TODO: Create a general layout styling which includes side nav, top nav and main content placement
// TODO: On home page create input field with post button.
