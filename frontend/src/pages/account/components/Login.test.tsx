import React from "react"

import { fireEvent, waitFor } from "@testing-library/react"
import { createMemoryHistory } from "history"

import { Me } from "../../../hooks/useAuth/useAuthOperations"
import { generateMock, MockComponent } from "../../../utils/test/helperFunctions"
import { LoginMutation } from "../GQL/loginGQL"
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
    describe("should login", () => {
        test("successfully", async () => {
            const mocks = generateMock([
                {
                    query: Me,
                    data: {
                        me: {
                            id: "1",
                            name: "test",
                            handle: "testy",
                            email: "test@example.com",
                            createdAt: "2021-21-02",
                            updatedAt: "2021-21-02",
                            __typename: "Me",
                        },
                        __typename: "Query",
                    },
                },
                {
                    query: LoginMutation,
                    variables: {
                        inputs: {
                            email: "test@example.com",
                            password: "testPassword",
                        },
                    },
                    data: {
                        login: {
                            token: "token",
                            errors: [],
                            __typename: "Token",
                        },
                    },
                },
            ])

            const history = createMemoryHistory()
            history.push("/account")
            const { getByText, getByPlaceholderText } = MockComponent({
                history,
                mocks,
                children: <Login />,
            })

            fireEvent.change(getByPlaceholderText("Enter email"), {
                target: { value: "test@example.com" },
            })
            fireEvent.change(getByPlaceholderText("Password"), { target: { value: "testPassword" } })
            fireEvent.click(getByText("Submit"))

            await waitFor(() => new Promise((res) => setTimeout(res, 0)))

            expect(history.location.pathname).toBe("/")
        })
    })
})
