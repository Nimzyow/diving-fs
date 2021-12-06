import { gql } from "@apollo/client"

gql`
    query Me {
        me {
            id
            firstName
            lastName
            email
        }
    }
`
