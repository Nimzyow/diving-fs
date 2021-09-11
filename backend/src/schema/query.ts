import { objectType } from "nexus"

export const Query = objectType({
    name: "Query",
    definition(t) {
        t.nonNull.field("hello", {
            type: "String",
            resolve: () => {
                return "World"
            },
        })
        t.field("user", {
            type: "User",
            resolve: async (parent, args, context) => {
                // return { id: "1", firstName: "Nima", lastName: "adsad", email: "n_soufiani@hotmail.com" }
                try {
                    const result = context.prisma.user.findUnique({
                        where: {
                            id: 1,
                        },
                    })
                    return result
                } catch (error) {
                    console.log(error)
                }
                return null
            },
        })
    },
})
