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
    const { inputs, onSubmit, onChange } = useForm({
        initialInputs: {
            firstName: "hello",
            lastName: "friend",
            email: "hellofriend1@example.com",
            password: "ENOshima12?",
            passwordConfirm: "ENOshima12?",
        },
        submit: async () => {
            try {
                const result = await createUser({
                    variables: {
                        firstName: inputs.firstName,
                        lastName: inputs.lastName,
                        email: inputs.email,
                        password: inputs.password,
                    },
                })
                if (result.data?.createUser?.errors && result.data?.createUser?.errors.length > 0) {
                    return { nonFieldError: "Something went wrong" }
                }

                if (result.data?.createUser?.token) {
                    localStorage.setItem("token", result.data.createUser.token)
                } else {
                    return { nonFieldError: "Token was not found in data" }
                }
            } catch (error) {
                return { nonFieldError: "Something went wrong" }
            }
            return {}
        },
        complete: () => {
            userRefetch()
            history.push("/")
        },
    })
    return (
        <div>
            <h2>Register</h2>
            <Form className="mb-3">
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="First name"
                        value={inputs.firstName}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            onChange({ firstName: event.target.value })
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Last name"
                        value={inputs.lastName}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            onChange({ lastName: event.target.value })
                        }}
                    />
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
                <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                    <Form.Label>Password confirm</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password confirmation"
                        value={inputs.passwordConfirm}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            onChange({ passwordConfirm: event.target.value })
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
