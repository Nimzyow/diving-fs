import { objectType, enumType } from "nexus"

export const User = objectType({
    name: "User",
    definition(t) {
        t.model.id(),
            t.model.firstName(),
            t.model.lastName(),
            t.model.email(),
            t.model.isSuperUser(),
            t.model.role(),
            t.model.createdAt(),
            t.model.updatedAt()
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
