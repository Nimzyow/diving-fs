import { gql } from "@apollo/client"

export const CREATE_POST = gql`
    mutation CreatePost($CreatePostInputs: CreatePostInputs!) {
        createPost(inputs: $CreatePostInputs) {
            post {
                id
                body
                createdAt
                updatedAt
            }
            createPostError {
                field
                message
            }
        }
    }
`
