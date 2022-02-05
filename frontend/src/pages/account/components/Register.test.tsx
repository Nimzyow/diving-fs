import React from "react"

import { waitFor, fireEvent, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createMemoryHistory } from "history"

import { Me } from "../../../hooks/useAuth/useAuthOperations"
import { generateMock, MockComponent } from "../../../utils/test/helperFunctions"
import { CreateUser } from "../GQL/RegisterGQL"
import { Register } from "./Register"

describe("Register component", () => {
    describe("should register user", () => {
        test("successfully", async () => {
            const mocks = generateMock([
                {
                    query: CreateUser,
                    variables: {
                        inputs: {
                            name: "tester",
                            email: "takenEmail@example.com",
                            handle: "testy",
                            password: "testPassword",
                        },
                    },
                    data: {
                        createUser: {
                            errors: [],
                            token: "token",
                            __typename: "Token",
                        },
                    },
                },
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
            ])

            const history = createMemoryHistory()
            history.push("/account")

            MockComponent({
                history,
                mocks,
                children: <Register />,
            })
            await waitFor(() => new Promise((res) => setTimeout(res, 0)))

            userEvent.type(screen.getByPlaceholderText("Your name"), "tester")
            userEvent.type(screen.getByPlaceholderText("Handle"), "testy")
            userEvent.type(screen.getByPlaceholderText("Enter email"), "takenEmail@example.com")
            userEvent.type(screen.getByPlaceholderText("Password"), "testPassword")
            userEvent.type(screen.getByPlaceholderText("Password confirmation"), "testPassword")
            fireEvent.click(screen.getByText("Submit"))

            await waitFor(() => new Promise((res) => setTimeout(res, 0)))

            expect(history.location.pathname).toBe("/")
        })
    })

    describe("should display error of", () => {
        test("'email taken' if email is taken", async () => {
            const mocks = generateMock([
                {
                    query: CreateUser,
                    variables: {
                        inputs: {
                            name: "tester",
                            email: "takenEmail@example.com",
                            handle: "testy",
                            password: "testPassword",
                        },
                    },
                    data: {
                        createUser: {
                            errors: [
                                {
                                    code: "EMAIL_TAKEN",
                                    message: "email has been taken",
                                    __typename: "Error",
                                },
                            ],
                            token: null,
                            __typename: "Token",
                        },
                    },
                },
            ])

            MockComponent({
                mocks,
                children: <Register />,
            })
            await waitFor(() => new Promise((res) => setTimeout(res, 0)))

            userEvent.type(screen.getByPlaceholderText("Your name"), "tester")
            userEvent.type(screen.getByPlaceholderText("Handle"), "testy")
            userEvent.type(screen.getByPlaceholderText("Enter email"), "takenEmail@example.com")
            userEvent.type(screen.getByPlaceholderText("Password"), "testPassword")
            userEvent.type(screen.getByPlaceholderText("Password confirmation"), "testPassword")
            fireEvent.click(screen.getByText("Submit"))

            await waitFor(() => new Promise((res) => setTimeout(res, 0)))

            const emailTakenMessage = screen.getByText("email has been taken")

            expect(emailTakenMessage).toBeInTheDocument()
        })
        test("handle taken error if handle is taken", async () => {
            const mocks = generateMock([
                {
                    query: CreateUser,
                    variables: {
                        inputs: {
                            name: "tester",
                            email: "email@example.com",
                            handle: "takenHandle",
                            password: "testPassword",
                        },
                    },
                    data: {
                        createUser: {
                            errors: [
                                {
                                    code: "HANDLE_TAKEN",
                                    message: "handle has been taken",
                                    __typename: "Error",
                                },
                            ],
                            token: null,
                            __typename: "Token",
                        },
                    },
                },
            ])

            MockComponent({ mocks, children: <Register /> })
            await waitFor(() => new Promise((res) => setTimeout(res, 0)))

            userEvent.type(screen.getByPlaceholderText("Your name"), "tester")
            userEvent.type(screen.getByPlaceholderText("Handle"), "takenHandle")
            userEvent.type(screen.getByPlaceholderText("Enter email"), "email@example.com")
            userEvent.type(screen.getByPlaceholderText("Password"), "testPassword")
            userEvent.type(screen.getByPlaceholderText("Password confirmation"), "testPassword")
            fireEvent.click(screen.getByText("Submit"))

            await waitFor(() => new Promise((res) => setTimeout(res, 0)))

            const handleTakenMessage = screen.getByText("handle has been taken")

            expect(handleTakenMessage).toBeInTheDocument()
        })
        test("general error if gql error has occurred", async () => {
            const mocks = generateMock([
                {
                    query: CreateUser,
                    variables: {
                        inputs: {
                            name: "tester",
                            email: "email@example.com",
                            handle: "takenHandle",
                            password: "testPassword",
                        },
                    },
                    error: new Error("Error occurred"),
                },
            ])

            MockComponent({ mocks, children: <Register /> })
            await waitFor(() => new Promise((res) => setTimeout(res, 0)))

            userEvent.type(screen.getByPlaceholderText("Your name"), "tester")
            userEvent.type(screen.getByPlaceholderText("Handle"), "takenHandle")
            userEvent.type(screen.getByPlaceholderText("Enter email"), "email@example.com")
            userEvent.type(screen.getByPlaceholderText("Password"), "testPassword")
            userEvent.type(screen.getByPlaceholderText("Password confirmation"), "testPassword")
            fireEvent.click(screen.getByText("Submit"))

            await waitFor(() => new Promise((res) => setTimeout(res, 0)))

            const generalErrorMessage = screen.getByText(
                "Something went wrong. Please try refreshing the page and try again."
            )

            expect(generalErrorMessage).toBeInTheDocument()
        })
        test("should display password mismatch error", async () => {
            const mocks = generateMock([{ query: Me, data: { me: null, __typename: "Query" } }])

            MockComponent({ mocks, children: <Register /> })
            await waitFor(() => new Promise((res) => setTimeout(res, 0)))

            userEvent.type(screen.getByPlaceholderText("Your name"), "tester")
            userEvent.type(screen.getByPlaceholderText("Handle"), "takenHandle")
            userEvent.type(screen.getByPlaceholderText("Enter email"), "email@example.com")
            userEvent.type(screen.getByPlaceholderText("Password"), "testPassword")
            userEvent.type(screen.getByPlaceholderText("Password confirmation"), "notMatching")
            fireEvent.click(screen.getByText("Submit"))

            const passwordMismatch = screen.getByText("Password and password confirmation do not match.")

            expect(passwordMismatch).toBeInTheDocument()
        })
        test("should display password min character error and clear error when password minimum length is met", async () => {
            const mocks = generateMock([{ query: Me, data: { me: null, __typename: "Query" } }])

            MockComponent({
                mocks,
                children: <Register />,
            })
            await waitFor(() => new Promise((res) => setTimeout(res, 0)))

            const passwordInput = screen.getByPlaceholderText("Password")
            const passwordConfirmInput = screen.getByPlaceholderText("Password confirmation")

            userEvent.type(screen.getByPlaceholderText("Your name"), "tester")
            userEvent.type(screen.getByPlaceholderText("Handle"), "takenHandle")
            userEvent.type(screen.getByPlaceholderText("Enter email"), "email@example.com")
            userEvent.type(passwordInput, "p")
            userEvent.type(passwordConfirmInput, "p")
            fireEvent.click(screen.getByText("Submit"))

            const passwordMinCharacterError = screen.getByText(
                "Password must be a minimum of 5 characters long."
            )

            expect(passwordMinCharacterError).toBeInTheDocument()

            userEvent.clear(passwordInput)
            userEvent.clear(passwordConfirmInput)
            userEvent.type(passwordInput, "pass")
            userEvent.type(passwordConfirmInput, "pass")

            const passwordMinCharacterErrorAgain = screen.getByText(
                "Password must be a minimum of 5 characters long."
            )

            expect(passwordMinCharacterErrorAgain).toBeInTheDocument()

            userEvent.type(passwordInput, "w")
            userEvent.type(passwordConfirmInput, "w")

            const passwordMinCharacterMet = screen.queryByText(
                "Password must be a minimum of 5 characters long."
            )

            expect(passwordMinCharacterMet).not.toBeInTheDocument()
        })
    })
})
