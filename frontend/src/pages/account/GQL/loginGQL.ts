import { gql } from "@apollo/client"

export const LoginMutation = gql`
    mutation login($inputs: LoginUserInputs!) {
        login(inputs: $inputs) {
            token
        }
    }
`
