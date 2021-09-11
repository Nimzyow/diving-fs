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
                const user = await context.prisma.user.findFirst()
                return user
            },
        })
    },
})
