import { objectType } from "nexus"

export const Post = objectType({
    name: "Post",
    definition(t) {
        t.string("id"),
            t.string("body"),
            t.date("createdAt"),
            t.date("updatedAt"),
            t.nonNull.string("authorId"),
            t.field("author", {
                type: "User",
                resolve: async (parent, args, context) => {
                    try {
                        const user = await context.prisma.user.findFirst({
                            where: {
                                id: parent.authorId,
                            },
                        })
                        return user
                    } catch (error) {
                        return null
                    }
                },
            })
    },
})
