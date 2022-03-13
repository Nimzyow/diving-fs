import React from "react"

import { Button } from "react-bootstrap"

import { User } from "./User"

export const SuggestionsContainer = (): JSX.Element => {
    const users = [
        { id: "1", name: "nima" },
        { id: "2", name: "rob" },
        { id: "3", name: "bob" },
    ]

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "60% auto",
            }}
        >
            {users.map((el, i) => {
                return (
                    <div key={el.id} style={{ gridColumn: 1, gridRow: i + 1 }}>
                        <User name={el.name} />
                    </div>
                )
            })}
            {users.map((el, i) => {
                return (
                    <div data-testid="follow" key={el.id} style={{ gridColumn: 2, gridRow: i + 1 }}>
                        <Button>Follow</Button>
                    </div>
                )
            })}
        </div>
    )
}
