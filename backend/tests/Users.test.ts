import { ApolloServer, gql } from "apollo-server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
// import { schema } from "../src/server"
import { makeSchema } from "nexus"
// import prisma from "../src/db"
import { nexusPrisma } from "nexus-plugin-prisma"

import * as types from "../src/schema/index"
import { prismaMock } from "./singleton"
import { User } from ".prisma/client"

const LOGIN_USER = gql`
    mutation login($inputs: LoginUserInputs!) {
        login(inputs: $inputs) {
            token
            errors {
                code
                message
            }
        }
    }
`

const CREATE_USER = gql`
    mutation CreateUser($inputs: CreateUserInputs!) {
        createUser(inputs: $inputs) {
            errors {
                code
                message
            }
            token
        }
    }
`

const ME_QUERY = gql`
    query Me {
        me {
            id
            name
            email
        }
    }
`

describe("Create user mutation", () => {
    let server: ApolloServer
    const schema = makeSchema({
        types,
        plugins: [nexusPrisma()],
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
            handle: "asdsads",
            email: "adasd@asdas.com",
            password: "asdasdasdas",
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
                    password: "Randompasswordman",
                },
            },
        })

        expect(createUserResult.data).toEqual({
            createUser: { token: "signed", errors: [] },
        })
    })

    it("will throw error with empty string for email, firstName, lastName or password", async () => {
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
        expect(createUserResult.data).toEqual({
            createUser: {
                token: null,
                errors: [{ code: "INVALID_INPUTS", message: "Please enter valid inputs" }],
            },
        })
    })
})

describe("login mutation", () => {
    let server: ApolloServer
    const schema = makeSchema({
        types,
        plugins: [nexusPrisma()],
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
        sign.mockImplementation(() => "signed")

        const compare = jest.spyOn(bcrypt, "compare")
        compare.mockImplementation(() => true)

        const dateNow = new Date()

        const user: User = {
            id: "1",
            name: "Rich",
            handle: "asdsads1",
            email: "adasd@asdas.com",
            password: "asdasdasdas",
            role: "USER",
            createdAt: dateNow,
            updatedAt: dateNow,
        }

        prismaMock.user.findUnique.mockResolvedValue(user)
        const loginUserResult = await server.executeOperation({
            query: LOGIN_USER,
            variables: {
                inputs: {
                    email: "test@example.com",
                    password: "ABCdefgh",
                },
            },
        })

        expect(loginUserResult.data).toEqual({
            login: { token: "signed", errors: [] },
        })
    })
    it("fails login on wrong password", async () => {
        const sign = jest.spyOn(jwt, "sign")
        sign.mockImplementation(() => () => "signed")

        const compare = jest.spyOn(bcrypt, "compare")
        compare.mockImplementation(() => false)

        const dateNow = new Date()

        const user: User = {
            id: "1",
            name: "Rich",
            handle: "asdsads2",
            email: "adasd@asdas.com",
            password: "asdasdasdas",
            role: "USER",
            createdAt: dateNow,
            updatedAt: dateNow,
        }

        prismaMock.user.findUnique.mockResolvedValue(user)
        const loginUserResult = await server.executeOperation({
            query: LOGIN_USER,
            variables: {
                inputs: {
                    email: "test@example.com",
                    password: "ABCdefgh",
                },
            },
        })

        expect(loginUserResult.data).toEqual({
            login: {
                token: null,
                errors: [
                    { code: "INVALID_CREDENTIALS", message: "Please check your email and password" },
                ],
            },
        })
    })
})

describe("me query", () => {
    let server: ApolloServer
    const schema = makeSchema({
        types,
        plugins: [nexusPrisma()],
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
            handle: "asdsads4",
            email: "adasd@asdas.com",
            password: "asdasdasdas",
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
