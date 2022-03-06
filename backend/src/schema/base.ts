import { objectType, unionType, interfaceType } from "nexus"

export const Success = objectType({
    name: "Success",
    definition(t) {
        t.nonNull.boolean("success")
    },
})

export const EmailValidationError = objectType({
    name: "EmailValidationError",
    definition(t) {
        t.implements("UserError")
    },
})
export const HandleValidationError = objectType({
    name: "HandleValidationError",
    definition(t) {
        t.implements("UserError")
    },
})

export const CreateUserError = unionType({
    name: "CreateUserError",
    definition(t) {
        t.members("EmailValidationError", "HandleValidationError")
    },
    resolveType(data) {
        const __typename = data.message?.includes("handle")
            ? "HandleValidationError"
            : "EmailValidationError"

        if (!__typename) {
            throw new Error(`Could not resolve the type of data passed to union type "SearchResult"`)
        }

        return __typename
    },
})

export const UserError = interfaceType({
    name: "UserError",
    definition(t) {
        t.string("field"), t.string("message")
    },
    resolveType: async (data) => {
        return data.message?.includes("email") ? "EmailValidationError" : "HandleValidationError"
    },
})
