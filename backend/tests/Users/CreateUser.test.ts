import { Prisma } from "@prisma/client"
import { ApolloServer, gql } from "apollo-server"
import bcrypt from "bcryptjs"
import { GraphQLError } from "graphql"
import jwt from "jsonwebtoken"
import { makeSchema } from "nexus"

import * as types from "../../src/schema/index"
import { prismaMock } from "../singleton"
import { User } from ".prisma/client"

const CREATE_USER = gql`
    mutation CreateUser($inputs: CreateUserInputs!) {
        createUser(inputs: $inputs) {
            token
        }
    }
`

describe("Create user mutation", () => {
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
    it("is successful", async () => {
        const sign = jest.spyOn(jwt, "sign")
        sign.mockImplementation(() => () => "signed")

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

        prismaMock.user.create.mockResolvedValue(user)

        // Create a new user

        const createUserResult = await server.executeOperation({
            query: CREATE_USER,
            variables: {
                inputs: {
                    name: "Nima",
                    handle: "nimzy",
                    email: "nima@example.com",
                    password: "RandomPasswordMan",
                },
            },
        })

        expect(createUserResult.data).toEqual({
            createUser: { token: "signed" },
        })
    })

    it("will return error object with empty string for email, firstName, lastName or password", async () => {
        const sign = jest.spyOn(jwt, "sign")
        sign.mockImplementation(() => "signed")

        // Create a new user
        const createUserResult = await server.executeOperation({
            query: CREATE_USER,
            variables: {
                inputs: {
                    name: "",
                    handle: "",
                    email: "",
                    password: "",
                },
            },
        })
        expect(createUserResult.errors).toEqual([new GraphQLError("Please enter valid inputs")])
    })
    it("will return error object if email already taken", async () => {
        const genSalt = jest.spyOn(bcrypt, "genSalt")
        const hash = jest.spyOn(bcrypt, "hash")
        genSalt.mockImplementation(() => "generatedSalt")
        hash.mockImplementation(() => "hashedMate")
        const error = new Prisma.PrismaClientKnownRequestError(
            "text containing the word email",
            "P1001",
            "123"
        )
        prismaMock.user.create.mockRejectedValue(error)

        const createUserResult = await server.executeOperation({
            query: CREATE_USER,
            variables: {
                inputs: {
                    name: "test",
                    handle: "testy",
                    email: "test@testing.com",
                    password: "testPass",
                },
            },
        })

        expect(createUserResult.errors).toEqual([new GraphQLError("This email has already been taken.")])
    })
    it("will return error object if handle already taken", async () => {
        const genSalt = jest.spyOn(bcrypt, "genSalt")
        const hash = jest.spyOn(bcrypt, "hash")
        genSalt.mockImplementation(() => "generatedSalt")
        hash.mockImplementation(() => "hashedMate")
        const error = new Prisma.PrismaClientKnownRequestError(
            "text containing the word handle",
            "P1001",
            "123"
        )
        prismaMock.user.create.mockRejectedValue(error)

        const createUserResult = await server.executeOperation({
            query: CREATE_USER,
            variables: {
                inputs: {
                    name: "test",
                    handle: "testy",
                    email: "test@testing.com",
                    password: "testPass",
                },
            },
        })

        expect(createUserResult.errors).toEqual([
            new GraphQLError("This handle has already been taken."),
        ])
    })
})
