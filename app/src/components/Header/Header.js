import React from 'react'
import { Link } from 'react-router-dom'
import HeaderModuleCSS from './Header.module.css'

function Header({ handleLogout }) {
    
    const headerBackground = `background-color: #4158D0;
    background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
    `
    
    return (
        <header className={HeaderModuleCSS.journalAppHeader}>
            <div>
                <Link to='/'><h2 className="is-size-1">Bright Mind</h2></Link>
            </div>
            <div>
                <button className="button is-white"onClick={handleLogout}>Logout</button>
            </div>
        </header>
    )
}

export default Header
