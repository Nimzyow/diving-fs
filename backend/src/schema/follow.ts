import { objectType } from "nexus"
import { Follows } from "nexus-prisma"

export const follows = objectType({
    name: Follows.$name,
    description: Follows.$description,
    definition(t) {
        t.field(Follows.followingId), t.field(Follows.followerId)
        t.field(Follows.following)
    },
})
