import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Login({ currentUser, setCurrentUser }) {
    const [formData, updateFormData] = useState()

    const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value.trim(),
        });
      };

    const checkUserCreds = async (formData) => {
        const API_ENDPOINT = 'http://localhost:5000/users/login'
        try {
            const response = await axios.post(API_ENDPOINT, formData)
            return response.data
        } catch (e) {
            console.log(e.message)
        }
    }

    const getUserDetails = async (token) => {
        const API_ENDPOINT = 'http://localhost:5000/users'
        try {
            const response = await axios.get(API_ENDPOINT, {
                headers: {
                    'Authorization': `Bearer ${token.accessToken}`
                }
            })
            return response.data
        } catch (e) {
            console.log(e.message)
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = await checkUserCreds(formData)
        if(token) localStorage.setItem('userToken', JSON.stringify(token))
        const user = await getUserDetails(token)
        if(user){
            localStorage.setItem('currentUser', JSON.stringify(user[0]))
            setCurrentUser(user[0])
        }
    }


    return (
        <div>
            <h1>Login to Journal App</h1>
            <label htmlFor="email">Email: </label>
            <input type="text" name="email" onChange={handleChange} />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" onChange={handleChange} />
            <div>
                <button onClick={handleSubmit}>Login</button>
                <button>Cancel</button>
            </div>
            <Link to='/register'>Register a new account</Link>
        </div>
    )
}

export default Login
