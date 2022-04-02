import React from "react"

import { screen } from "@testing-library/react"

import { MockComponent } from "../../../utils/test/helperFunctions"
import { User } from "./User"

describe("User", () => {
    test("should display name", () => {
        MockComponent({ component: <User name="test" /> })

        expect(screen.getByText("test")).toBeInTheDocument()
    })
})
