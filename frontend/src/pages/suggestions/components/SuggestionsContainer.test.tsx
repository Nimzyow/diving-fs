import React from "react"

import { screen, waitFor } from "@testing-library/react"

import { MockComponent, generateMock } from "../../../utils/test/helperFunctions"
import { GET_USER_SUGGESTIONS } from "../operations"
import { SuggestionsContainer } from "./SuggestionsContainer"

describe("Posts", () => {
    test("should display first and last name and body ", async () => {
        const mocks = generateMock([
            {
                query: GET_USER_SUGGESTIONS,
                data: {
                    userSuggestions: [
                        {
                            id: "1",
                            name: "test",
                        },
                        {
                            id: "2",
                            name: "rob",
                        },
                        {
                            id: "3",
                            name: "bob",
                        },
                    ],
                },
            },
        ])
        MockComponent({ component: <SuggestionsContainer />, mocks })

        await waitFor(() => new Promise((res) => setTimeout(res, 0)))

        expect(screen.getByText("test")).toBeInTheDocument()
        expect(screen.getByText("rob")).toBeInTheDocument()
        expect(screen.getByText("bob")).toBeInTheDocument()
        expect(screen.queryAllByTestId("follow")).toHaveLength(3)
    })
})
