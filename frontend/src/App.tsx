import React from "react"
import Login from "./pages/account/pages/login/Login"
import Register from "./pages/account/pages/register/Register"

export const App = (): JSX.Element => {
    return (
        <div>
            <p>Hi there, it's working!!</p>
            <Login />
            <Register />
        </div>
    )
}
