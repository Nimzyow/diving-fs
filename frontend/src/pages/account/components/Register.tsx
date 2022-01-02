import React from "react"

import { Form, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import { useCreateUserMutation } from "../../../generated/graphql"
import { useAuth } from "../../../hooks/useAuth"
import { useForm } from "../../../hooks/useForm"

export const Register = () => {
    const { userRefetch } = useAuth()
    const history = useHistory()
    const [createUser] = useCreateUserMutation()
    const { inputs, onSubmit, onChange, setErrors, errors } = useForm({
        initialInputs: {
            name: "",
            handle: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
        validate: (newInputs) => {
            const errors: ErrorsObject<typeof newInputs> = {}

            if (newInputs.password !== newInputs.passwordConfirm) {
                errors.passwordConfirm = "Password and password confirmation do not match."
            }
            return errors
        },
        submit: async () => {
            try {
                const result = await createUser({
                    variables: {
                        inputs: {
                            name: inputs.name,
                            handle: inputs.handle,
                            email: inputs.email,
                            password: inputs.password,
                        },
                    },
                })
                if (result.data?.createUser?.errors && result.data?.createUser?.errors.length > 0) {
                    if (result.data?.createUser.errors[0].code === "EMAIL_TAKEN") {
                        setErrors({
                            email: result.data?.createUser.errors[0].message,
                        })
                        return {}
                    } else if (result.data?.createUser.errors[0].code === "HANDLE_TAKEN") {
                        setErrors({
                            handle: result.data.createUser.errors[0].message,
                        })
                        return {}
                    }
                }

                if (result.data?.createUser?.token) {
                    localStorage.setItem("token", result.data.createUser.token)
                } else {
                    return { nonFieldError: "Token was not found in data" }
                }
            } catch (error) {
                return {
                    nonFieldError: "Something went wrong. Please try refreshing the page and try again.",
                }
            }
            return {}
        },
        complete: () => {
            if (errors === {}) {
                userRefetch()
                history.push("/")
            }
        },
    })
    return (
        <div>
            <h2>Register</h2>
            <Form className="mb-3">
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Your name</Form.Label>
                    <Form.Control
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={inputs.name}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            onChange({ name: event.target.value })
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicHandle">
                    <Form.Label>Your handle</Form.Label>
                    <Form.Control
                        type="text"
                        name="handle"
                        placeholder="Handle"
                        value={inputs.handle}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            onChange({ handle: event.target.value })
                        }}
                    />
                    {errors.handle && (
                        <p className="text-danger label-text mb-0 mt-2">{errors.handle}</p>
                    )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={inputs.email}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            onChange({ email: event.target.value })
                        }}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    {errors.email && <p className="text-danger label-text mb-0 mt-2">{errors.email}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={inputs.password}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            onChange({ password: event.target.value })
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                    <Form.Label>Password confirm</Form.Label>
                    <Form.Control
                        name="passwordConfirm"
                        type="password"
                        placeholder="Password confirmation"
                        value={inputs.passwordConfirm}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            onChange({ passwordConfirm: event.target.value })
                        }}
                    />
                    {errors.passwordConfirm && (
                        <p className="text-danger label-text mb-0 mt-2">{errors.passwordConfirm}</p>
                    )}
                </Form.Group>
                <Button variant="primary" onClick={() => onSubmit()}>
                    Submit
                </Button>
                {errors.nonFieldError && (
                    <p className="text-danger label-text mb-0 mt-2">{errors.nonFieldError}</p>
                )}
            </Form>
        </div>
    )
}
