import { GraphQLClient, gql } from "graphql-request";
import { endpoint } from "../utils/config";

type CreateArgs = {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
};

type GetListArgs = {
  pagination: {
    page: number;
    perPage: number;
  };
  sort: {
    order: string;
    field: string;
  };
};

type GetOneArgs = {
  id: string;
};

type OptionalCreateUserArgs = Partial<CreateArgs["data"]>;

type Update = {
  id: string;
  data: OptionalCreateUserArgs & { id: string };
  previousData: OptionalCreateUserArgs;
};

type Delete = {
  id: string;
};

const getUserQuery = gql`
  query getUserForAdminUI($id: String!) {
    getUserForAdminUI(id: $id) {
      id
      firstName
      lastName
      email
      role
      createdAt
      updatedAt
    }
  }
`;

const UserFunctions = {
  create: async (params: CreateArgs) => {
    const { data } = params;

    const mutation = gql`
      mutation CreateUserForAdminUI($inputs: CreateUserInputs!) {
        createUserForAdminUI(inputs: $inputs) {
          id
          firstName
          lastName
          email
          role
          createdAt
          updatedAt
        }
      }
    `;

    const variables = {
      inputs: data,
    };

    const client = new GraphQLClient(endpoint, { headers: {} });
    try {
      const response = await client.request<
        { createUserForAdminUI: CreateArgs & { id: string } },
        { inputs: CreateArgs["data"] }
      >(mutation, variables);

      return { data: response.createUserForAdminUI };
    } catch (error) {
      console.log(error);
    }
  },
  getList: async (params: GetListArgs) => {
    const query = gql`
      query allUsersForAdminUI(
        $page: Int!
        $perPage: Int!
        $sortField: String!
        $sortOrder: String!
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
          role
          createdAt
          updatedAt
          address {
            id
          }
        }
        allUsersForAdminUICount
      }
    `;

    const variables = {
      ...params.pagination,
      sortOrder: params.sort.order,
      sortField: params.sort.field,
    };

    const client = new GraphQLClient(endpoint, { headers: {} });
    try {
      const response = await client.request<
        {
          allUsersForAdminUI: (CreateArgs & { id: string })[];
          allUsersForAdminUICount: number;
        },
        typeof variables
      >(query, variables);
      const toReturn = {
        data: response.allUsersForAdminUI,
        total: response.allUsersForAdminUICount,
      };
      return toReturn;
    } catch (error) {
      console.log(error);
    }
  },
  getMany: async (params: { ids: string[] }) => {
    const variables = {
      id: params.ids[0],
    };

    const client = new GraphQLClient(endpoint, { headers: {} });
    try {
      const response = await client.request<
        {
          getUserForAdminUI: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
          };
        },
        { id: string }
      >(getUserQuery, variables);

      return {
        data: [response.getUserForAdminUI],
      };
    } catch (error) {
      console.log(error);
    }
  },
  getOne: async (params: GetOneArgs) => {
    const { id } = params;

    const variables = {
      id: id,
    };

    const client = new GraphQLClient(endpoint, { headers: {} });
    try {
      const response = await client.request<
        {
          getUserForAdminUI: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
          };
        },
        { id: string }
      >(getUserQuery, variables);

      return { data: response.getUserForAdminUI };
    } catch (error) {
      console.log(error);
    }
  },
  update: async (params: Update) => {
    const { id, data } = params;
    const mutation = gql`
      mutation UpdateUserForAdminUI($id: String!, $inputs: UpdateUserInputs!) {
        updateUserForAdminUI(id: $id, inputs: $inputs) {
          id
          firstName
          lastName
          email
          role
          createdAt
          updatedAt
        }
      }
    `;

    const variables = {
      id: id,
      inputs: data,
    };

    const client = new GraphQLClient(endpoint, { headers: {} });
    try {
      const response = await client.request(mutation, variables);

      return { data: response.updateUserForAdminUI };
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (params: Delete) => {
    const { id } = params;

    const mutation = gql`
      mutation DeleteUserForAdminUI($id: String!) {
        deleteUserForAdminUI(id: $id) {
          id
          firstName
          lastName
          email
          role
        }
      }
    `;

    const variables = {
      id: id,
    };

    const client = new GraphQLClient(endpoint, { headers: {} });

    try {
      const response = await client.request<
        { deleteUserForAdminUI: CreateArgs["data"] & { id: string } },
        { id: string }
      >(mutation, variables);

      return { data: response.deleteUserForAdminUI };
    } catch (error) {
      console.log(error);
    }
  },
  deleteMany: async (params: { ids: string[] }) => {
    const { ids } = params;

    const mutation = gql`
      mutation deleteManyUsersForAdminUI($ids: [String!]!) {
        deleteManyUsersForAdminUI(ids: $ids)
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
