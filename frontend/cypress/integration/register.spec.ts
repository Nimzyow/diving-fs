describe("User", () => {
    it("can register", () => {
        cy.visit("http://localhost:3000/")
        cy.clearCookies()

        cy.intercept(
            {
                method: "POST",
                url: "**/graphql?CreateUser",
            },
            {
                body: {
                    data: { createUser: { token: "superTokenBros", errors: [], __typename: "Token" } },
                },
            }
        ).as("loginQuery")

        cy.contains("Register here").click()
        cy.contains("Register")
        cy.get("input[name=firstName]").type("testFirstName")
        cy.get("input[name=lastName]").type("testLastName")
        cy.get("input[type=email").type("test@example.com")
        cy.get("input[name=password").type("testPassword")
        cy.get("input[name=passwordConfirm").type("testPassword")
        cy.intercept(
            {
                method: "POST",
                url: "**/graphql?Me",
            },
            {
                body: {
                    data: {
                        me: {
                            id: "1",
                            firstName: "test",
                            lastName: "testing",
                            email: "test@example.com",
                            __typename: "User",
                        },
                    },
                },
            }
        ).as("meQuery")
        cy.contains("Submit").click()
    })
})
