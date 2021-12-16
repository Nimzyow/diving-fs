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
        })
    },
})
