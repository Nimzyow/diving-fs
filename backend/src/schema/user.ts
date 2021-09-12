import { objectType } from "nexus"

export const User = objectType({
    name: "User",
    definition(t) {
        t.model.id(), t.model.firstName(), t.model.lastName(), t.model.email(), t.model.isSuperUser()
    },
})

export const Token = objectType({
    name: "Token",
    definition(t) {
        t.string("token")
    },
})
