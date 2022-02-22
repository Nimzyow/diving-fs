import React from "react"

import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

import { useAuth } from "../hooks/useAuth"

export const SideNav = () => {
    const { logout } = useAuth()

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
                    <h4>Divers</h4>
                    <Link to="/following">Following</Link>
                    <Link to="/suggestions">Suggestions</Link>
                    {/* <h4>Locations</h4>
                    <Link to="/locations">Home</Link>
                    <Link to="locations/liked">Liked</Link>
                    <Link to="locations/suggestions">Suggestions</Link>
                    <Link to="locations/visited">Visited</Link> */}
                    <h4>Messages</h4>
                    <Link to="/messages">Home</Link>
                    <Button onClick={logout}>Log out</Button>
                </div>
            </div>
        </div>
    )
}
