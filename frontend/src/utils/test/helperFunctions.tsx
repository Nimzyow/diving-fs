import React from "react"

import { ApolloError, DocumentNode } from "@apollo/client"
import { MockedProvider, MockedResponse } from "@apollo/client/testing"
import { render } from "@testing-library/react"
import { GraphQLError } from "graphql"
import { MemoryHistory, createMemoryHistory } from "history"
import { Router } from "react-router-dom"

type Mock = {
    query: DocumentNode
    variables?: Record<string, unknown>
    data?: Record<string, unknown>
    errors?: GraphQLError[]
    // networkError?: ApolloError
}[]

export const generateMock = (mocks: Mock): MockedResponse[] => {
    return mocks.map((mock) => ({
        request: {
            query: mock.query,
            variables: mock.variables,
        },
        result: {
            data: mock.data,
            errors: mock.errors,
        },
        // errors: mock.networkError,
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
    component,
}: {
    history?: MemoryHistory<unknown>
    mocks?: MockedResponse[]
    component: JSX.Element
}) => {
    render(
        <Router history={history}>
            <MockedProvider mocks={mocks}>{component}</MockedProvider>
        </Router>
    )
}
