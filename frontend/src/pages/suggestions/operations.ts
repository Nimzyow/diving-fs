import { gql } from "@apollo/client"

export const GET_USER_SUGGESTIONS = gql`
    query getUserSuggestions {
        userSuggestions {
            id
            name
        }
    }
`
