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
    const { inputs, onSubmit, onChange } = useForm({
        initialInputs: {
            email: "",
            password: "",
        },
        submit: async () => {
            try {
                const result = await loginUser({
                    variables: {
                        loginEmail: inputs.email,
                        loginPassword: inputs.password,
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
                } else {
                    return {
                        nonFieldError: "Token was not found in data",
                    }
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
                </Form.Group>
                <Button variant="primary" onClick={() => onSubmit()}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}
