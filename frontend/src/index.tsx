import { ApolloProvider } from "@apollo/client"
import React from "react"
import ReactDom from "react-dom"
import { App } from "./App"
import { client } from "./utils/apolloClientSetup"

ReactDom.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
)
