import { objectType } from "nexus"

export const Error = objectType({
    name: "Error",
    definition(t) {
        t.nonNull.string("code"), t.nonNull.string("message")
    },
})

export const Success = objectType({
    name: "Success",
    definition(t) {
        t.nonNull.boolean("success")
    },
})
