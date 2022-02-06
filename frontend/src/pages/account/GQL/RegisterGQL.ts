import { gql } from "@apollo/client"

export const CreateUser = gql`
    mutation CreateUser($inputs: CreateUserInputs!) {
        createUser(inputs: $inputs) {
            token
        }
    }
`
