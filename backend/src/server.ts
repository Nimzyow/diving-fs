import { ApolloServer } from "apollo-server"
import { nexusPrisma } from "nexus-plugin-prisma"
import * as path from "path"
import * as types from "./schema/index"
import { makeSchema } from "nexus"
import { context } from "./context"

const schema = makeSchema({
    types,
    outputs: {
        schema: path.join(__dirname, "/generated/schema.graphql"),
        typegen: path.join(__dirname + "/generated/nexus.ts"),
    },
    contextType: {
        module: path.join(__dirname, "./context.ts"),
        export: "Context",
    },
    plugins: [nexusPrisma()],
    sourceTypes: {
        modules: [
            {
                module: "@prisma/client",
                alias: "prisma",
            },
        ],
    },
})

const server = new ApolloServer({ schema, context })

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})
