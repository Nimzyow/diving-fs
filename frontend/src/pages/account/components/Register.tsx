import React from "react"

import { Form, Button } from "react-bootstrap"

import { useForm } from "../../../hooks/useForm"

export const Register = () => {
    const { inputs, errors, onSubmit, onChange } = useForm({
        initialInputs: {
            email: "",
            password: "",
            passwordConfirm: "",
        },
        submit: async () => {
            console.log(inputs)
            return {}
        },
    })
    return (
        <div>
            <h2>Register</h2>
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
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password confirm</Form.Label>
                    <Form.Control
                        type="passwordConfirm"
                        placeholder="Password confirmation"
                        value={inputs.passwordConfirm}
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
