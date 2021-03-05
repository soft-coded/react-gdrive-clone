import React from 'react'
import {Container} from "react-bootstrap"

export default function Centered({children}) {
    return (
        <Container className="d-flex align-items-center justify-content-center flex-direction-row text-light" style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "600px"}}>
                {children}
            </div>
        </Container>
    )
}
