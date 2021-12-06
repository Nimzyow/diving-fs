import { useMeQuery } from "../../generated/graphql"

export const useAuth = () => {
    const { data: userData, loading: userLoading, error: userError } = useMeQuery()

    return {
        userData: userData?.me,
        userError,
        userLoading,
    }
}
