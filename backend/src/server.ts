import { ApolloServer, gql } from "apollo-server"
import * as path from "path"
import * as types from "./schema/index"
import { makeSchema } from "nexus"
import { db } from "./db"
import { PrismaClient } from "@prisma/client"

interface Context {
    db: PrismaClient
}

const context = {
    db,
}

const schema = makeSchema({
    types,
    outputs: {
        schema: path.join(__dirname, "/generated/schema.graphql"),
        typegen: path.join(__dirname + "/generated/nexus.ts"),
    },
})

const server = new ApolloServer({ schema, context })

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})
