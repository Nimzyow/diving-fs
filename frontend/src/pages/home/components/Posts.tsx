import React from "react"

type Props = {
    name: string
    body: string
}

export const Posts = (props: Props) => {
    const { name, body } = props
    return (
        <div>
            <p>{name}</p>
            <p>{body}</p>
        </div>
    )
}
