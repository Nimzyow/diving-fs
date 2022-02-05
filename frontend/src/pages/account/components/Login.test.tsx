import React from "react"

import { fireEvent, waitFor, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createMemoryHistory } from "history"

import { Me } from "../../../hooks/useAuth/useAuthOperations"
import { generateMock, MockComponent } from "../../../utils/test/helperFunctions"
import { LoginMutation } from "../GQL/loginGQL"
import { Login } from "./Login"

describe("Login component", () => {
    describe("should display error of", () => {
        test("email validation", () => {
            const mocks = generateMock([{ query: Me, data: { me: null, __typename: "Query" } }])
            MockComponent({ mocks, component: <Login /> })

            userEvent.type(screen.getByPlaceholderText("Enter email"), "test")
            userEvent.type(screen.getByPlaceholderText("Password"), "testPassword")

            const emailValidationError = screen.getByText("Please enter a valid email address.")

            expect(emailValidationError).toBeInTheDocument()
        })
        test("minimum password length", () => {
            const mocks = generateMock([{ query: Me, data: { me: null, __typename: "Query" } }])
            MockComponent({ mocks, component: <Login /> })

            userEvent.type(screen.getByPlaceholderText("Enter email"), "test")
            userEvent.type(screen.getByPlaceholderText("Password"), "test")

            const emailValidationError = screen.getByText(
                "Password must be a minimum of 5 characters long."
            )

            expect(emailValidationError).toBeInTheDocument()
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

            MockComponent({
                history,
                mocks,
                component: <Login />,
            })
            await waitFor(() => new Promise((res) => setTimeout(res, 0)))

            userEvent.type(screen.getByPlaceholderText("Enter email"), "test@example.com")
            userEvent.type(screen.getByPlaceholderText("Password"), "testPassword")
            fireEvent.click(screen.getByText("Submit"))

            await waitFor(() => new Promise((res) => setTimeout(res, 0)))

            expect(history.location.pathname).toBe("/")
        })
    })
})
