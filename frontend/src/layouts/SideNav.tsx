import React from "react"

import { Link } from "react-router-dom"
import styled from "styled-components"

const SideNav = () => {
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
                    <h4>Divers</h4>
                    <Link to="/divers">Home</Link>
                    <Link to="divers/liked">Liked</Link>
                    <Link to="divers/suggestions">Suggestions</Link>
                    <Link to="divers/visited">Visited</Link>
                    <h4>Messages</h4>
                    <Link to="/messages">Home</Link>
                </div>
            </div>
        </div>
    )
}

export default SideNav
