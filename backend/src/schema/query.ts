import { extendType } from "nexus"

export const Query = extendType({
    type: "Query",
    definition(t) {
        t.field("me", {
            type: "User",
            resolve: async (parent, args, context) => {
                if (!context.user) {
                    return null
                }
                try {
                    const user = await context.prisma.user.findUnique({
                        where: {
                            id: context.user.id,
                        },
                    })
                    return user
                } catch (error) {
                    console.log(error)
                    return null
                }
            },
        })
    },
})
