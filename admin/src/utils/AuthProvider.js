// import { GraphQLClient, gql } from "graphql-request"

// const endpoint = "http://localhost:4000/"

// const authProvider = {
//     // authentication
//     login: async (params) => {
//         const mutation = gql`
//             mutation loginUserForAdminUI($input: UserLoginInput!) {
//                 loginUserForAdminUI(input: $input) {
//                     token
//                 }
//             }
//         `

//         const variables = {
//             input: { ...params },
//         }

//         const client = new GraphQLClient(endpoint, { headers: {} })

//         try {
//             const response = await client.request(mutation, variables)
//             localStorage.setItem("auth", JSON.stringify(response.loginUserForAdminUI))
//             Promise.resolve()
//         } catch (error) {
//             console.log(error)
//             Promise.reject()
//             // throw new Error("Network error")
//         }
//     },
//     checkError: (error) => {
//         console.log.call("IM IN ERROR PAGE")
//         console.log(error.message)
//         return Promise.reject()
//     },
//     checkAuth: async (params) => {
//         const { token } = JSON.parse(localStorage.getItem("auth"))
//         console.log("checking for auth")
//         const query = gql`
//             query getIdentityForAdminUI {
//                 getIdentityForAdminUI {
//                     _id
//                     firstName
//                     lastName
//                     email
//                     role
//                     hidden
//                 }
//             }
//         `

//         const client = new GraphQLClient(endpoint, { headers: { authorization: token } })

//         try {
//             // steps I need to make
//             // 1) I need to make a query with getUser but I need to send the token as part of the authorization header so:
//             //      authorization: "THIS.IS.MY.TOKEN"

//             const response = await client.request(query)
//             if (response.getIdentityForAdminUI.role !== ("admin" || "super-admin")) {
//                 console.log("Logged out. Not admin or above.")
//                 return Promise.reject()
//             }
//             // 2) a User type will be returned in the response
//             // 3) spread Users into the below JSON
//             console.log("resolved. User is Admin.")
//             return Promise.resolve()
//         } catch (error) {
//             return Promise.reject(error)
//         }
//     },
//     logout: () => {
//         localStorage.removeItem("auth")
//         return Promise.resolve()
//     },
//     getIdentity: async () => {
//         const { token } = JSON.parse(localStorage.getItem("auth"))

//         const query = gql`
//             query getIdentityForAdminUI {
//                 getIdentityForAdminUI {
//                     _id
//                     firstName
//                     lastName
//                     email
//                     role
//                     hidden
//                 }
//             }
//         `

//         const client = new GraphQLClient(endpoint, { headers: { authorization: token } })

//         try {
//             // steps I need to make
//             // 1) I need to make a query with getUser but I need to send the token as part of the authorization header so:
//             //      authorization: "THIS.IS.MY.TOKEN"

//             const response = await client.request(query)
//             if (response.getIdentityForAdminUI.role !== ("admin" || "super-admin")) {
//                 return Promise.reject({ message: "Not authorized" })
//             }
//             // 2) a User type will be returned in the response
//             // 3) spread Users into the below JSON

//             return Promise.resolve({
//                 id: response.getIdentityForAdminUI._id,
//                 fullName: `${response.getIdentityForAdminUI.firstName} ${response.getIdentityForAdminUI.lastName}`,
//             })
//         } catch (error) {
//             return Promise.reject(error)
//         }
//     },
//     // authorization
//     getPermissions: (params) => Promise.resolve(),
// }

// export default authProvider
