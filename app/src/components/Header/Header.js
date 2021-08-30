import React from 'react'
import { Link } from 'react-router-dom'
import HeaderModuleCSS from './Header.module.css'

function Header({ handleLogout }) {
    
    const headerBackground = `background-color: #4158D0;
    background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
    `
    
    return (
        <header className={HeaderModuleCSS.journalAppHeader}>
            <nav>
                <ul>
                    <li><Link to='/journals'>Journals</Link></li>
                </ul>
            </nav>
            <div>
                <Link to='/'><h2>Bright Mind</h2></Link>
            </div>
            <div>
                <p>Avatar</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </header>
    )
}

export default Header
