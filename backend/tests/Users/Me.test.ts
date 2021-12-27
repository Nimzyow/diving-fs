import { ApolloServer, gql } from "apollo-server"
import { makeSchema } from "nexus"

import * as types from "../../src/schema/index"
import { prismaMock } from "../singleton"
import { User } from ".prisma/client"

const ME_QUERY = gql`
    query Me {
        me {
            id
            name
            email
        }
    }
`

describe("me query", () => {
    let server: ApolloServer
    const schema = makeSchema({
        types,
    })
    beforeEach(() => {
        server = new ApolloServer({
            schema,
            context: {
                prisma: prismaMock,
            },
        })
    })
    it("successfully queries logged in user", async () => {
        const dateNow = new Date()

        const user: User = {
            id: "1",
            name: "Rich",
            handle: "richHandleMate",
            email: "adasd@asdas.com",
            password: "richHandleMan",
            role: "USER",
            createdAt: dateNow,
            updatedAt: dateNow,
        }

        prismaMock.user.findUnique.mockResolvedValue(user)
        const serverWithUserContext = new ApolloServer({
            schema,
            context: {
                prisma: prismaMock,
                user: { id: "1", name: "Rich", email: "adasd@asdas.com" },
            },
        })
        const loginUserResult = await serverWithUserContext.executeOperation({
            query: ME_QUERY,
        })

        expect(loginUserResult.data).toEqual({
            me: {
                id: "1",
                name: "Rich",
                email: "adasd@asdas.com",
            },
        })
    })
    it("returns null for user not logged in", async () => {
        const loginUserResult = await server.executeOperation({
            query: ME_QUERY,
        })

        expect(loginUserResult.data).toEqual({
            me: null,
        })
    })
})
