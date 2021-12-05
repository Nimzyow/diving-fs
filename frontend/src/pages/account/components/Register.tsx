import React from "react"

import { Form, Button } from "react-bootstrap"

import { useCreateUserMutation } from "../../../generated/graphql"
import { useForm } from "../../../hooks/useForm"

export const Register = () => {
    const [createUser, { data, loading, error }] = useCreateUserMutation()
    const { inputs, onSubmit, onChange } = useForm({
        initialInputs: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
        submit: async () => {
            console.log(inputs)
            createUser({
                variables: {
                    firstName: inputs.firstName,
                    lastName: inputs.lastName,
                    email: inputs.email,
                    password: inputs.password,
                },
            })
            return {}
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
