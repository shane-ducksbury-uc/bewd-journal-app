import Axios from 'axios';
import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'


function Register() {
    const [emailConflict, setEmailConflict] = useState(false)
    const history = useHistory()
    const { register, handleSubmit, formState: {errors}} = useForm()

    const onSubmit = async (data) => {
        setEmailConflict(false)
        const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/users`
        try {
            const response = await Axios.post(API_ENDPOINT, data)
            if (response.status === 201) {
                toast.success('User account successfully created.')
                history.push('/login')
            }
        } catch (e) {
            if (e.response){
                if (e.response.status === 409){
                    setEmailConflict(true)
                } else {
                    toast.error(`Something went wrong. Try again later.`, { autoClose:false })
                }
            } else {
                toast.error(`Something went wrong. Try again later.`, { autoClose:false })
            }
        }
    }

    return (
        <main className="public-wrapper">
        <div className="form-container">
        <h1 className="is-size-1">Register for <Link to="/">BrightMind</Link></h1>
            <div className="notification is-warning">BrightMind is demo software. 
                Please don't use real credentials here. They are stored salted and hashed, but may be deleted at any time.</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label" htmlFor="firstName">First Name: </label>
                    <input placeholder="Pam" className={`input is-medium ${errors.firstName ? "is-danger" : null}`} type="text" {...register("firstName",{ required: true, minLength: 2, maxLength: 64 })}/>
                    {errors.firstName ? <p className="help is-danger">First name must be between 2 and 64 characters long</p> : null}
                </div>
                <div className="field">
                    <label className="label" htmlFor="lastName">Last Name: </label>
                    <input placeholder="Halpert" className={`input is-medium ${errors.lastName ? "is-danger" : null}`} type="text" {...register("lastName",{ required: true, minLength: 2, maxLength: 64 })}/>
                    {errors.lastName ? <p className="help is-danger">Last name must be between 2 and 64 characters long</p> : null}
                </div>
                <div className="field">
                    <label className="label" htmlFor="email">Email: </label>
                    <input placeholder="pam@brightmind.cc" className={`input is-medium ${errors.email || emailConflict ? "is-danger" : null}`} type="text" {...register("email", { required: true,
                    // eslint-disable-next-line
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })}/>
                    {errors.email ? <p className="help is-danger">Please enter a valid email</p> : null}
                    {emailConflict ? <p className="help is-danger">This email address is already taken. Please choose another.</p> : null}
                </div>
                <div className="field">
                    <label className="label" htmlFor="password">Password: </label>
                    <input placeholder="password" className={`input is-medium ${errors.password ? "is-danger" : null}`} type="password" {...register("password", { required: true, minLength: 8, maxLength: 32})}/>
                    {errors.password ? <p className="help is-danger">Your password must be between 8 and 32 characters long</p> : null}
                </div>
                <button className="button is-primary is-link">Sign Up</button>
            </form>
            <Link to='/login'>Go to Login</Link>
        </div>
        </main>
    )
}

export default Register
