import { createTestContext } from "./__helpers"
import jwt from "jsonwebtoken"

const ctx = createTestContext()

describe("User", () => {
    it("can be created", async () => {
        const sign = jest.spyOn(jwt, "sign")
        sign.mockImplementation(() => () => "signed")

        // ! define return type and send it as a generic inside request
        // Create a new user
        const createUserResult = await ctx.client.request(`            # 1
      mutation Mutation {
        createUser(firstName: "Nima", lastName: "Soufiani", email: "nima@example.com", password: "Randompasswordman") {
          token
          errors {
            message
            code
          }
        }
      }
    `)
        // Snapshot that create user
        expect(createUserResult).toMatchInlineSnapshot(`
        Object {
          "createUser": Object {
            "errors": Array [],
            "token": "signed",
          },
        }
        `) // 3
        expect(createUserResult).toEqual({ createUser: { token: "signed", errors: [] } })
    })

    it("will throw error with no email, firstName, lastName or password", async () => {
        const sign = jest.spyOn(jwt, "sign")
        sign.mockImplementation(() => () => "signed")

        // ! define return type and send it as a generic inside request
        // Create a new user
        const createUserResult = await ctx.client.request(`            # 1
          mutation Mutation {
            createUser(firstName: "", lastName: "", email: "", password: "") {
              token
              errors {
                message
                code
              }
            }
          }
        `)

        expect(createUserResult).toEqual({
            createUser: {
                token: "signed",
                errors: [{ code: "INVALID_INPUTS", message: "Please enter valid inputs" }],
            },
        })
    })
})
