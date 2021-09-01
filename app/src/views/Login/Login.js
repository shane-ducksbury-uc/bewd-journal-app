import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'



function Login({ setCurrentUser }) {
    const [formData, updateFormData] = useState()

    const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value.trim(),
        });
      };

    const checkUserCreds = async (formData) => {
        const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/users/login`
        try {
            const response = await axios.post(API_ENDPOINT, formData)
            return response.data
        } catch (e) {
            if (e.response){
                if (e.response.status === 401){
                    toast.error('Incorrect Credentials')
                }
            } else {
                toast.error(`Something went wrong. Try again later.`, { autoClose:false })
            }
        }
    }

    const getUserDetails = async (token) => {
        const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/users`
        try {
            const response = await axios.get(API_ENDPOINT, {
                headers: {
                    'Authorization': `Bearer ${token.accessToken}`
                }
            })
            return response.data
        } catch (e) {
            toast.error('Something went wrong when connecting to the server.')
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = await checkUserCreds(formData)
        let user
        if(token){
            localStorage.setItem('userToken', JSON.stringify(token))
            user = await getUserDetails(token)
        }
        if(user){
            setCurrentUser(user[0])
        }
    }


    return (
        <div className="form-container">
            <h1 className="is-size-1">Login to Bright Mind</h1>
            <form>
            <label className="label" htmlFor="email">Email: </label>
            <input className="input is-medium" type="text" name="email" onChange={handleChange} />
            <label className="label" htmlFor="password">Password: </label>
            <input className="input is-medium" type="password" name="password" onChange={handleChange} />
            <div>
                <button className="button is-primary is-link" onClick={handleSubmit}>Login</button>
            </div>
            </form>
            <Link to='/register'>Register a new account</Link>
        </div>
    )
}

export default Login
