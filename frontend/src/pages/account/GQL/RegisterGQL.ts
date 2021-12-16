import { gql } from "@apollo/client"

gql`
    mutation CreateUser($inputs: CreateUserInputs!) {
        createUser(inputs: $inputs) {
            errors {
                code
                message
            }
            token
        }
    }
`
