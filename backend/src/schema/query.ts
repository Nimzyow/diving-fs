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
            }),
            t.field("userSuggestions", {
                type: nonNull(list(nonNull("User"))),
                resolve: async (parent, args, context) => {
                    if (!context.user) {
                        return []
                    }
                    try {
                        return await context.prisma.user.findMany({
                            where: {
                                NOT: {
                                    id: context.user.id,
                                },
                            },
                        })
                    } catch (error) {
                        console.log(error)
                        return []
                    }
                },
            }),
            t.field("followerStatus", {
                type: nonNull(list(nonNull("Follow"))),
                resolve: async (parent, args, context) => {
                    if (!context.user) {
                        return []
                    }
                    try {
                        return await context.prisma.follows.findMany({
                            where: {
                                followerId: context.user.id,
                            },
                        })
                    } catch (error) {
                        console.log(error)
                        return []
                    }
                },
            })
    },
})
