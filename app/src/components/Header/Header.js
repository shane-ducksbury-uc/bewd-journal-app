import React from 'react'
import { Link } from 'react-router-dom'

function Header({ handleLogout }) {
    
    return (
        <header className="app-header">
            <div>
                <Link to='/'><h2 className="is-size-1">BrightMind</h2></Link>
            </div>
            <div>
                <button className="button is-white"onClick={handleLogout}>Logout</button>
            </div>
        </header>
    )
}

export default Header
