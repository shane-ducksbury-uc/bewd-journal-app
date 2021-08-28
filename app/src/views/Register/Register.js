import Axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function Register() {
    const history = useHistory()
    const [formData, updateFormData] = useState()

    const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value.trim(),
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const API_ENDPOINT = 'http://api:5000/users'
        try {
            console.log(formData)
            const response = await Axios.post(API_ENDPOINT, formData)
            if (response.status === 201) {
                history.push('/login')
            } else {
                console.log('Something Went Wrong')
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div>
            <h1>Register an Account</h1>
            <label htmlFor="email" required>Email: </label>
            <input type="text" name="email" onChange={handleChange} />
            <label htmlFor="password" required>Password: </label>
            <input type="password" name="password" onChange={handleChange} />
            <label htmlFor="firstName" required>First Name: </label>
            <input type="text" name="firstName" onChange={handleChange} />
            <label htmlFor="lastName" required>Last Name: </label>
            <input type="text" name="lastName" onChange={handleChange} />
            <div>
                <button onClick={handleSubmit}>Register</button>
                <button>Cancel</button>
            </div>
        </div>
    )
}

export default Register
