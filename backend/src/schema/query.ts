import { extendType, list, stringArg, intArg, nonNull } from "nexus"
import bcrypt from "bcryptjs"
import { prisma } from ".prisma/client"

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
                    return context.prisma.user.findMany({})
                },
            }),
            t.field("allUsersForAdminUI", {
                type: list("User"),
                args: {
                    page: nonNull(intArg()),
                    perPage: nonNull(intArg()),
                    sortField: nonNull(stringArg()),
                    sortOrder: nonNull(stringArg()),
                },
                resolve: async (parent, args, context) => {
                    const allUsers = await context.prisma.user.findMany({
                        skip: args.page - 1,
                        take: args.perPage - 1,
                        orderBy: {
                            [args.sortField]: args.sortOrder.toLowerCase(),
                        },
                    })
                    return allUsers
                },
            }),
            t.field("allUsersAddressesForAdminUI", {
                type: list("Address"),
                args: {
                    page: nonNull(intArg()),
                    perPage: nonNull(intArg()),
                    sortField: nonNull(stringArg()),
                    sortOrder: nonNull(stringArg()),
                },
                resolve: async (parent, args, context) => {
                    const allAddresses = await context.prisma.address.findMany({
                        skip: args.page - 1,
                        take: args.perPage - 1,
                        orderBy: {
                            [args.sortField]: args.sortOrder.toLowerCase(),
                        },
                    })
                    return allAddresses
                },
            }),
            t.field("allUsersForAdminUICount", {
                type: "Int",
                resolve: async (parent, args, context) => {
                    const userCount = await context.prisma.user.count()
                    return userCount
                },
            })
        t.field("getUserForAdminUI", {
            type: "User",
            args: {
                id: nonNull(stringArg()),
            },
            resolve: async (parent, args, context) => {
                const { id } = args
                const user = await context.prisma.user.findUnique({
                    where: {
                        id,
                    },
                })
                if (user) return user
                return null
            },
        })
        t.field("getUserAddressForAdminUI", {
            type: "Address",
            args: {
                id: nonNull(stringArg()),
            },
            resolve: async (parent, args, context) => {
                const { id } = args
                const address = await context.prisma.address.findUnique({
                    where: {
                        id,
                    },
                })
                if (address) return address
                return null
            },
        })
    },
})
