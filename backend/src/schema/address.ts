import { objectType } from "nexus"

export const Address = objectType({
    name: "Address",
    definition(t) {
        t.model.id(),
            t.model.line1(),
            t.model.line2(),
            t.model.county(),
            t.model.postcode(),
            t.model.country(),
            t.model.createdAt(),
            t.model.updatedAt()
    },
})
