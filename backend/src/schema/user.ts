import { objectType, enumType } from "nexus"

export const User = objectType({
    name: "User",
    definition(t) {
        t.nonNull.string("id"),
            t.nonNull.string("name"),
            t.nonNull.string("email"),
            t.nonNull.string("handle"),
            t.field("role", { type: "Role" }),
            t.list.field("posts", {
                type: "Post",
                resolve: async (parent, args, context) => {
                    try {
                        return context.prisma.post.findMany({
                            where: {
                                authorId: parent.id,
                            },
                        })
                    } catch (error) {
                        return []
                    }
                },
            })
        t.date("createdAt"),
            t.date("updatedAt"),
            t.list.field("diverCertifications", {
                type: "DiverCertification",
                resolve: async (parent, args, context) => {
                    if (!parent.id) {
                        return []
                    }
                    try {
                        const diverCertifications = await context.prisma.diverCertification.findMany({
                            where: {
                                users: {
                                    some: {
                                        id: parent.id,
                                    },
                                },
                            },
                        })
                        return diverCertifications
                    } catch (error) {
                        return null
                    }
                },
            })
    },
})

export const Token = objectType({
    name: "Token",
    definition(t) {
        t.string("token")
    },
})

export const DiverCertification = objectType({
    name: "DiverCertification",
    definition(t) {
        t.string("id"), t.string("name"), t.date("createdAt"), t.date("updatedAt")
    },
})

export const Role = enumType({
    name: "Role",
    members: ["USER", "STAFF", "ADMIN", "SUPER_USER"],
})
