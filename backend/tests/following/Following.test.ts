import { Prisma } from "@prisma/client"
import { ApolloServer, gql } from "apollo-server"
import { GraphQLError } from "graphql"
import { makeSchema } from "nexus"

import * as types from "../../src/schema/index"
import { prismaMock } from "../singleton"
import { Post, User } from ".prisma/client"

const FOLLOW_USER = gql`
    mutation FollowUser($userId: String!) {
        followUser(userId: $userId) {
            id
        }
    }
`

describe("Follow user mutation", () => {
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
        const following = {
            id: "1",
            user: {
                id: "1",
                name: "test",
            },
            userId: "1",
        }

        prismaMock.following.create.mockResolvedValue(following)

        const followUserResult = await server.executeOperation({
            query: FOLLOW_USER,
            variables: {
                userId: "1",
            },
        })

        expect(followUserResult.data).toEqual({
            followUser: {
                id: "1",
            },
        })
    })
    // it("will return error object if post creation fails", async () => {
    //     const error = new Prisma.PrismaClientKnownRequestError(
    //         "text containing the word email",
    //         "P1001",
    //         "123"
    //     )

    //     prismaMock.post.create.mockRejectedValue(error)

    //     const createPostResult = await server.executeOperation({
    //         query: CREATE_POST,
    //         variables: {
    //             inputs: {
    //                 body: "example post",
    //             },
    //         },
    //     })
    //     expect(createPostResult.data).toEqual([
    //         new GraphQLError("Post failed to create. Try again later."),
    //     ])
    // })
})
