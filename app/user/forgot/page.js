"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar/page'
import Footer from '@/components/Footer/page'

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [signupMessage, setSignupMessage] = useState('');

    useEffect(() => {
        if (localStorage.getItem('token')) {
            window.location.href = '/Home';
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== cpassword) {
            alert('Passwords do not match');
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const json = await res.json();

        if (json.success) {
            setSignupMessage('Password Change Successfully');
            setEmail('');
            setPassword('');
            setCpassword('');

            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } else {
            alert(json.error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        } else if (name === 'cpassword') {
            setCpassword(value)
        }
    }

    return (
        <>
            <Navbar />
            <section className="bg-black pt-24 h-screen">
                <div className="flex flex-col items-center justify-center px-6 mx-auto mt-20">
                    <Link href={'/'} className="flex items-center pb-5">
                        <span className="self-center md:text-4xl text-3xl font-bold text-sky-400">Change Password</span>
                    </Link>
                    {signupMessage && (
                        <p className="text-green-400 md:text-xl text-lg font-bold underline underline-offset-1">{signupMessage}</p>
                    )}
                    <form onSubmit={handleSubmit} className="w-full sm:max-w-md p-8">

                        <div className="relative z-0 w-full mb-6 group">
                            <input value={email} onChange={handleChange} pattern="[a-zA-Z0-9._%+-]+@(?:[^.]+\.edu|[^.]+\.ac\.in)" type="email" name="email" id="email"
                                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400  peer"
                                placeholder=" "
                                required />
                            <label
                                htmlFor="email"
                                className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">College Email address</label>
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                            <input value={password} onChange={handleChange} type="password" name="password" id="password"
                                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400  peer"
                                placeholder=" " minLength={5}
                                required />
                            <label
                                htmlFor="password"
                                className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                            <input value={cpassword} onChange={handleChange} type="password" name="cpassword" id="cpassword"
                                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400  peer"
                                placeholder=" " minLength={5}
                                required />
                            <label
                                htmlFor="cpassword"
                                className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                        </div>

                        <button style={{ backgroundColor: '#00B2FF' }}
                            type="submit"
                            className="text-white bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-sky-400  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-sky-400 dark:hover:bg-sky-400 dark:focus:ring-sky-400 hover:scale-105 transition ease-in-out delay-150 duration-300">
                            Change Password
                        </button>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Signup
