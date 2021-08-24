import React from 'react'
import { Route } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, userLoggedIn, ...rest }) => {

    return (
        <Route {...rest} render={props => {
            if(userLoggedIn){
                return <Component {...rest} {...props} />
            } else {
                return <p>403 Unauthorized</p>
            }
        }} />
            
            )
}

export default ProtectedRoute
