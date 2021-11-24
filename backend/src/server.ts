// import { ApolloServer } from "apollo-server"
// import { nexusPrisma } from "nexus-plugin-prisma"
// import * as path from "path"
// import * as types from "./schema/index"
// import { makeSchema } from "nexus"
// import { Context, getUser } from "./context"
// import prisma from "./db"
// import { GraphQLDateTime } from "graphql-iso-date"

// export const schema = makeSchema({
//     types,
//     outputs: {
//         schema: path.join(__dirname, "/generated/schema.graphql"),
//         typegen: path.join(__dirname + "/generated/nexus.ts"),
//     },
//     contextType: {
//         module: path.join(__dirname, "./context.ts"),
//         export: "Context",
//     },
//     plugins: [nexusPrisma({ scalars: { DateTime: GraphQLDateTime } })],
//     sourceTypes: {
//         modules: [
//             {
//                 module: "@prisma/client",
//                 alias: "prisma",
//             },
//         ],
//     },
// })

// export const server = new ApolloServer({
//     schema,
//     context: async ({ req }: { req: { headers: { authorization: string } } }): Promise<Context> => {
//         return {
//             prisma: prisma,
//             user: await getUser(req.headers.authorization, prisma),
//         }
//     },
// })

// server.listen().then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`)
// })

// with apollo express

import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import express from "express"
import cors from "cors"
import http from "http"
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

async function startApolloServer() {
    // Required logic for integrating with Express
    const app = express()
    const httpServer = http.createServer(app)
    // app.use(cors())
    // Same ApolloServer initialization as before, plus the drain plugin.
    const server = new ApolloServer({
        schema,
        context: async ({ req }: { req: { headers: { authorization: string } } }): Promise<Context> => {
            return {
                prisma: prisma,
                user: await getUser(req.headers.authorization, prisma),
            }
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })

    // More required logic for integrating with Express
    await server.start()
    const corsOptions = {
        origin: "*",
        credentials: true,
    }

    server.applyMiddleware({
        app,

        // By default, apollo-server hosts its GraphQL endpoint at the
        // server root. However, *other* Apollo Server packages host it at
        // /graphql. Optionally provide this to match apollo-server.
        path: "/",
        cors: corsOptions,
    })

    // Modified server startup
    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve))
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer()

// export const server = new ApolloServer({
//     schema,
//     context: async ({ req }: { req: { headers: { authorization: string } } }): Promise<Context> => {
//         return {
//             prisma: prisma,
//             user: await getUser(req.headers.authorization, prisma),
//         }
//     },
// })

// server.listen().then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`)
// })
