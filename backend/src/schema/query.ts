import { extendType} from "nexus"

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
