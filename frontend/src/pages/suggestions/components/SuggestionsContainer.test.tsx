import React from "react"

import { screen } from "@testing-library/react"

import { MockComponent } from "../../../utils/test/helperFunctions"
import { SuggestionsContainer } from "./SuggestionsContainer"

describe("Posts", () => {
    test("should display first and last name and body ", () => {
        MockComponent({ component: <SuggestionsContainer /> })

        expect(screen.getByText("nima")).toBeInTheDocument()
        expect(screen.getByText("rob")).toBeInTheDocument()
        expect(screen.getByText("bob")).toBeInTheDocument()
        expect(screen.queryAllByTestId("follow")).toHaveLength(3)
    })
})
