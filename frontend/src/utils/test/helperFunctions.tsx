import React from "react"

import { DocumentNode } from "@apollo/client"
import { MockedProvider, MockedResponse } from "@apollo/client/testing"
import { render } from "@testing-library/react"
import { MemoryHistory, createMemoryHistory } from "history"
import { Router } from "react-router-dom"

type Mock = {
    query: DocumentNode
    variables?: Record<string, unknown>
    data?: Record<string, unknown>
    error?: Error
}[]

export const generateMock = (mocks: Mock): MockedResponse[] => {
    return mocks.map((mock) => ({
        request: {
            query: mock.query,
            variables: mock.variables,
        },
        result: {
            data: mock.data,
        },
        error: mock.error,
    }))
}

/**
 *
 * A wrapper for your testing component.
 * history is automatically renewed on every test. If you want to pass history though:
 * @example
 * const history = createMemoryHistory()
 * const { getByText, getByPlaceholderText } = MockComponent({
                history,
                mocks,
                children: <Register />,
            })
 * @returns testing library render function
 */
export const MockComponent = async ({
    history = createMemoryHistory(),
    mocks,
    children,
}: {
    history?: MemoryHistory<unknown>
    mocks?: MockedResponse[]
    children: JSX.Element
}) => {
    render(
        <Router history={history}>
            <MockedProvider mocks={mocks}>{children}</MockedProvider>
        </Router>
    )
}
