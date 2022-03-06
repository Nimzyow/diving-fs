import React from "react"

import { Button, Form } from "react-bootstrap"

import { useCreatePostMutation } from "../../../generated/graphql"
import { useForm } from "../../../hooks/useForm"

export const CreatePost = () => {
    const [createPost, { data, called }] = useCreatePostMutation()

    const { inputs, onChange, onSubmit } = useForm({
        initialInputs: { body: "" },
        submit: async () => {
            try {
                await createPost({
                    variables: {
                        CreatePostInputs: {
                            body: inputs.body,
                        },
                    },
                })
                return {}
            } catch (error) {
                return {
                    nonFieldError: "Something went wrong. Please try refreshing the page and try again.",
                }
            }
        },
    })

    return (
        <Form className="mb-3" data-testid="createPost">
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control
                    name="post"
                    type="text"
                    placeholder="Anything on your mind?"
                    value={inputs.body}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        onChange({ body: event.target.value })
                    }}
                />
                <Button variant="primary" onClick={() => onSubmit()}>
                    Post
                </Button>
                {called && !data?.createPost?.createPostError && <p>Posted!</p>}
                {data?.createPost?.createPostError && (
                    <p style={{ color: "red" }}>{data.createPost.createPostError.message}</p>
                )}
            </Form.Group>
        </Form>
    )
}
