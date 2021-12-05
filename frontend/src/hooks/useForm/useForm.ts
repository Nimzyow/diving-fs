import { useState } from "react"

import _ from "lodash"

export type UseFormResult<Inputs> = {
    inputs: Inputs
    errors: ErrorsObject<Inputs>
    touched: Partial<Record<keyof Inputs, boolean>>
    onSubmitLoading: boolean
    onChange: (newInputs: Partial<Inputs>) => void
    onBlur: (key: keyof Inputs) => void
    onSubmit: (submitButtonInputs?: Partial<Inputs>) => Promise<void>
    setErrors: React.Dispatch<React.SetStateAction<ErrorsObject<Inputs>>>
    setTouched: React.Dispatch<React.SetStateAction<Partial<Record<keyof Inputs, boolean>>>>
}

type Props<Inputs> = {
    initialInputs: Inputs
    validate?: (newInputs: Inputs) => ErrorsObject<Inputs>
    submit?: (newInputs: Inputs) => Promise<ErrorsObject<Inputs>>
    complete?: () => void
}

export function useForm<Inputs>(props: Props<Inputs>): UseFormResult<Inputs> {
    const {
        initialInputs,
        validate = () => ({}),
        submit = async () => ({}),
        complete = () => undefined,
    } = props

    const [inputs, setInputs] = useState<Inputs>(initialInputs)
    const [errors, setErrors] = useState<ErrorsObject<Inputs>>({})
    const [touched, setTouched] = useState<Partial<Record<keyof Inputs, boolean>>>({})
    const [onSubmitLoading, setOnSubmitLoading] = useState(false)

    const onChange = (newInputs: Partial<Inputs>): void => {
        setInputs((prevInputs) => {
            setErrors((prevErrors) => {
                const { nonFieldError } = prevErrors
                const fieldErrors = validate({ ...prevInputs, ...newInputs })
                return nonFieldError ? { ...fieldErrors, nonFieldError } : fieldErrors
            })
            return { ...prevInputs, ...newInputs }
        })
    }

    const onBlur = (key: keyof Inputs): void => {
        setTouched((prevTouched) => ({ ...prevTouched, [key]: true }))
    }

    const onSubmit = async (submitButtonInputs?: Partial<Inputs>): Promise<void> => {
        const newInputs = { ...inputs, ...submitButtonInputs }
        submitButtonInputs && setInputs(newInputs)

        const fieldErrors = validate(newInputs)
        setErrors(fieldErrors)

        if (!_.isEmpty(fieldErrors)) {
            setTouched(_.mapValues(fieldErrors, () => true))
            return
        }

        if (submit) {
            setOnSubmitLoading(true)
            const submitErrors = await submit(newInputs)
            setOnSubmitLoading(false)

            if (!_.isEmpty(submitErrors)) {
                setErrors(submitErrors)
                return
            }
        }

        complete()
    }

    return {
        inputs,
        errors,
        touched,
        onSubmitLoading,
        onChange,
        onBlur,
        onSubmit,
        setErrors,
        setTouched,
    }
}
