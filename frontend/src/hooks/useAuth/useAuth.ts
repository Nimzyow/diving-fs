export const useAuth = () => {
    const getUser = () => {
        // this needs to get the token
        // getUser with token from backend
        // if user succesfully returns, return user from function
        const userToken = localStorage.getItem("token")
        if (userToken) {
            return {
                firstName: "Nima",
                isEmailVerified: true,
            }
        } else {
            null
        }
    }

    return {
        getUser: getUser(),
    }
}
