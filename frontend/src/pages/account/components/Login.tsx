import React from "react"

import { Form, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import { useLoginMutation } from "../../../generated/graphql"
import { useAuth } from "../../../hooks/useAuth"
import { useForm } from "../../../hooks/useForm"

export const Login = () => {
    const { userRefetch } = useAuth()
    const [loginUser] = useLoginMutation()
    const history = useHistory()
    const { inputs, onSubmit, onChange, errors } = useForm({
        initialInputs: {
            email: "",
            password: "",
        },
        validate: (newInputs) => {
            const errors: ErrorsObject<typeof newInputs> = {}
            if (!newInputs.email.match(/.+@.+\..+/)) {
                errors.email = "Please enter a valid email address."
            }
            if (newInputs.password.length < 5) {
                errors.password = "Password must be a minimum of 5 characters long."
            }
            return errors
        },
        submit: async () => {
            try {
                const result = await loginUser({
                    variables: {
                        inputs,
                    },
                })
                if (result.data?.login.errors && result.data.login.errors.length > 0) {
                    return {
                        nonFieldError: "Something went wrong",
                    }
                }
                if (result.data?.login.token) {
                    localStorage.setItem("token", result.data.login.token)
                    userRefetch()
                }
            } catch (error) {
                return { nonFieldError: "Something went wrong" }
            }
            return {}
        },
        complete: () => {
            history.push("/")
        },
    })
    return (
        <div>
            <h2>Log in</h2>
            <Form className="mb-3">
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
                    {errors.email && <p className="text-danger label-text mb-0 mt-2">{errors.email}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={inputs.password}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            onChange({ password: event.target.value })
                        }}
                    />
                    {errors.password && (
                        <p className="text-danger label-text mb-0 mt-2">{errors.password}</p>
                    )}
                </Form.Group>
                <Button variant="primary" onClick={() => onSubmit()}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}
