import { extendType } from "nexus"

export const Query = extendType({
    type: "Query",
    definition(t) {
        t.field("user", {
            type: "User",
            resolve: (parent, args, context) => {
                return context.prisma.user.findUnique({
                    where: {
                        id: 1,
                    },
                })
            },
        }),
            t.nonNull.list.nonNull.field("users", {
                type: "User",
                resolve: (parent, args, context) => {
                    return context.prisma.user.findMany()
                },
            })
    },
})
