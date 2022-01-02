import React from "react"

import { fireEvent } from "@testing-library/react"

import { Me } from "../../../hooks/useAuth/useAuthOperations"
import { generateMock, MockComponent } from "../../../utils/test/helperFunctions"
import { Login } from "./Login"

describe("Login component", () => {
    describe("should display error of", () => {
        test("email validation", () => {
            const mocks = generateMock([{ query: Me, data: { me: null, __typename: "Query" } }])
            const { getByPlaceholderText, getByText } = MockComponent({ mocks, children: <Login /> })

            fireEvent.change(getByPlaceholderText("Enter email"), { target: { value: "test" } })
            fireEvent.change(getByPlaceholderText("Password"), { target: { value: "testPassword" } })

            const emailValidationError = getByText("Please enter a valid email address.")

            expect(emailValidationError).toBeDefined()
        })
        test("minimum password length", () => {
            const mocks = generateMock([{ query: Me, data: { me: null, __typename: "Query" } }])
            const { getByPlaceholderText, getByText } = MockComponent({ mocks, children: <Login /> })

            fireEvent.change(getByPlaceholderText("Enter email"), { target: { value: "test" } })
            fireEvent.change(getByPlaceholderText("Password"), { target: { value: "test" } })

            const emailValidationError = getByText("Password must be a minimum of 5 characters long.")

            expect(emailValidationError).toBeDefined()
        })
    })
})
