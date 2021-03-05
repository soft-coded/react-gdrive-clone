import React, {useContext, useState, useEffect} from 'react'
import {auth} from "../authentication/firebase"

const AuthContext=React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export default function AuthProvider({children}){
    const [currUser,setCurrUser]=useState()

    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }

    function passReset(email){
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email){
        return currUser.updateEmail(email)
    }

    function updatePass(pass){
        return currUser.updatePassword(pass)
    }

    function logout(){
        return auth.signOut()
    }

    useEffect(()=>{
        const unsub=auth.onAuthStateChanged(user=>setCurrUser(user))
        return unsub
    },[])

    const value={
        currUser,
        signup,
        login,
        logout,
        passReset,
        updateEmail,
        updatePass
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
