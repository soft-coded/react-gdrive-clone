import React from 'react'
import {Card, Button} from "react-bootstrap"
import {Link} from "react-router-dom"

import {useAuth} from "../context/auth-context"
import Centered from "../components/centered"

export default function Profile(){
    const {currUser, logout}=useAuth()
    async function handleLogout(){
        try{
            await logout()
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <Centered>
        <Card className="bg-dark" style={{height: "30vh"}}>
            <Card.Body>
                <h1 className="text-center">Profile</h1>
                <strong>Email:</strong> {currUser && currUser.email}
                <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
            </Card.Body>
        </Card>
        <Button type="link" className="mt-2 w-100" onClick={handleLogout}>Log Out</Button>
        </Centered>
    )
}
