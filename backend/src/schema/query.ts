import { objectType } from "nexus"

export const Query = objectType({
    name: "Query",
    definition(t) {
        t.field("hello", {
            type: "String",
            resolve: () => {
                return "World"
            },
        })
        t.field("user", {
            type: "User",
            resolve: () => {
                return { id: "1", name: "Nima" }
            },
        })
    },
})
