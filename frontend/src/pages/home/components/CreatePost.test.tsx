import React from "react"

import { waitFor, fireEvent, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createMemoryHistory } from "history"

import { CREATE_POST } from "../../../hooks/usePost/operations"
import { generateMock, MockComponent } from "../../../utils/test/helperFunctions"
import { CreatePost } from "./CreatePost"

describe("CreatePost", () => {
    test("Should display Post button", () => {
        MockComponent({
            component: <CreatePost />,
        })

        expect(screen.getByRole("button", { name: "Post" })).toBeInTheDocument()
    })
    test("Should fire off createPost mutation", async () => {
        const mocks = generateMock([
            {
                query: CREATE_POST,
                variables: {
                    CreatePostInputs: {
                        body: "this is text",
                    },
                },
                data: {
                    createPost: {
                        id: "1",
                        body: "this is text",
                        createdAt: "2021-22-22",
                        updatedAt: "2021-22-22",
                        __typename: "Post",
                    },
                },
            },
        ])
        MockComponent({
            component: <CreatePost />,
            mocks,
        })

        userEvent.type(screen.getByPlaceholderText("Anything on your mind?"), "this is text")

        const button = screen.getByRole("button", { name: "Post" })
        fireEvent.click(button)

        await waitFor(() => new Promise((res) => setTimeout(res, 0)))

        expect(screen.getByText("Posted!")).toBeInTheDocument()
    })
})
