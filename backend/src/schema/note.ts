import { objectType } from "nexus"

export const Note = objectType({
    name: "Note",
    definition(t) {
        t.model.id(),
            t.model.title(),
            t.model.body(),
            t.model.userId(),
            t.model.createdAt(),
            t.model.updatedAt()
    },
})
