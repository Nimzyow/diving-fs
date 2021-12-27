import { ApolloServer, gql } from "apollo-server"
import jwt from "jsonwebtoken"
import { makeSchema } from "nexus"

import * as types from "../../src/schema/index"
import { prismaMock } from "../singleton"
import { User } from ".prisma/client"

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
