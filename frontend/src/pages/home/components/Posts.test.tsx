import React from "react"

import { screen } from "@testing-library/react"

import { MockComponent } from "../../../utils/test/helperFunctions"
import { Posts } from "./Posts"

describe("Posts", () => {
    test("should display first and last name and body ", () => {
        MockComponent({ component: <Posts firstName="test" lastName="testing" body="random body" /> })

        expect(screen.getByText("test testing")).toBeInTheDocument()
        expect(screen.getByText("random body")).toBeInTheDocument()
    })
})
