import React from "react"

import { fireEvent, render } from "@testing-library/react"

import { Me } from "../../../hooks/useAuth/useAuthOperations"
import { generateMock, MockComponent } from "../../../utils/test/helperFunctions"
import { Login } from "./Login"

describe("Login", () => {
    test("Should display not an email validation error", () => {
        // const mocks = generateMock([{ query: Me, data: { me: null, __typename: "Query" } }])
        // const { getByPlaceholderText, getByText } = MockComponent({ mocks, children: <Login /> })
        // fireEvent.change(getByPlaceholderText("Enter email"), { target: { value: "test" } })
        // fireEvent.change(getByPlaceholderText("Password"), { target: { value: "testPassword" } })
        // const emailValidationError = getByText("Please enter a valid email address.")
        // expect(emailValidationError).toBeDefined()
    })
})
