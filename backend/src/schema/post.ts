import { objectType } from "nexus"
import { Post } from "nexus-prisma"

export const CreatePostOutput = objectType({
    name: "CreatePostOutput",
    definition(t) {
        t.field("post", {
            type: "Post",
        }),
            t.field("createPostError", {
                type: "BaseError",
            })
    },
})

export const post = objectType({
    name: Post.$name,
    description: Post.$description,
    definition(t) {
        t.field(Post.id),
            t.field(Post.body),
            t.field(Post.createdAt),
            t.field(Post.updatedAt),
            t.field(Post.authorId),
            t.field(Post.author)
    },
})
