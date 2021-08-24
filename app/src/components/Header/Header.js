import React from 'react'
import { Link } from 'react-router-dom'
import HeaderModuleCSS from './Header.module.css'

function Header({ handleLogout }) {
    return (
        <header className={HeaderModuleCSS.journalAppHeader}>
            <Link to='/'><h2>Journaling App</h2></Link>
            <nav>
                <ul>
                    <li><Link to='/journals'>Journals</Link></li>
                </ul>
                <button onClick={handleLogout}>Logout</button>
            </nav>
        </header>
    )
}

export default Header
