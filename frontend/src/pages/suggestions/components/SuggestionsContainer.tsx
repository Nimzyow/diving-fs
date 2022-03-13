import React from "react"

import { Button } from "react-bootstrap"

import { useGetUserSuggestionsQuery } from "../../../generated/graphql"
import { User } from "./User"

export const SuggestionsContainer = (): JSX.Element => {
    // const users = [
    //     { id: "1", name: "nima" },
    //     { id: "2", name: "rob" },
    //     { id: "3", name: "bob" },
    // ]

    const { data, loading } = useGetUserSuggestionsQuery()

    if (loading || !data) {
        return <p>...Loading</p>
    }

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "60% auto",
            }}
        >
            {data.userSuggestions.map((el, i) => {
                return (
                    <div key={el.id} style={{ gridColumn: 1, gridRow: i + 1 }}>
                        <User name={el.name} />
                    </div>
                )
            })}
            {data.userSuggestions.map((el, i) => {
                return (
                    <div data-testid="follow" key={el.id} style={{ gridColumn: 2, gridRow: i + 1 }}>
                        <Button>Follow</Button>
                    </div>
                )
            })}
        </div>
    )
}
