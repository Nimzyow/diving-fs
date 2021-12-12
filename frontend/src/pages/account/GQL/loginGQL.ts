import { gql } from "@apollo/client"

gql`
    mutation login($loginEmail: String!, $loginPassword: String!) {
        login(email: $loginEmail, password: $loginPassword) {
            token
            errors {
                code
                message
            }
        }
    }
`
