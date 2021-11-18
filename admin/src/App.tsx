import React from "react"

import { Admin, Resource } from "react-admin"
import dataProvider from "./utils/dataProvider"
import users from "./users"

export const App = () => {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource name="users" {...users} />
        </Admin>
    )
}
