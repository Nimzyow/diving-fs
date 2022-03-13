import { Prisma } from "@prisma/client"
import { ApolloServer, gql } from "apollo-server"
import { GraphQLError } from "graphql"
import { makeSchema } from "nexus"

import * as types from "../../src/schema/index"
import { prismaMock } from "../singleton"
import { Post, User } from ".prisma/client"

const USER_RELATED_POST = gql`
    query UserRelatedPosts {
        userRelatedPosts {
            id
            body
            # author {
            #     id
            #     name
            #     email
            # }
        }
    }
`

describe("View all user related posts query", () => {
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

        const user: User = {
            id: "1",
            name: "Rich",
            handle: "richHandle",
            email: "rich@example.com",
            password: "richHandle",
            role: "USER",
            createdAt: dateNow,
            updatedAt: dateNow,
        }

        const post: Post = {
            id: "1",
            body: "example post",
            createdAt: dateNow,
            updatedAt: dateNow,
            authorId: user.id,
        }

        prismaMock.post.findMany.mockResolvedValue([post])

        const userRelatedPostsResult = await server.executeOperation({
            query: USER_RELATED_POST,
        })
        console.log(userRelatedPostsResult)
        expect(userRelatedPostsResult.data).toEqual({
            userRelatedPosts: [
                {
                    id: "1",
                    body: "example post",
                    // author: {
                    //     id: "1",
                    //     name: "Rich",
                    //     email: "rich@example.com",
                    // },
                },
            ],
        })
    })
})
