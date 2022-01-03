import React from "react"

import { waitFor, fireEvent } from "@testing-library/react"
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

            const { getByText, getByPlaceholderText } = MockComponent({
                history,
                mocks,
                children: <Register />,
            })

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

            const { getByText, getByPlaceholderText } = MockComponent({
                mocks,
                children: <Register />,
            })

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

            const { getByText, getByPlaceholderText } = MockComponent({ mocks, children: <Register /> })

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

            const { getByText, getByPlaceholderText } = MockComponent({ mocks, children: <Register /> })

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
            const mocks = generateMock([{ query: Me, data: { me: null, __typename: "Query" } }])

            const { getByText, getByPlaceholderText } = MockComponent({ mocks, children: <Register /> })

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
        test("should display password min character error and clear error when password minimum length is met", async () => {
            const mocks = generateMock([{ query: Me, data: { me: null, __typename: "Query" } }])

            const { getByText, getByPlaceholderText, queryByText } = MockComponent({
                mocks,
                children: <Register />,
            })

            fireEvent.change(getByPlaceholderText("Your name"), { target: { value: "tester" } })
            fireEvent.change(getByPlaceholderText("Handle"), { target: { value: "takenHandle" } })
            fireEvent.change(getByPlaceholderText("Enter email"), {
                target: { value: "email@example.com" },
            })
            fireEvent.change(getByPlaceholderText("Password"), { target: { value: "p" } })
            fireEvent.change(getByPlaceholderText("Password confirmation"), {
                target: { value: "p" },
            })
            fireEvent.click(getByText("Submit"))

            const passwordMinCharacterError = getByText(
                "Password must be a minimum of 5 characters long."
            )

            expect(passwordMinCharacterError).toBeDefined()

            fireEvent.change(getByPlaceholderText("Password"), { target: { value: "pass" } })
            fireEvent.change(getByPlaceholderText("Password confirmation"), {
                target: { value: "pass" },
            })

            const passwordMinCharacterErrorAgain = getByText(
                "Password must be a minimum of 5 characters long."
            )

            expect(passwordMinCharacterErrorAgain).toBeDefined()

            fireEvent.change(getByPlaceholderText("Password"), { target: { value: "passw" } })
            fireEvent.change(getByPlaceholderText("Password confirmation"), {
                target: { value: "passw" },
            })

            const passwordMinCharacterMet = queryByText(
                "Password must be a minimum of 5 characters long."
            )

            expect(passwordMinCharacterMet).toBeNull()
        })
    })
})
