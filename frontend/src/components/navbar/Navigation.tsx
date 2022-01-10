import React from "react"

import { Navbar, Nav } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import { useAuth } from "../../hooks/useAuth"

export const Navigation = () => {
    const { logout } = useAuth()
    const history = useHistory()

    return (
        <Navbar bg="primary" variant="dark" className="d-flex">
            <div className="w-100">
                <div className="d-block d-md-none text-white" style={{ cursor: "pointer" }}>
                    MOBILE
                </div>
            </div>
            <div className="d-flex w-100 justify-content-center">
                <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => history.push("/")}>
                    Navbar
                </Navbar.Brand>
                {/* <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav> */}
            </div>
            <Nav className="w-100 justify-content-end">
                <Nav.Link className="d-none d-md-block" style={{ cursor: "pointer" }} onClick={logout}>
                    Logout
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}
