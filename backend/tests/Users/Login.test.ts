import { ApolloServer, gql } from "apollo-server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { makeSchema } from "nexus"

import * as types from "../../src/schema/index"
import { prismaMock } from "../singleton"
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

describe("login mutation", () => {
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
        sign.mockImplementation(() => "signed")

        const compare = jest.spyOn(bcrypt, "compare")
        compare.mockImplementation(() => true)

        const dateNow = new Date()

        const user: User = {
            id: "1",
            name: "Rich",
            handle: "richRich",
            email: "adasd@asdas.com",
            password: "richHandleMan",
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
            handle: "rich2",
            email: "rich@example.com",
            password: "richHandleMan",
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
