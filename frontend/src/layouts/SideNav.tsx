import React from "react"

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
            <div style={{ display: "grid", gridTemplateColumns: "auto min-content" }}>
                <div style={{ gridColumn: 2 }}>
                    <h4>Home</h4>
                    <p>Following</p>
                    <p>Suggestions</p>
                    <h4>Divers</h4>
                    <p>Home</p>
                    <p>Liked</p>
                    <p>Suggestions</p>
                    <p>Visited</p>
                    <h4>Messages</h4>
                    <p>Home</p>
                </div>
            </div>
        </div>
    )
}

export default SideNav
