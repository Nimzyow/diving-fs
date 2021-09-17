import jwt from "jsonwebtoken";
import { ApolloServer, gql } from "apollo-server";
import { schema } from "../src/server";
import prisma from "../src/db";

const CREATE_USER = gql`
  mutation Mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      errors {
        message
        code
      }
    }
  }
`;

const server = new ApolloServer({
  schema,
  context: {
    prisma: prisma,
  },
});

describe("User", () => {
  it("can be created", async () => {
    const sign = jest.spyOn(jwt, "sign");
    sign.mockImplementation(() => () => "signed");

    // ! define return type and send it as a generic inside request
    // Create a new user
    const createUserResult = await server.executeOperation({
      query: CREATE_USER,
      variables: {
        firstName: "Nima",
        lastName: "Soufiani",
        email: "nima@example.com",
        password: "Randompasswordman",
      },
    });

    expect(createUserResult.data).toEqual({
      createUser: { token: "signed", errors: [] },
    });
  });

  it("will throw error with no email, firstName, lastName or password", async () => {
    const sign = jest.spyOn(jwt, "sign");
    sign.mockImplementation(() => () => "signed");

    // ! define return type and send it as a generic inside request
    // Create a new user
    const createUserResult = await server.executeOperation({
      query: CREATE_USER,
      variables: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    });

    expect(createUserResult.data).toEqual({
      createUser: {
        token: null,
        errors: [
          { code: "INVALID_INPUTS", message: "Please enter valid inputs" },
        ],
      },
    });
  });
});
