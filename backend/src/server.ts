import { ApolloServer } from "apollo-server"
import { nexusPrisma } from "nexus-plugin-prisma"
import * as path from "path"
import * as types from "./schema/index"
import { makeSchema } from "nexus"
import { Context, getUser } from "./context"
import prisma from "./db"

export const schema = makeSchema({
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

export const server = new ApolloServer({
    schema,
    context: async ({ req }: { req: { headers: { authorization: string } } }): Promise<Context> => {
        return {
            prisma: prisma,
            user: await getUser(req.headers.authorization, prisma),
        }
    },
})

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})
