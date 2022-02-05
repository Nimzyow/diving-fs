import React from "react"

import styled from "styled-components"

import SideNav from "./SideNav"

const Layout = styled.div`
    display: grid;
    grid-template-columns: 25% auto;
    grid-template-rows: min-content;
`

type Props = {
    children: JSX.Element
}

export const Main = ({ children }: Props): JSX.Element => {
    return (
        <Layout>
            <SideNav />
            <div style={{ gridColumn: 2, gridRow: 1, border: "1px solid green" }}> hi</div>
        </Layout>
    )
}

export default Main
