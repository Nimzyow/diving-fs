import { gql } from "@apollo/client"

gql`
    mutation createUser($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
        createUser(email: $email, firstName: $firstName, lastName: $lastName, password: $password) {
            errors {
                code
                message
            }
            token
        }
    }
`