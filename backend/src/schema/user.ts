import { objectType, enumType } from "nexus"
import { User, DiverCertification, Role } from "nexus-prisma"

export const user = objectType({
    name: User.$name,
    description: User.$description,
    definition(t) {
        t.field(User.id),
            t.field(User.name),
            t.field(User.email),
            t.field(User.handle),
            t.field(User.role),
            t.field(User.posts),
            t.field(User.createdAt),
            t.field(User.updatedAt),
            t.field(User.diverCertifications)
    },
})

export const Token = objectType({
    name: "Token",
    definition(t) {
        t.string("token")
    },
})

export const diverCertification = objectType({
    name: DiverCertification.$name,
    description: DiverCertification.$description,
    definition(t) {
        t.field(DiverCertification.id),
            t.field(DiverCertification.name),
            t.field(DiverCertification.createdAt),
            t.field(DiverCertification.updatedAt)
    },
})

export const role = enumType({
    name: Role.name,
    members: Role.members,
})
