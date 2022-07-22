import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ReactComponent as NoteTaking } from '../../assets/note_taking.svg'

function Home({ userLoggedIn }) {
    if (userLoggedIn) {
        return (
            <Navigate to='/journals/' />
        )
    } else {
        return (
            <>
            <main className="public-wrapper">
            <div className="home-container">
                <div className="home-content-container">
                    <h1>Welcome to BrightMind</h1>
                    <p>Research shows journaling can help on your way to positive mental health.</p>
                    <p>BrightMind is a simple website to help your journal process.</p>
                </div>
                <div>
                    <div className="home-action-container">
                        <h2>Get Started</h2>
                        <figure className="image is-256x256">
                            <NoteTaking />
                        </figure>
                        <Link to="/login"><button className="button is-primary">Go To Login</button></Link>
                        <Link to="/register"><button className="button is-link">Register</button></Link>
                    </div>
                </div>
            </div>
            </main>
        </>
        )
    }
}

export default Home
