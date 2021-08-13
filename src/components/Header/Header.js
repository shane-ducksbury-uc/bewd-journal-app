import React from 'react'
import HeaderModuleCSS from './Header.module.css'

function Header() {
    return (
        <header className={HeaderModuleCSS.journalAppHeader}>
            <h2>Journaling App</h2>
        </header>
    )
}

export default Header
