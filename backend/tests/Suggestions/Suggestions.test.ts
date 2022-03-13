import { ApolloServer, gql } from "apollo-server"
import { makeSchema } from "nexus"

import * as types from "../../src/schema/index"
import { prismaMock } from "../singleton"
import { User } from ".prisma/client"

const GET_USER_SUGGESTIONS = gql`
    query getUserSuggestions {
        userSuggestions {
            id
            name
        }
    }
`

describe("view all user suggestions", () => {
    let server: ApolloServer
    const schema = makeSchema({
        types,
    })
    beforeEach(() => {
        server = new ApolloServer({
            schema,
            context: {
                prisma: prismaMock,
                user: { id: "1" },
            },
        })
    })
    it("is successful", async () => {
        const dateNow = new Date()

        const userTwo: User = {
            id: "2",
            name: "Rich",
            handle: "richHandle",
            email: "rich@example.com",
            password: "richHandle",
            role: "USER",
            createdAt: dateNow,
            updatedAt: dateNow,
        }

        const userThree: User = {
            id: "3",
            name: "second",
            handle: "second",
            email: "second@example.com",
            password: "secondHandle",
            role: "USER",
            createdAt: dateNow,
            updatedAt: dateNow,
        }

        prismaMock.user.findMany.mockResolvedValue([userTwo, userThree])

        const userSuggestionsResult = await server.executeOperation({
            query: GET_USER_SUGGESTIONS,
        })

        expect(userSuggestionsResult.data).toEqual({
            userSuggestions: [
                {
                    id: "2",
                    name: "Rich",
                },
                {
                    id: "3",
                    name: "second",
                },
            ],
        })
    })
})
