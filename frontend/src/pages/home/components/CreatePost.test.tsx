import React from "react"

import { waitFor, fireEvent, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createMemoryHistory } from "history"

import { MockComponent } from "../../../utils/test/helperFunctions"
import { CreatePost } from "./CreatePost"

describe("CreatePost", () => {
    test("should first", () => {
        MockComponent({
            children: <CreatePost />,
        })

        expect(screen.getByText("Post")).toBeDefined()
    })
})
