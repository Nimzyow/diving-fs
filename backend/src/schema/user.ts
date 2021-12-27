import { objectType, enumType } from "nexus"

export const User = objectType({
    name: "User",
    definition(t) {
        t.string("id"),
            t.string("name"),
            t.string("email"),
            t.string("handle"),
            t.field("role", { type: "Role" }),
            t.date("createdAt"),
            t.date("updatedAt")
    },
})

export const Token = objectType({
    name: "Token",
    definition(t) {
        t.string("token"),
            t.nonNull.list.nonNull.field("errors", {
                type: "Error",
            })
    },
})

export const Role = enumType({
    name: "Role",
    members: ["USER", "STAFF", "ADMIN", "SUPER_USER"],
})
