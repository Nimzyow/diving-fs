import { Prisma } from "@prisma/client"
import { ApolloServer, gql } from "apollo-server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { makeSchema } from "nexus"

import * as types from "../../src/schema/index"
import { prismaMock } from "../singleton"
import { Post, User } from ".prisma/client"

const CREATE_POST = gql`
    mutation CreatePost($inputs: CreatePostInputs!) {
        createPost(inputs: $inputs) {
            id
            body
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
                id: "1",
                body: "example post",
            },
        })
    })
})
