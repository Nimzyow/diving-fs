import React from "react"

import { ApolloError } from "@apollo/client"
import { Form, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import { useCreateUserMutation } from "../../../generated/graphql"
import { useAuth } from "../../../hooks/useAuth"
import { useForm } from "../../../hooks/useForm"

export const Register = () => {
    const { userRefetch } = useAuth()
    const history = useHistory()
    const [createUser] = useCreateUserMutation()
    const { inputs, onSubmit, onChange, errors, touched } = useForm({
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
            if (newInputs.password.length < 5) {
                errors.password = "Password must be a minimum of 5 characters long."
            }
            return errors
        },
        submit: async () => {
            try {
                const { data } = await createUser({
                    variables: {
                        inputs: {
                            name: inputs.name,
                            handle: inputs.handle,
                            email: inputs.email,
                            password: inputs.password,
                        },
                    },
                })

                if (data?.createUser?.createUserError?.__typename === "EmailValidationError") {
                    const message = data.createUser.createUserError.message as string
                    return { email: message }
                }
                if (data?.createUser?.createUserError?.__typename === "HandleValidationError") {
                    const message = data.createUser.createUserError.message as string
                    return { handle: message }
                }
                if (data?.createUser?.token) {
                    localStorage.setItem("token", data.createUser.token)
                }

                return {}
            } catch (error: unknown) {
                if (error instanceof ApolloError) {
                    if (error.graphQLErrors[0].message.includes("email")) {
                        return { email: error.graphQLErrors[0].message }
                    } else if (error.graphQLErrors[0].message.includes("handle")) {
                        return { handle: error.graphQLErrors[0].message }
                    }
                }
                return {
                    nonFieldError: "Something went wrong. Please try refreshing the page and try again.",
                }
            }
        },
        complete: () => {
            if (Object.keys(errors).length === 0) {
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
                    {touched.password && errors.password && (
                        <p className="text-danger label-text mb-0 mt-2">{errors.password}</p>
                    )}
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
                    {touched.passwordConfirm && errors.passwordConfirm && (
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
