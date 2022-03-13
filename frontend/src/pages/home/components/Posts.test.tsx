import React from "react"

import { screen } from "@testing-library/react"

import { MockComponent } from "../../../utils/test/helperFunctions"
import { Posts } from "./Posts"

describe("Posts", () => {
    test("should display first and last name and body ", () => {
        MockComponent({ component: <Posts name="test" body="random body" /> })

        expect(screen.getByText("test")).toBeInTheDocument()
        expect(screen.getByText("random body")).toBeInTheDocument()
    })
})
