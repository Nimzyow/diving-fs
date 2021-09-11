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
            resolve: (parent, args, context) => {
                return { id: "1", name: "Nima" }
            },
        })
    },
})
