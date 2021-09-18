import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { ApolloServer, gql } from "apollo-server"
import { schema } from "../src/server"
import prisma from "../src/db"

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
                prisma: prisma,
            },
        })

        // ! define return type and send it as a generic inside request
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
        sign.mockImplementation(() => () => "signed")

        const server = new ApolloServer({
            schema,
            context: {
                prisma: prisma,
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
        // create user
        // use login mutation
        const sign = jest.spyOn(jwt, "sign")
        sign.mockImplementation(() => () => "signed")

        const compare = jest.spyOn(bcrypt, "compare")
        compare.mockImplementation(() => () => true)

        const server = new ApolloServer({
            schema,
            context: {
                prisma: prisma,
            },
        })

        const createUser = await prisma.user.upsert({
            where: { email: "test@example.com" },
            update: {},
            create: {
                firstName: "Nima",
                lastName: "adasd",
                email: "test@example.com",
                password: "ABCdefgh",
            },
        })

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
})
