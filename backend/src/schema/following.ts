import { objectType } from "nexus"

export const Following = objectType({
    name: "Following",
    definition(t) {
        t.nonNull.string("id"),
            t.field("user", {
                type: "User",
                resolve: async (parent, args, context) => {
                    const following = await context.prisma.following.findFirst({
                        where: {
                            id: parent.id,
                        },
                    })

                    const userId = following?.userId

                    const user = await context.prisma.user.findFirst({
                        where: {
                            id: userId,
                        },
                    })

                    return user
                },
            })
    },
})
