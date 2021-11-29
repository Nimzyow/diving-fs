import { GraphQLClient, gql } from "graphql-request";
import {
  Address,
  QueryGetUserAddressForAdminUiArgs,
  Query,
} from "../generated/graphql";
import { endpoint } from "../utils/config";

type CreateArgs = {
  data: {
    line1: string;
    line2: string;
    postcode: string;
    country: string;
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

type OptionalCreateAddressArgs = Partial<CreateArgs["data"]>;

type Update = {
  id: string;
  data: OptionalCreateAddressArgs & { id: string };
  previousData: OptionalCreateAddressArgs;
};

type Delete = {
  id: string;
};

const AddressFunctions = {
  create: async (params: CreateArgs) => {},
  getList: async (params: GetListArgs) => {
    const query = gql`
      query allUsersAddressesForAdminUI(
        $page: Int!
        $perPage: Int!
        $sortField: String!
        $sortOrder: String!
      ) {
        allUsersAddressesForAdminUI(
          page: $page
          perPage: $perPage
          sortField: $sortField
          sortOrder: $sortOrder
        ) {
          id
          line1
          line2
          county
          postcode
          country
          createdAt
          updatedAt
          userId
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
      const response = await client.request<
        {
          allUsersAddressesForAdminUI: (CreateArgs & { id: string })[];
          allUsersAddressesForAdminUICount: number;
        },
        typeof variables
      >(query, variables);

      const toReturn = {
        data: response.allUsersAddressesForAdminUI,
        total: 1,
      };
      return toReturn;
    } catch (error) {
      console.log(error);
    }
  },
  // getMany: async (params: { ids: { id: string }[] }) => {
  //   console.log(params);

  //   const query = gql`
  //     query GetUserAddressForAdminUI($id: String!) {
  //       getUserAddressForAdminUI(id: $id) {
  //         id
  //         line1
  //         line2
  //         county
  //         postcode
  //         country
  //         createdAt
  //         updatedAt
  //         userId
  //       }
  //     }
  //   `;

  //   const variables = {
  //     id: params.ids[0].id,
  //   };

  //   const client = new GraphQLClient(endpoint, { headers: {} });

  //   const response = await client.request<
  //     { getUserAddressForAdminUI: Address },
  //     QueryGetUserAddressForAdminUiArgs
  //   >(query, variables);

  //   console.log({ data: [{ id: "ckwb7l1rl00154sn1d98qs17r", line1: "hi" }] });

  //   return { data: [{ id: "ckwb7l1rl00154sn1d98qs17r", postcode: "hi" }] };
  // },
  getOne: async (params: GetOneArgs) => {
    const { id } = params;
    console.log(params);
    const variables = {
      id: id,
    };

    const getUserQuery = gql`
      query getUserAddressForAdminUI($id: String!) {
        getUserAddressForAdminUI(id: $id) {
          id
          line1
          line2
          county
          postcode
          country
          userId
          createdAt
          updatedAt
        }
      }
    `;

    const client = new GraphQLClient(endpoint, { headers: {} });

    try {
      const response = await client.request<
        {
          getUserAddressForAdminUI: {
            id: string;
            line1: string;
            line2: string;
            county: string;
            postcode: string;
            country: string;
            userId: string;
            createdAt: string;
            updatedAt: string;
          };
        },
        { id: string }
      >(getUserQuery, variables);
      console.log(response);
      return { data: response.getUserAddressForAdminUI };
    } catch (error) {
      console.log(error);
    }
  },
  update: async (params: Update) => {},
  delete: async (params: Delete) => {
    const { id } = params;

    const mutation = gql`
      mutation DeleteUserAddressForAdminUI($id: String!) {
        deleteUserAddressForAdminUI(id: $id) {
          id
          line1
          line2
          county
          postcode
          country
          userId
          createdAt
          updatedAt
        }
      }
    `;

    const variables = {
      id: id,
    };

    const client = new GraphQLClient(endpoint, { headers: {} });

    try {
      const response = await client.request<
        { deleteUserAddressForAdminUI: CreateArgs["data"] & { id: string } },
        { id: string }
      >(mutation, variables);

      return { data: response.deleteUserAddressForAdminUI };
    } catch (error) {
      console.log(error);
    }
  },
  deleteMany: async (params: { id: string[] }) => {},
};

export default AddressFunctions;
