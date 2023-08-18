"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
import ScrollButton1 from '@/app/UI/ScrollButton1/page'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (localStorage.getItem('token')) {
            // Details condition all here not in details
            window.location.href = '/Home';
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json()
        console.log(data)
        if (data.success) {
            localStorage.setItem('token', data.token)
            window.location.href = '/Home'
        } else {
            alert(data.error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'email') {
            setEmail(value)
        }
        if (name === 'password') {
            setPassword(value)
        }
    }

    return (
        <>
            <section className="bg-black py-32">
                <div className="flex flex-col items-center justify-center px-6 mx-auto mt-20">
                    <div className="w-full sm:max-w-md">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <ScrollButton1 />
                            <Link href={'/'} className="flex items-center justify-center">
                                {/* <Image src={'/Logo1.png'} alt="kalash" width={60} height={60} /> */}
                                <span className="self-center text-3xl whitespace-nowrap text-white font-extrabold  ">
                                    <span className='line-through decoration-white text-sky-400'>The</span> PairUp</span>
                            </Link>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">

                                <div className="relative z-0 w-full mb-6 group">
                                    <input onChange={handleChange} type="email" name="email" id="email"
                                        className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400 peer"
                                        placeholder=" "
                                        required />
                                    <label
                                        htmlFor="email"
                                        className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                                </div>

                                <div className="relative z-0 w-full mb-6 group">
                                    <input onChange={handleChange} type="password" name="password" id="password"
                                        className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400 peer"
                                        placeholder=" " minLength={5}
                                        required />
                                    <label
                                        htmlFor="password"
                                        className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                </div>

                                <div className="flex items-center justify-between">
                                    <Link href={'/user/forgot'} className="text-sm font-medium text-sky-400 hover:underline">Forgot password?</Link>
                                </div>
                                <button style={{ backgroundColor: '#00B2FF' }} type="submit"
                                    className="w-full bg-sky-400 hover:bg-sky-500 text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:scale-105 transition ease-in-out delay-150 duration-300">
                                    Login
                                </button>
                                <p className="text-sm font-light text-white">
                                    Don't have an account yet?
                                    <Link href={'/user/signup'} className="font-medium text-sky-400 hover:underline">
                                        <br />
                                        Sign up
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Login
