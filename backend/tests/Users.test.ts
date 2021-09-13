import { createTestContext } from "./__helpers"
const ctx = createTestContext()
it("ensures that a user can be created", async () => {
    // Create a new draft
    const createUserResult = await ctx.client.request(`            # 1
    mutation Mutation {
      createUser(firstName: "Nima", lastName: "Soufiani", email: "nima@example.com", password: "Randompasswordman") {
        token
      }
    }
  `)
    // Snapshot that create user and expect `published` to be false
    expect(createUserResult).toMatchInlineSnapshot() // 3
})
