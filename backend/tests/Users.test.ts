import { createTestContext } from "./__helpers"
import jwt from "jsonwebtoken"

const ctx = createTestContext()

it("ensures that a user can be created", async () => {
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
    console.log(createUserResult)
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
