"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar/page'
import Footer from '@/components/Footer/page'
import Float from '@/components/Float/page'
import Example from '@/app/UI/Loader/page'

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [signupMessage, setSignupMessage] = useState('');

    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            window.location.href = '/Home';
        }

        setTimeout(() => {
            // After 2 seconds, show the Story
            setShowLoader(true);
        }, 1000);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.substring(0, 5).toLowerCase() === email.substring(0, 5).toLowerCase()) {
            alert("name and email should not same.");
            return;
        }

        const emailDomain = email.split('@')[1];
        if (!['vitstudent.ac.in', 'iitgn.ac.in'].some(domain => emailDomain.endsWith(domain))) {
            alert('Error occur following reasons...\n1. Please use a valid college email address ending with .ac.in or .edu.in\n2. Your college is not listed here. Click on "Add College" to include it.');
            return;
        }

        if (password !== cpassword) {
            alert('Passwords do not match');
            return;
        }

        const res = await fetch(`/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const json = await res.json();

        if (json.success) {
            setSignupMessage('Check you inbox to Verify your email');
            setName('');
            setEmail('');
            setPassword('');
            setCpassword('');
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } else {
            alert(json.error);
        }
    };

    const handleChange = (e) => {
        const inputText = e.target.value;
        const lowercaseText = inputText.replace(/[^a-z]/g, '');


        const { name, value } = e.target
        if (name === 'name') {
            setName(lowercaseText);
        } else if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        } else if (name === 'cpassword') {
            setCpassword(value)
        }

    }

    return (
        <>
            {!showLoader ? (
                // Render the Story component after 2 seconds
                <Example />
            ) : (
                <div className="">
                    <Navbar />
                    <div className="md:block hidden">
                        {/* <Float /> */}
                    </div>
                    <section className="bg-black pt-24 h-screen">
                        <div className="flex flex-col items-center justify-center px-6 mx-auto mt-20">
                            <button className="flex flex-col items-center pb-5">
                                <span className="self-center text-4xl font-bold text-sky-400">Sign up </span>
                                <span className='self-center text-4xl font-bold text-sky-400 hover:text-red-500'>anonymously</span>
                            </button>
                            {signupMessage && (
                                <p className="text-green-400 md:text-xl text-lg font-bold underline underline-offset-1">{signupMessage}</p>
                            )}
                            <form onSubmit={handleSubmit} className="w-full sm:max-w-md p-8">

                                <div className="relative z-0 w-full mb-6 group">
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input value={name} onChange={handleChange} type="text" name="name" id="name"
                                            className="lowercase block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400 peer"
                                            placeholder=" " minLength={3} maxLength={12}
                                            required />
                                        <label htmlFor="name"
                                            className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 truncate">Username (changes are not allowed)</label>
                                    </div>
                                </div>

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

                                <div className="flex flex-col w-full">
                                    <button style={{ backgroundColor: '#00B2FF' }}
                                        type="submit"
                                        className="text-white mt-3 bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-sky-400  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:scale-105 transition ease-in-out delay-150 duration-300">
                                        Sign Up
                                    </button>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        <Link href={`https://6z236yooyhh.typeform.com/to/lIz7fhyI`} target='_blank' className="text-white bg-amber-500 focus:ring-4 focus:outline-none focus:ring-sky-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center hover:scale-105 transition ease-in-out delay-150 duration-300">
                                            Club Signup
                                        </Link>
                                        <Link href={`https://6z236yooyhh.typeform.com/to/tcFr6KOm`} target='_blank' className="text-white bg-sky-500 focus:ring-4 focus:outline-none focus:ring-sky-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center hover:scale-105 transition ease-in-out delay-150 duration-300">
                                            Add College
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section >
                    <Footer />
                </div >
            )}
        </>
    )
}

export default Signup
