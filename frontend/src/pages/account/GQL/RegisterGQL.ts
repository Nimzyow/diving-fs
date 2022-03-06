import { gql } from "@apollo/client"

export const CreateUser = gql`
    mutation CreateUser($inputs: CreateUserInputs!) {
        createUser(inputs: $inputs) {
            token
            createUserError {
                ... on UserError {
                    field
                    message
                    __typename
                }
            }
        }
    }
`
