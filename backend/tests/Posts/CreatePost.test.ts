import { Prisma } from "@prisma/client"
import { ApolloServer, gql } from "apollo-server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { makeSchema } from "nexus"

import * as types from "../../src/schema/index"
import { prismaMock } from "../singleton"
// import { Post } from ".prisma/client"

// const CREATE_POST = gql`
//     mutation CreatePost($inputs: CreatePostInputs!) {
//         createPost(inputs: $inputs) {
//             errors {
//                 code
//                 message
//             }
//         }
//     }
// `

test("should first", () => {
    expect(1 + 1).toBe(2)
})
