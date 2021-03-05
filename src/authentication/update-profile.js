import React, {useRef, useState} from 'react'
import {Form, Card, Button, Alert} from "react-bootstrap"
import {Link, useHistory} from "react-router-dom"

import {useAuth} from "../context/auth-context"
import Centered from "../components/centered"

export default function UpdateProfile() {
    const emailRef=useRef()
    const passwordRef=useRef()
    const passConfRef=useRef()
    const {updateEmail, updatePass}=useAuth()
    const [error, setError]=useState("")
    const [loading, setLoading]=useState(false)
    const history=useHistory()

    async function handleSubmit(e){
        e.preventDefault()
        if (passwordRef.current.value!==passConfRef.current.value)
            return setError("Passwords do not match")

        try{
            setError("")
            setLoading(true)
            await updateEmail(emailRef.current.value)
            await updatePass(passwordRef.current.value)
            history.push("/")
        }
        catch(err){
            setError(err.message)
        }
        setLoading(false)
    }

    return (
        <Centered>
            <Card className="bg-dark">
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required ref={emailRef} />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required ref={passwordRef} />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" required ref={passConfRef} />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-2" type="submit">Update Profile</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/user">Cancel</Link>
            </div>
        </Centered>
    )
}
