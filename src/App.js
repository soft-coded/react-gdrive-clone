import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import SignUp from "./authentication/signup"
import LogIn from "./authentication/login"
import ForgotPass from "./authentication/forgot-password"
import UpdateProfile from "./authentication/update-profile"
import AuthProvider from "./context/auth-context"
import Profile from "./authentication/profile"
import PrivateRoute from "./authentication/private-route"
import Dashboard from "./components/dashboard"

export default function App() {
  return (
    <Router>
      <Switch>
        <AuthProvider>
          <PrivateRoute exact path="/" component={Dashboard} redirect="/login" />
          <PrivateRoute exact path="/folder/:folderId" component={Dashboard} redirect="/login" />

          <PrivateRoute path="/user" component={Profile} redirect="/login"/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/login" component={LogIn}/>
          <Route path="/forgot-password" component={ForgotPass}/>
          <Route path="/update-profile" component={UpdateProfile}/>
        </AuthProvider>
      </Switch>
    </Router>   
  )
}
