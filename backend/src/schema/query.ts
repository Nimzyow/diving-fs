import { extendType, list, stringArg, intArg } from "nexus"
import bcrypt from "bcryptjs"

export const Query = extendType({
    type: "Query",
    definition(t) {
        t.field("me", {
            type: "User",
            resolve: (parent, args, context) => {
                if (!context.user) {
                    return null
                }
                return context.prisma.user.findUnique({
                    where: {
                        id: context.user.id,
                    },
                })
            },
        }),
            t.list.nonNull.field("users", {
                type: "User",
                resolve: (parent, args, context) => {
                    return context.prisma.user.findMany()
                },
            }),
            t.field("allUsersForAdminUI", {
                type: list("User"),
                args: {
                    page: intArg(),
                    perPage: intArg(),
                    sortField: stringArg(),
                    sortOrder: stringArg(),
                },
                resolve: async (parent, args, context) => {
                    const allUsers = await context.prisma.user.findMany()
                    return allUsers
                },
            })
    },
})
