import { DocumentNode } from "@apollo/client"
import { MockedResponse } from "@apollo/client/testing"

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
