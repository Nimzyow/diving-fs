describe("This is my first test", () => {
    it("visits the login page", () => {
        cy.visit("http://localhost:3000/")

        cy.contains("Log in")
        cy.contains("Register here").click()
        cy.contains("Register")
        cy.contains("Login here").click()
        cy.get("input[type=email]").type("test@example.com")
        cy.get("input[type=password]").type("somethingOrAnother")
    })
})
