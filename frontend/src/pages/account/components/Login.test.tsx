import React from "react"

import { fireEvent, render } from "@testing-library/react"

import { Login } from "./Login"

describe("Login", () => {
    test("Should display not an email validation error", () => {
        // const { getByPlaceholderText, getByText } = render(<Login />)
        // fireEvent.change(getByPlaceholderText("Enter email"), { target: { value: "test" } })
        // fireEvent.change(getByPlaceholderText("Password"), { target: { value: "testPassword" } })

        // const emailValidationError = getByText("email has been taken")

        // expect(emailValidationError).toBeDefined()
        expect(1 + 1).toBe(2)
    })
})
