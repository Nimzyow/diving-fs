import { GraphQLClient, gql } from "graphql-request"
// import { endpoint } from "../utils/config"
const UserFunctions = {
    getList: async (params: any) => {
        // const query = gql`
        //     query allUsersForAdminUI($page: Int, $perPage: Int, $sortField: String, $sortOrder: String) {
        //         allUsersForAdminUI(
        //             page: $page
        //             perPage: $perPage
        //             sortField: $sortField
        //             sortOrder: $sortOrder
        //         ) {
        //             _id
        //             firstName
        //             lastName
        //             email
        //             role
        //             hidden
        //         }
        //         _allUsersMeta {
        //             count
        //         }
        //     }
        // `

        // const variables = {
        //     ...params.pagination,
        //     sortOrder: params.sort.order,
        //     sortField: params.sort.field === "id" ? "_id" : params.sort.field,
        // }

        // const client = new GraphQLClient(endpoint, { headers: {} })
        // try {
        //     const response = await client.request(query, variables)

        //     const changeId = response.allUsersForAdminUI.map((element, index) => {
        //         let newId = element._id
        //         delete element._id
        //         element.id = newId
        //         return element
        //     })
        // const toReturn = { data: changeId, total: response._allUsersMeta.count }
        // return toReturn
        const toReturn = { data: [{ id: "1", firstName: "someone", lastName: "asdasd" }], total: 4 }
        return toReturn
        // } catch (error) {
        //     console.log(error)
        // }
    },
}

export default UserFunctions
