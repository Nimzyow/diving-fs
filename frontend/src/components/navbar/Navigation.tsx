import React from "react"

import { Navbar, Nav } from "react-bootstrap"

import { useAuth } from "../../hooks/useAuth"

const Navigation = () => {
    const { logout } = useAuth()

    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Nav className="me-auto">
                <Nav.Link style={{ cursor: "pointer" }} onClick={logout}>
                    Logout
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default Navigation
