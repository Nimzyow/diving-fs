import React from "react"

import { MockedProvider, MockedResponse } from "@apollo/client/testing"
import { render, waitFor, fireEvent } from "@testing-library/react"
import { createMemoryHistory } from "history"
import { Router } from "react-router-dom"

import { Me } from "../../../hooks/useAuth/useAuthOperations"
import { CreateUser } from "../GQL/RegisterGQL"
import { Register } from "./Register"

describe("Register component", () => {
    describe("should display error of ", () => {
        test("'email taken' if email is taken", async () => {
            const mocks: MockedResponse[] = [
                {
                    request: {
                        query: CreateUser,
                        variables: {
                            inputs: {
                                name: "tester",
                                email: "takenEmail@example.com",
                                handle: "testy",
                                password: "testPassword",
                            },
                        },
                    },
                    result: {
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
                },
                {
                    request: {
                        query: Me,
                    },
                    result: {
                        data: {
                            me: null,
                            __typename: "Query",
                        },
                    },
                },
            ]

            const history = createMemoryHistory()

            const { getByText, getByPlaceholderText } = render(
                <Router history={history}>
                    <MockedProvider mocks={mocks}>
                        <Register />
                    </MockedProvider>
                </Router>
            )

            fireEvent.change(getByPlaceholderText("Your name"), { target: { value: "tester" } })
            fireEvent.change(getByPlaceholderText("Handle"), { target: { value: "testy" } })
            fireEvent.change(getByPlaceholderText("Enter email"), {
                target: { value: "takenEmail@example.com" },
            })
            fireEvent.change(getByPlaceholderText("Password"), { target: { value: "testPassword" } })
            fireEvent.change(getByPlaceholderText("Password confirmation"), {
                target: { value: "testPassword" },
            })

            fireEvent.click(getByText("Submit"))

            await waitFor(() => new Promise((res) => setTimeout(res, 0)))

            const emailTakenMessage = getByText("email has been taken")

            expect(emailTakenMessage).toBeDefined()
        })
        test("handle taken error if handle is taken", async () => {
            const mocks: MockedResponse[] = [
                {
                    request: {
                        query: CreateUser,
                        variables: {
                            inputs: {
                                name: "tester",
                                email: "email@example.com",
                                handle: "takenHandle",
                                password: "testPassword",
                            },
                        },
                    },
                    result: {
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
                },
                {
                    request: {
                        query: Me,
                    },
                    result: {
                        data: {
                            me: null,
                            __typename: "Query",
                        },
                    },
                },
            ]

            const history = createMemoryHistory()

            const { getByText, getByPlaceholderText } = render(
                <Router history={history}>
                    <MockedProvider mocks={mocks}>
                        <Register />
                    </MockedProvider>
                </Router>
            )

            fireEvent.change(getByPlaceholderText("Your name"), { target: { value: "tester" } })
            fireEvent.change(getByPlaceholderText("Handle"), { target: { value: "takenHandle" } })
            fireEvent.change(getByPlaceholderText("Enter email"), {
                target: { value: "email@example.com" },
            })
            fireEvent.change(getByPlaceholderText("Password"), { target: { value: "testPassword" } })
            fireEvent.change(getByPlaceholderText("Password confirmation"), {
                target: { value: "testPassword" },
            })
            fireEvent.click(getByText("Submit"))

            await waitFor(() => new Promise((res) => setTimeout(res, 0)))

            const handleTakenMessage = getByText("handle has been taken")

            expect(handleTakenMessage).toBeDefined()
        })
        test("general error if gql error has occurred", async () => {
            const mocks: MockedResponse[] = [
                {
                    request: {
                        query: CreateUser,
                        variables: {
                            inputs: {
                                name: "tester",
                                email: "email@example.com",
                                handle: "takenHandle",
                                password: "testPassword",
                            },
                        },
                    },
                    error: new Error("Error occurred"),
                },
            ]

            const history = createMemoryHistory()

            const { getByText, getByPlaceholderText } = render(
                <Router history={history}>
                    <MockedProvider mocks={mocks}>
                        <Register />
                    </MockedProvider>
                </Router>
            )

            fireEvent.change(getByPlaceholderText("Your name"), { target: { value: "tester" } })
            fireEvent.change(getByPlaceholderText("Handle"), { target: { value: "takenHandle" } })
            fireEvent.change(getByPlaceholderText("Enter email"), {
                target: { value: "email@example.com" },
            })
            fireEvent.change(getByPlaceholderText("Password"), { target: { value: "testPassword" } })
            fireEvent.change(getByPlaceholderText("Password confirmation"), {
                target: { value: "testPassword" },
            })
            fireEvent.click(getByText("Submit"))

            await waitFor(() => new Promise((res) => setTimeout(res, 0)))

            const generalErrorMessage = getByText(
                "Something went wrong. Please try refreshing the page and try again."
            )

            expect(generalErrorMessage).toBeDefined()
        })
        test("should display password mismatch error", async () => {
            const mocks: MockedResponse[] = [
                {
                    request: {
                        query: Me,
                    },
                    result: {
                        data: {
                            me: null,
                            __typename: "Query",
                        },
                    },
                },
            ]

            const history = createMemoryHistory()
            const { getByText, getByPlaceholderText } = render(
                <Router history={history}>
                    <MockedProvider mocks={mocks}>
                        <Register />
                    </MockedProvider>
                </Router>
            )

            fireEvent.change(getByPlaceholderText("Your name"), { target: { value: "tester" } })
            fireEvent.change(getByPlaceholderText("Handle"), { target: { value: "takenHandle" } })
            fireEvent.change(getByPlaceholderText("Enter email"), {
                target: { value: "email@example.com" },
            })
            fireEvent.change(getByPlaceholderText("Password"), { target: { value: "testPassword" } })
            fireEvent.change(getByPlaceholderText("Password confirmation"), {
                target: { value: "notMatching" },
            })
            fireEvent.click(getByText("Submit"))

            const passwordMismatch = getByText("Password and password confirmation do not match.")

            expect(passwordMismatch).toBeDefined()
        })
    })
})
