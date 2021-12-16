import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { ApolloServer, gql } from "apollo-server"
import { schema } from "../src/server"
// import prisma from "../src/db"
import { prismaMock } from "./singleton"
import { User } from ".prisma/client"

const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            errors {
                code
                message
            }
        }
    }
`

const CREATE_USER = gql`
    mutation createUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
            token
            errors {
                message
                code
            }
        }
    }
`

const ME_QUERY = gql`
    query Me {
        me {
            id
            firstName
            lastName
            email
        }
    }
`

describe("Create user mutation", () => {
    it("is successful", async () => {
        const sign = jest.spyOn(jwt, "sign")
        sign.mockImplementation(() => () => "signed")

        const server = new ApolloServer({
            schema,
            context: {
                prisma: prismaMock,
            },
        })

        const dateNow = new Date()

        const user: User = {
            id: "1",
            firstName: "Rich",
            lastName: "asdsads",
            email: "adasd@asdas.com",
            password: "asdasdasdas",
            isSuperUser: false,
            role: "USER",
            status: "ACTIVE",
            createdAt: dateNow,
            updatedAt: dateNow,
        }

        prismaMock.user.create.mockResolvedValue(user)

        // Create a new user
        const createUserResult = await server.executeOperation({
            query: CREATE_USER,
            variables: {
                firstName: "Nima",
                lastName: "Soufiani",
                email: "nima@example.com",
                password: "Randompasswordman",
            },
        })

        expect(createUserResult.data).toEqual({
            createUser: { token: "signed", errors: [] },
        })
    })

    it("will throw error with empty string for email, firstName, lastName or password", async () => {
        const sign = jest.spyOn(jwt, "sign")
        sign.mockImplementation(() => "signed")

        const server = new ApolloServer({
            schema,
            context: {
                prisma: prismaMock,
            },
        })

        // Create a new user
        const createUserResult = await server.executeOperation({
            query: CREATE_USER,
            variables: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
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
    it("is successful", async () => {
        const sign = jest.spyOn(jwt, "sign")
        sign.mockImplementation(() => "signed")

        const compare = jest.spyOn(bcrypt, "compare")
        compare.mockImplementation(() => true)

        const server = new ApolloServer({
            schema,
            context: {
                prisma: prismaMock,
            },
        })

        const dateNow = new Date()

        const user: User = {
            id: "1",
            firstName: "Rich",
            lastName: "asdsads",
            email: "adasd@asdas.com",
            password: "asdasdasdas",
            isSuperUser: false,
            role: "USER",
            status: "ACTIVE",
            createdAt: dateNow,
            updatedAt: dateNow,
        }

        prismaMock.user.findUnique.mockResolvedValue(user)

        const loginUserResult = await server.executeOperation({
            query: LOGIN_USER,
            variables: {
                email: "test@example.com",
                password: "ABCdefgh",
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

        const server = new ApolloServer({
            schema,
            context: {
                prisma: prismaMock,
            },
        })

        const dateNow = new Date()

        const user: User = {
            id: "1",
            firstName: "Rich",
            lastName: "asdsads",
            email: "adasd@asdas.com",
            password: "asdasdasdas",
            isSuperUser: false,
            role: "USER",
            status: "ACTIVE",
            createdAt: dateNow,
            updatedAt: dateNow,
        }

        prismaMock.user.findUnique.mockResolvedValue(user)

        const loginUserResult = await server.executeOperation({
            query: LOGIN_USER,
            variables: {
                email: "test@example.com",
                password: "ABCdefgh",
                passwordConfirm: "ABCdefgh",
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
    it("successfully queries logged in user", async () => {
        const server = new ApolloServer({
            schema,
            context: {
                prisma: prismaMock,
                user: {
                    id: "1",
                },
            },
        })

        const dateNow = new Date()

        const user: User = {
            id: "1",
            firstName: "Rich",
            lastName: "asdsads",
            email: "adasd@asdas.com",
            password: "asdasdasdas",
            isSuperUser: false,
            role: "USER",
            status: "ACTIVE",
            createdAt: dateNow,
            updatedAt: dateNow,
        }

        prismaMock.user.findUnique.mockResolvedValue(user)

        const loginUserResult = await server.executeOperation({
            query: ME_QUERY,
        })

        expect(loginUserResult.data).toEqual({
            me: {
                id: "1",
                firstName: "Rich",
                lastName: "asdsads",
                email: "adasd@asdas.com",
            },
        })
    })
    it("returns null for user not logged in", async () => {
        const server = new ApolloServer({
            schema,
            context: {
                prisma: prismaMock,
                user: null,
            },
        })

        const loginUserResult = await server.executeOperation({
            query: ME_QUERY,
        })

        expect(loginUserResult.data).toEqual({
            me: null,
        })
    })
})
