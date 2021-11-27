import { GraphQLClient, gql } from "graphql-request";
import { endpoint } from "../utils/config";
const UserFunctions = {
  create: async (params) => {
    const { data } = params;

    const mutation = gql`
      mutation createUserForAdminUI($data: UserInputForAdmin!) {
        createUserForAdminUI(input: $data) {
          _id
          firstName
          lastName
          email
        }
      }
    `;

    const variables = {
      data: data,
    };

    const client = new GraphQLClient(endpoint, { headers: {} });
    try {
      const response = await client.request(mutation, variables);

      // let newId = response.createUserForAdminUI._id
      // delete response.createUserForAdminUI._id
      // response.createUserForAdminUI.id = newId

      return { data: response.createUserForAdminUI };
    } catch (error) {
      console.log(error);
    }
  },
  getList: async (params) => {
    const query = gql`
      query allUsersForAdminUI(
        $page: Int
        $perPage: Int
        $sortField: String
        $sortOrder: String
      ) {
        allUsersForAdminUI(
          page: $page
          perPage: $perPage
          sortField: $sortField
          sortOrder: $sortOrder
        ) {
          id
          firstName
          lastName
          email
        }
      }
    `;

    const variables = {
      ...params.pagination,
      sortOrder: params.sort.order,
      sortField: params.sort.field,
    };

    const client = new GraphQLClient(endpoint, { headers: {} });
    try {
      const response = await client.request(query, variables);
      const toReturn = {
        data: response.allUsersForAdminUI,
        total: 1,
      };
      return toReturn;
    } catch (error) {
      console.log(error);
    }
  },
  getOne: async (params) => {
    const { id } = params;

    const query = gql`
      query getUserForAdminUI($id: String!) {
        getUserForAdminUI(id: $id) {
          _id
          firstName
          lastName
          email
        }
      }
    `;

    const variables = {
      id: id,
    };

    const client = new GraphQLClient(endpoint, { headers: {} });
    try {
      const response = await client.request(query, variables);

      let newId = response.getUserForAdminUI._id;
      delete response.getUserForAdminUI._id;
      response.getUserForAdminUI.id = newId;

      return { data: response.getUserForAdminUI };
    } catch (error) {
      console.log(error);
    }
  },
  update: async (params) => {
    const { id, data } = params;
    delete data.id;

    const mutation = gql`
      mutation updateUserForAdminUI($id: String!, $data: UpdateUserInput!) {
        updateUserForAdminUI(id: $id, data: $data) {
          _id
          firstName
          lastName
          email
        }
      }
    `;

    const variables = {
      id: id,
      data: data,
    };

    const client = new GraphQLClient(endpoint, { headers: {} });
    try {
      const response = await client.request(mutation, variables);

      let newId = response.updateUserForAdminUI._id;
      delete response.updateUserForAdminUI._id;
      response.updateUserForAdminUI.id = newId;

      return { data: response.updateUserForAdminUI };
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (params) => {
    const { id } = params;

    const mutation = gql`
      mutation deleteUser($id: String!) {
        deleteUserForAdminUI(id: $id) {
          _id
          firstName
          lastName
          email
        }
      }
    `;

    const variables = {
      id: id,
    };

    const client = new GraphQLClient(endpoint, { headers: {} });

    try {
      const response = await client.request(mutation, variables);

      let newId = response.updateUserForAdminUI._id;
      delete response.updateUserForAdminUI._id;
      response.updateUserForAdminUI.id = newId;

      return { data: response.updateUserForAdminUI };
    } catch (error) {
      console.log(error);
    }
  },
  deleteMany: async (params) => {
    const { ids } = params;

    const mutation = gql`
      mutation deleteManyUsersForAdminUI($ids: [String]) {
        deleteManyUsersForAdminUI(ids: $ids) {
          successful
        }
      }
    `;

    const variables = {
      ids: ids,
    };

    const client = new GraphQLClient(endpoint, { headers: {} });
    try {
      await client.request(mutation, variables);
      return { data: ids };
    } catch (error) {
      console.log(error);
    }
  },
};

export default UserFunctions;
