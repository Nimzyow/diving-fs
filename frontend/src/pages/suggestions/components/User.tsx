import React from "react"

type Props = {
    name: string
}

export const User = (props: Props) => {
    return <div>{props.name}</div>
}
