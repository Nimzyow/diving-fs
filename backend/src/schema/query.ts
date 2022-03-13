import { extendType, list, nonNull } from "nexus"

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
        }),
            t.field("userRelatedPosts", {
                type: nonNull(list("Post")),
                resolve: async (parent, args, context) => {
                    if (!context.user) {
                        return []
                    }
                    try {
                        const post = await context.prisma.post.findMany({
                            where: {
                                author: context.user,
                            },
                            orderBy: {
                                createdAt: "desc",
                            },
                        })
                        return post
                    } catch (error) {
                        console.log(error)
                        return []
                    }
                },
            })
    },
})
