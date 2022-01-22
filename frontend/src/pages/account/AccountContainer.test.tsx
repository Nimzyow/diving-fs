import React from "react"

import { waitFor } from "@testing-library/react"
import { createMemoryHistory } from "history"

import { Me } from "../../hooks/useAuth/useAuthOperations"
import { generateMock, MockComponent } from "../../utils/test/helperFunctions"
import { AccountContainer } from "./AccountContainer"

describe("Account container", () => {
    test("should redirect user to home page if logged in", async () => {
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
        ])

        const history = createMemoryHistory()
        history.push("/account")

        MockComponent({
            history,
            mocks,
            children: <AccountContainer />,
        })
        await waitFor(() => new Promise((res) => setTimeout(res, 0)))

        expect(history.location.pathname).toBe("/")
    })
    test("should stay on account page if user is not logged in", async () => {
        const mocks = generateMock([
            {
                query: Me,
                data: {
                    me: null,
                },
            },
        ])

        const history = createMemoryHistory()

        history.push("/account")

        MockComponent({
            history,
            mocks,
            children: <AccountContainer />,
        })

        expect(history.location.pathname).toBe("/account")
    })
})
