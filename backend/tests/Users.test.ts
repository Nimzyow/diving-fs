import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { ApolloServer, gql } from "apollo-server"
import { schema } from "../src/server"
// import prisma from "../src/db"
import { prismaMock } from "./singleton"
import { User } from ".prisma/client"

const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!, $passwordConfirm: String!) {
        login(email: $email, password: $password, passwordConfirm: $passwordConfirm) {
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

describe("User", () => {
    it("can be created", async () => {
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
            createdAt: dateNow,
            updatedAt: dateNow,
        }

        prismaMock.user.upsert.mockResolvedValue(user)

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

    it("will throw error with no email, firstName, lastName or password", async () => {
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
    it("can log in", async () => {
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
