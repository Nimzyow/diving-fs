import React from "react"

import { MockedProvider, MockedResponse } from "@apollo/client/testing"
import { render, waitFor, fireEvent } from "@testing-library/react"
import { createMemoryHistory } from "history"
import { Router } from "react-router-dom"

import { CreateUser } from "../GQL/RegisterGQL"
import { Register } from "./Register"

describe("Register component", () => {
    test("should display email taken error if email is taken", async () => {
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

        fireEvent.click(getByText("Submit"))

        await waitFor(() => new Promise((res) => setTimeout(res, 0)))

        const emailTakenMessage = getByText("email has been taken")

        expect(emailTakenMessage).toBeDefined()
    })
    test("should display handle taken error if handle is taken", async () => {
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

        fireEvent.click(getByText("Submit"))

        await waitFor(() => new Promise((res) => setTimeout(res, 0)))

        const emailTakenMessage = getByText("handle has been taken")

        expect(emailTakenMessage).toBeDefined()
    })
})
