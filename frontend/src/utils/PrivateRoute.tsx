import React from "react"

import { Redirect, Route } from "react-router"

import { useAuth } from "../hooks/useAuth"

type Props = {
    children: JSX.Element
    path: string
    exact?: boolean
}

export const PrivateRoute = ({ children, ...rest }: Props) => {
    const { userData } = useAuth()
    return (
        <Route
            {...rest}
            render={({ location }) =>
                userData ? (
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
