import React from "react"

import { Form, Button } from "react-bootstrap"

import { useForm } from "../../hooks/useForm"

const AccountContainer = () => {
    const { inputs, errors, onSubmit, onChange } = useForm({
        initialInputs: {
            email: "",
            password: "",
        },
        submit: async () => {
            console.log(inputs)
            return {}
        },
    })

    return (
        <div
            className="w-100 d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >
            <div
                style={{
                    border: "2px solid black",
                    borderRadius: "15px",
                    minWidth: 300,
                    maxWidth: 300,
                    minHeight: 300,
                }}
                className="p-3"
            >
                <h2>Log in</h2>
                <Form>
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
                    <Button variant="primary" onClick={() => onSubmit()}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default AccountContainer
