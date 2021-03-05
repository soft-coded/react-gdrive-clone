import React from 'react'
import {Route, Redirect} from "react-router-dom"
import {useAuth} from "../context/auth-context"

export default function PrivateRoute({component, path, redirect, ...rest}){
    const {currUser}=useAuth()
    return (
        currUser? <Route {...rest} path={path} component={component}/>: <Redirect to={redirect}/>
    )
}
