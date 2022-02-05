import React from "react"

import { Button, Form } from "react-bootstrap"

import { useForm } from "../../../hooks/useForm"

export const CreatePost = () => {
    const { inputs, errors, onChange } = useForm({
        initialInputs: { post: "" },
    })

    return (
        <Form className="mb-3" data-testid="createPost">
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control
                    name="post"
                    type="text"
                    placeholder="Anything on your mind?"
                    value={inputs.post}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        onChange({ post: event.target.value })
                    }}
                />
                <Button
                    variant="primary"
                    onClick={() => {
                        // do nothing
                    }}
                >
                    Post
                </Button>
            </Form.Group>
        </Form>
    )
}
