import { createTestContext } from "./__helpers"
import jwt from "jsonwebtoken"

const ctx = createTestContext()

jest.mock("jsonwebtoken")

it("ensures that a user can be created", async () => {
    const sign = jest.spyOn(jwt, "sign")
    sign.mockImplementation(() => () => "signed")

    // Create a new draft
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
    // Snapshot that create user and expect `published` to be false
    expect(createUserResult).toMatchInlineSnapshot(`
Object {
  "createUser": Object {
    "errors": Array [],
    "token": "signed",
  },
}
`) // 3
})
