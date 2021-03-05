import React from 'react'
import {Navbar, Nav} from "react-bootstrap"
import {Link} from "react-router-dom"

export default function NavbarComponent() {
    return (
        <Navbar variant="dark" bg="dark" className="d-flex" style={{alignItems: "center", justifyContent: "space-between"}}>
            <Navbar.Brand as={Link} to="/"><strong>G-drive Clone</strong></Navbar.Brand>
            <Nav>
                <Nav.Link as={Link} to="/user">Profile</Nav.Link>
            </Nav>
        </Navbar>
    )
}
