import { useApolloClient } from "@apollo/client"

import { useMeQuery } from "../../generated/graphql"

export const useAuth = () => {
    const client = useApolloClient()
    const { data: userData, loading: userLoading, error: userError, refetch: userRefetch } = useMeQuery()

    const logout = () => {
        localStorage.removeItem("token")
        client.resetStore()
    }

    return {
        userData: userData?.me,
        userError,
        userLoading,
        userRefetch,
        logout,
    }
}
