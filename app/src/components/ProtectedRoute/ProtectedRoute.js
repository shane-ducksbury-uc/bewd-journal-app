import React from 'react'
import { Route, Link } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, userLoggedIn, handleLogout, token, currentUser, ...rest }) => {

    return (
        <Route {...rest} render={props => {
            if(userLoggedIn){
                return <Component handleLogout={handleLogout} token={token} currentUser={currentUser} {...rest} {...props} />
            } else {
                return (
                    // Update this so that on logout it just redirects.
                    <>
                <Link to='/'><h2 className="is-size-1">BrightMind</h2></Link>
                <p>You need to be logged in to see that.</p>
                <p>If you just logged out - yes I should redirect you.</p>
                <Link to='/'>Go Home</Link><br></br>
                <Link to='/login'>Go to Login</Link>
                </>)
            }
        }} />
            
            )
}

export default ProtectedRoute
