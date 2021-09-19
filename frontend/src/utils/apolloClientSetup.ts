import { ApolloClient, InMemoryCache, ApolloLink, NormalizedCacheObject } from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { createUploadLink } from "apollo-upload-client"

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: ApolloLink.from([
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
            credentials: "include",
        }) as unknown as ApolloLink,
    ]),
    cache: new InMemoryCache(),
})
