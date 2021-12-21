import { gql } from "@apollo/client"

gql`
    query Me {
        me {
            id
            name
            handle
            email
            createdAt
            updatedAt
        }
    }
`
