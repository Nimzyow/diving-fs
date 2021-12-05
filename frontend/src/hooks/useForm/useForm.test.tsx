import { renderHook, act, RenderResult } from "@testing-library/react-hooks"

import { UseFormResult, useForm } from "./useForm"

describe("useForm", () => {
    let result: RenderResult<UseFormResult<{ firstName: string; lastName: string }>>
    const submitMockFunction = jest.fn()
    const completeMockFunction = jest.fn()

    beforeEach(() => {
        result = renderHook(() =>
            useForm({
                initialInputs: { firstName: "", lastName: "" },
                validate: (newInputs) => {
                    const errors: ErrorsObject<typeof newInputs> = {}

                    if (!newInputs.firstName) {
                        errors.firstName = "Please enter your first name."
                    }

                    if (!newInputs.lastName) {
                        errors.lastName = "Please enter your last name."
                    }

                    return errors
                },
                submit: async (newInputs) => {
                    const { data, error } = submitMockFunction({ inputs: newInputs })

                    if (!data || error) {
                        return { nonFieldError: "Non field error" }
                    }

                    return {}
                },
                complete: () => {
                    completeMockFunction()
                },
            })
        ).result
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test("should initialise form result", () => {
        expect(result.current.inputs).toEqual({ firstName: "", lastName: "" })
        expect(result.current.errors).toEqual({})
        expect(result.current.touched).toEqual({})
        expect(result.current.onSubmitLoading).toEqual(false)
    })

    describe("onChange", () => {
        test("should set and validate inputs", () => {
            act(() => result.current.onChange({ firstName: "John", lastName: "" }))

            expect(result.current.inputs).toEqual({ firstName: "John", lastName: "" })
            expect(result.current.errors).toEqual({ lastName: "Please enter your last name." })
        })
    })

    describe("onBlur", () => {
        test("should set given field to touched", () => {
            act(() => result.current.onBlur("firstName"))

            expect(result.current.touched).toEqual({ firstName: true })
        })
    })

    describe("onSubmit", () => {
        test("should not execute submit function if there are field errors", async () => {
            await act(async () => result.current.onSubmit())

            expect(result.current.errors).toEqual({
                firstName: "Please enter your first name.",
                lastName: "Please enter your last name.",
            })
            expect(submitMockFunction).not.toHaveBeenCalled()
        })

        test("should not execute complete function if there are submit errors from submit function", async () => {
            submitMockFunction.mockReturnValue({ data: null, error: "Non field error" })

            act(() => result.current.onChange({ firstName: "John", lastName: "Doe" }))
            await act(async () => result.current.onSubmit())

            expect(result.current.errors).toEqual({ nonFieldError: "Non field error" })
            expect(submitMockFunction).toHaveBeenCalledTimes(1)
            expect(completeMockFunction).not.toHaveBeenCalled()
        })

        test("should execute submit and complete functions if there are no errors", async () => {
            submitMockFunction.mockReturnValue({ data: {}, error: null })

            act(() => result.current.onChange({ firstName: "John", lastName: "Doe" }))
            await act(async () => result.current.onSubmit())

            expect(result.current.errors).toEqual({})
            expect(submitMockFunction).toHaveBeenCalledTimes(1)
            expect(completeMockFunction).toHaveBeenCalledTimes(1)
        })
    })
})
