import React from "react"

type Props = {
    firstName: string
    lastName: string
    body: string
}

export const Posts = (props: Props) => {
    const { firstName, lastName, body } = props
    return (
        <div>
            <p>
                {firstName} {lastName}
            </p>
            <p>{body}</p>
        </div>
    )
}
