import { objectType, enumType } from "nexus"

export const User = objectType({
    name: "User",
    definition(t) {
        t.model.id(),
            t.model.firstName(),
            t.model.lastName(),
            t.model.email(),
            t.model.isSuperUser(),
            t.model.role()
    },
})

export const Token = objectType({
    name: "Token",
    definition(t) {
        t.string("token")
    },
})

export const Role = enumType({
    name: "Role",
    members: ["USER", "STAFF", "ADMIN", "SUPER_USER"],
})
