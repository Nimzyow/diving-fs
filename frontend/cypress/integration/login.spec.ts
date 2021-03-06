describe("User", () => {
    it("can login", () => {
        cy.visit("http://localhost:3000/")
        cy.clearCookies()

        cy.intercept(
            {
                method: "POST",
                url: "**/graphql?login",
            },
            {
                body: { data: { login: { token: "superTokenBros", errors: [], __typename: "Token" } } },
            }
        ).as("loginQuery")
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

        cy.contains("Log in")
        // cy.contains("Register here").click()
        // cy.contains("Register")
        // cy.contains("Login here").click()
        cy.get("input[type=email]").type("test@example.com")
        cy.get("input[type=password]").type("somethingOrAnother")
        cy.contains("Submit").click()
        cy.location("pathname").should("eq", "/")
    })
})
