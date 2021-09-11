import { ApolloServer, gql } from "apollo-server"
import * as path from "path"
import * as types from "./schema/index"
import { makeSchema } from "nexus"

// const books = [
//     {
//         title: "The Awakening",
//         author: "Kate Chopin",
//     },
//     {
//         title: "City of Glass",
//         author: "Paul Auster",
//     },
// ]

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// const typeDefs = gql`
//     type Query {
//         hello: String
//     }
// `

// const resolvers = {
//     Query: {
//         hello: () => "world",
//     },
// }

const schema = makeSchema({
    types,
    outputs: {
        schema: path.join(__dirname, "/generated/schema.graphql"),
        typegen: path.join(__dirname + "/generated/nexus.ts"),
    },
})

const server = new ApolloServer({ schema })

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})
