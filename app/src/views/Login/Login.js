import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'


function Login({ setCurrentUser }) {
    const [incorrectCreds, setCredState] = useState(false)
    const [failedLogins, setFailedLogins] = useState(0)
    const { register, handleSubmit, formState: {errors}} = useForm()

    const checkUserCreds = async (formData) => {
        setCredState(false)
        const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/users/login`
        try {
            const response = await axios.post(API_ENDPOINT, formData)
            return response.data
        } catch (e) {
            if (e.response){
                if (e.response.status === 401){
                    setCredState(true)
                    setFailedLogins(failedLogins + 1)
                } else {
                    toast.error(`Something went wrong. Try again later.`, { autoClose:false })
                }
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
    
    const onSubmit = async (data) => {
        const token = await checkUserCreds(data)
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
        <main className="public-wrapper">
        <div className="form-container">
            <h1 className="is-size-1">Login to <Link to="/">BrightMind</Link></h1>
                { incorrectCreds ? 
                <div className="notification is-danger">Your email or password is incorrect.</div>
                : null}
                { failedLogins >= 3 ? 
                <div className="notification is-warning">As this is a demo application your user account may have deleted if you signed up prior to Friday 3rd of September. 
                If you're having trouble logging in, try registering a new account.</div>
                : null}
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
                <label className="label" htmlFor="email">Email: </label>
                <input placeholder="pam@brightmind.cc" className={`input is-medium ${errors.email ? "is-danger" : null}`} type="text" {...register("email", { required: true,
                    // eslint-disable-next-line
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}/>
                    {errors.email ? <p className="help is-danger">You must enter a valid email to login</p> : null}
                </div>
                <div className="field">
                    <label className="label" htmlFor="password">Password: </label>
                    <input placeholder="password" className={`input is-medium ${errors.password ? "is-danger" : null}`} type="password" {...register("password", { required: true, minLength: 8, maxLength: 32})}/>
                    {errors.password ? <p className="help is-danger">You must enter a password to login</p> : null}
                </div>
                <div>
                    <button className="button is-primary is-link" onClick={onSubmit}>Login</button>
                </div>
            </form>
            <Link to='/register'>Register a new account</Link>
        </div>
        </main>
    )
}

export default Login
