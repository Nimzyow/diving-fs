import React from "react"

import { Posts } from "./Posts"

const PostsContainer = (): JSX.Element => {
    const data = [
        { firstName: "Ben", lastName: "Sherman", body: "Greatest body in the world" },
        { firstName: "David", lastName: "Beckham", body: "Greatest" },
        { firstName: "something", lastName: "sadasd", body: "Asdasd" },
        { firstName: "something", lastName: "sadasd", body: "Asdasd" },
    ]
    const components = data.map((el, i) => (
        <div key={i} style={{ borderBottom: "1px solid black" }}>
            <Posts {...el} />
        </div>
    ))

    return <>{components}</>
}

export default PostsContainer
