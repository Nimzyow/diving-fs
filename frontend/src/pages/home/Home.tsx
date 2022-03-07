import React from "react"

import { CreatePost } from "./components/CreatePost"
import PostsContainer from "./components/PostsContainer"

export const Home = () => {
    return (
        <>
            <CreatePost />
            <PostsContainer />
        </>
    )
}
