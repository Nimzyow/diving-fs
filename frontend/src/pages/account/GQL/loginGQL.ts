import { gql } from "@apollo/client"

gql`
    mutation login($inputs: LoginUserInputs!) {
        login(inputs: $inputs) {
            token
            errors {
                code
                message
            }
        }
    }
`
