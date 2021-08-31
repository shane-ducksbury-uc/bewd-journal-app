import Axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'



function Register() {
    const history = useHistory()
    const { register, handleSubmit, watch, formState: {errors}} = useForm() 

    const onSubmit = async (data) => {
        const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/users`
        console.log(data)
        try {
            const response = await Axios.post(API_ENDPOINT, data)
            if (response.status === 201) {
                toast.success('User account successfully created.')
                history.push('/login')
            }
        } catch (e) {
            toast.error(`Something went wrong. Try again later.`, { autoClose:false })
        }
    }

    return (
        <>
        <main className="form-container">
        <h1 className="is-size-1">Register a New Account</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="label" htmlFor="firstName" required>First Name: </label>
                <input className="input is-medium" type="text" {...register("firstName",{ required: true })}/>
                <label className="label" htmlFor="lastName" required>Last Name: </label>
                <input className="input is-medium" type="text" {...register("lastName",{ required: true })}/>
                <label className="label" htmlFor="email">Email: </label>
                <input className="input is-medium" type="text" {...register("email", { required: true })}/>
                <label className="label" htmlFor="password" >Password: </label>
                <input className="input is-medium" type="password" {...register("password", { required: true})}/>
                <button className="button is-primary is-link">Sign Up</button>
            </form>
        </main>
        </>
    )
}

export default Register
