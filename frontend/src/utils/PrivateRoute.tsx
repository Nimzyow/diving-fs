import React from "react"

import { Redirect, Route } from "react-router"

import { useAuth } from "../hooks/useAuth"

type Props = {
    children: JSX.Element
    path: string
}

const PrivateRoute = ({ children, ...rest }: Props) => {
    const { getUser } = useAuth()
    return (
        <Route
            {...rest}
            render={({ location }) =>
                getUser?.isEmailVerified ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/account",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    )
}

export default PrivateRoute
