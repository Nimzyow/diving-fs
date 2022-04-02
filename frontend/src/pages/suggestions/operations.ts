import { gql } from "@apollo/client"

export const GET_USER_SUGGESTIONS = gql`
    query getUserSuggestions {
        userSuggestions {
            id
            name
        }
    }
`

// export const FOLLOW_USER = gql`
//     mutation FollowUser($userId: String!) {
//         followUser(userId: $userId) {
//             id
//             user {
//                 id
//                 name
//             }
//         }
//     }
// `
