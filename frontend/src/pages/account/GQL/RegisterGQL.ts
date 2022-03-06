import { gql } from "@apollo/client"

export const CreateUser = gql`
    mutation CreateUser($inputs: CreateUserInputs!) {
        createUser(inputs: $inputs) {
            token
            createUserErrors {
                ... on UserError {
                    field
                    message
                    __typename
                }
            }
        }
    }
`
