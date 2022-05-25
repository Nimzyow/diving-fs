import { ApolloServer, gql } from "apollo-server"
import { makeSchema } from "nexus"

import * as types from "../../src/schema/index"
import { prismaMock } from "../singleton"
import { Post, User } from ".prisma/client"

const CREATE_POST = gql`
    mutation CreatePost($inputs: CreatePostInputs!) {
        createPost(inputs: $inputs) {
            post {
                id
                body
            }
            createPostError {
                field
                message
            }
        }
    }
`

describe("Create post mutation", () => {
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

        prismaMock.post.create.mockResolvedValue(post)

        const createPostResult = await server.executeOperation({
            query: CREATE_POST,
            variables: {
                inputs: {
                    body: "example post",
                },
            },
        })
        expect(createPostResult.data).toEqual({
            createPost: {
                post: {
                    id: "1",
                    body: "example post",
                },
                createPostError: null,
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
