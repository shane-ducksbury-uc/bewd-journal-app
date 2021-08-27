import React from 'react'
import { Route, Link } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, userLoggedIn, ...rest }) => {

    return (
        <Route {...rest} render={props => {
            if(userLoggedIn){
                return <Component {...rest} {...props} />
            } else {
                return (
                    <>
                <p>403 Unauthorized</p>
                <Link to='/login'>Go to Login</Link>
                </>)
            }
        }} />
            
            )
}

export default ProtectedRoute
