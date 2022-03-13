import React from "react"

import { useUserRelatedPostsQuery } from "../../../generated/graphql"
import { Posts } from "./Posts"

const PostsContainer = (): JSX.Element => {
    // const data = [
    //     { firstName: "Ben", lastName: "Sherman", body: "Greatest body in the world" },
    //     { firstName: "David", lastName: "Beckham", body: "Greatest" },
    //     { firstName: "something", lastName: "someone", body: "one" },
    //     { firstName: "something", lastName: "base", body: "case" },
    // ]

    const { data, loading, error } = useUserRelatedPostsQuery()

    if (loading && !data) {
        return <p>...loading</p>
    }

    const components = data?.userRelatedPosts.map((el, i) => (
        <div key={i} style={{ borderBottom: "1px solid black" }}>
            <Posts
                body={el?.body || "Can't display body at this time"}
                name={el?.author?.name || "unknown"}
            />
        </div>
    ))

    return <>{components}</>
}

export default PostsContainer
