import React from "react"

import { Link } from "react-router-dom"

export const SideNav = () => {
    return (
        <div
            style={{
                gridColumn: 1,
                gridRowStart: 1,
                gridRowEnd: 4,
            }}
        >
            <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
                <div style={{ gridColumn: 2, display: "flex", flexDirection: "column" }}>
                    <h4>Home</h4>
                    <Link to="/following">Following</Link>
                    <Link to="/suggestions">Suggestions</Link>
                    <h4>
                        <Link to="/locations">Locations</Link>
                    </h4>
                    <Link to="locations/liked">Liked locations</Link>
                    <Link to="locations/places-to-go">Places to go</Link>
                    <Link to="locations/visited">Visited</Link>
                    <h4>Messages</h4>
                    <Link to="/messages">Home</Link>
                </div>
            </div>
        </div>
    )
}
