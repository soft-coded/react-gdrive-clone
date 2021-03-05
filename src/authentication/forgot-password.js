import React, {useRef, useState} from 'react'
import {Form, Card, Button, Alert} from "react-bootstrap"
import {Link} from "react-router-dom"

import {useAuth} from "../context/auth-context"
import Centered from "../components/centered"

export default function ForgotPassword() {
    const emailRef=useRef()
    const {passReset}=useAuth()
    const [error, setError]=useState("")
    const [message, setMessage]=useState("")
    const [loading, setLoading]=useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        try{
            setLoading(true)
            setError("")
            setMessage("")
            await passReset(emailRef.current.value)
            setMessage("Check your email inbox for further instructions.")
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
                    <h2 className="text-center mb-4">Reset Password</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required ref={emailRef} />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-2" type="submit">Reset Password</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </Centered>
    )
}
