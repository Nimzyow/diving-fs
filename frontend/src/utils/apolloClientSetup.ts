import {
    ApolloClient,
    InMemoryCache,
    ApolloLink,
    NormalizedCacheObject,
    createHttpLink,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"
import { createUploadLink } from "apollo-upload-client"

const httpLink = createHttpLink({
    uri: "http://localhost:4000/",
})

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("token")
    // return the headers to the context so httpLink can read them
    console.log(token)
    return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : "",
        },
    }
})

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: ApolloLink.from([
        authLink.concat(httpLink),
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                graphQLErrors.forEach(({ message, locations, path }) => {
                    console.log(
                        `[GraphQL error]: Message: ${message}, line: ${
                            locations && locations[0].line
                        }, column: ${locations && locations[0].column} , Path: ${path}`
                    )
                })
            }
            if (networkError) console.log(`[Network error]: ${networkError}`)
        }),
        new ApolloLink((operation, forward) => {
            operation.setContext(() => ({
                uri: `http://localhost:4000/`,
            }))
            return forward ? forward(operation) : null
        }),
        createUploadLink({
            uri: "http://localhost:4000/",
            // credentials: "include",
        }) as unknown as ApolloLink,
    ]),
    cache: new InMemoryCache(),
})
