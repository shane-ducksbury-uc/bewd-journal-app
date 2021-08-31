import React from 'react'
import { Route, Link, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, userLoggedIn, handleLogout, ...rest }) => {

    return (
        <Route {...rest} render={props => {
            if(userLoggedIn){
                return <Component handleLogout={handleLogout} {...rest} {...props} />
            } else {
                return (
                    // Update this so that on logout it just redirects.
                    <>
                <h2 className="is-size-2">Bright Mind</h2>
                <p>You need to be logged in to see that.</p>
                <p>If you just logged out - yes I should redirect you.</p>
                <Link to='/login'>Go to Login</Link>
                </>)
            }
        }} />
            
            )
}

export default ProtectedRoute
