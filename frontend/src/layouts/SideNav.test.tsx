import React from "react"

import { screen } from "@testing-library/react"

import { MockComponent } from "../utils/test/helperFunctions"
import { SideNav } from "./SideNav"

describe("SideNav", () => {
    test("should display all items in side nav", () => {
        MockComponent({
            component: <SideNav />,
        })

        // expect(screen.getByText("Home")).toBeInTheDocument()
        expect(screen.getByRole("link", { name: "Following" })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: "Suggestions" })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: "Locations" })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: "Liked locations" })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: "Places to go" })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: "Visited" })).toBeInTheDocument()
        // expect(screen.getByRole("Home")).toBeInTheDocument()
        // expect(screen.getByText("Following")).toBeInTheDocument()
    })
})
