import { objectType, list, nonNull } from "nexus"

export const Follow = objectType({
    name: "Follow",
    definition(t) {
        t.nonNull.string("followingId"),
            t.nonNull.string("followerId"),
            t.field("following", {
                type: nonNull(list(nonNull("User"))),
                resolve: async (parent, args, context) => {
                    return context.prisma.user.findMany({
                        where: {
                            id: parent.followingId,
                        },
                    })
                },
            })
    },
})
