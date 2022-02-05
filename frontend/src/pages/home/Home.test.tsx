import React from "react"

import { screen } from "@testing-library/react"

import { MockComponent } from "../../utils/test/helperFunctions"
import { Home } from "./Home"

describe("Home", () => {
    test("should display CreatePost component", () => {
        MockComponent({
            component: <Home />,
        })

        expect(screen.getByTestId("createPost")).toBeInTheDocument()
    })
})
