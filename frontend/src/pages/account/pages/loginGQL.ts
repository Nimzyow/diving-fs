import { gql } from "@apollo/client"

gql`
    mutation login($loginEmail: String!, $loginPassword: String!, $loginPasswordConfirm: String!) {
        login(email: $loginEmail, password: $loginPassword, passwordConfirm: $loginPasswordConfirm) {
            token
            errors {
                code
                message
            }
        }
    }
`
