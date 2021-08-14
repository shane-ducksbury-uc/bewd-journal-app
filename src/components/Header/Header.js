import React from 'react'
import { Link } from 'react-router-dom'
import HeaderModuleCSS from './Header.module.css'

function Header() {
    return (
        <header className={HeaderModuleCSS.journalAppHeader}>
            <Link to='/'><h2>Journaling App</h2></Link>
            <nav>
                <ul>
                    <li><Link to='/journal'>Journal</Link></li>
                    <li><Link to='/new-journal-entry'>New Entry</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
