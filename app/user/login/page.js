"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
import ScrollButton1 from '@/app/UI/ScrollButton1/page'

const Login = () => {
    const [identifier, setIdentifier] = useState(''); // Use "identifier" to represent both email and username
    const [password, setPassword] = useState('');

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
            body: JSON.stringify({ identifier, password })
        })
        const data = await res.json()
        console.log(data)
        if (data.success) {
            localStorage.setItem('token', data.token)
            console.log(data)
            window.location.href = '/Home'
        } else {
            alert(data.error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'identifier') {
            setIdentifier(value)
        }
        if (name === 'password') {
            setPassword(value)
        }
    }

    return (
        <>
            <section className="bg-black py-12">
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
                                    <input onChange={handleChange} type="text" name="identifier" id="identifier"
                                        className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400 peer"
                                        placeholder=" "
                                        required />
                                    <label
                                        htmlFor="identifier"
                                        className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username or Email ID</label>
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

                            {/* FIND WITH ME  */}
                            <div class="pt-28 text-sky-400 bottomtotop">
                                <div class="justify-start px-1 text-center flex md:justify-start animate-bounce">
                                    Explore with me!
                                </div>
                                <ul class="pt-4 flex space-x-6 justify-start text-center">
                                    <li class="transition p-1 ease-in-out delay-150 hover:-translate-y-1 hover:scale-150 duration-300">
                                        <Link href="http://linkedin.com/company/thepairup" target="_blank" rel="noopener noreferrer">
                                            <svg className='text-white' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512"
                                                height="25" width="25" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z">
                                                </path>
                                            </svg>
                                        </Link>
                                    </li>
                                    <li class="transition p-1 ease-in-out delay-150 hover:-translate-y-1 hover:scale-150 duration-300">
                                        <Link href="http://twitter.com/thepairup" target="_blank" rel="noopener noreferrer">
                                            <svg className='text-white' width="25" height="26" viewBox="0 0 20 16" aria-hidden="true">
                                                <g fill="none" fill-rule="evenodd">
                                                    <path class="foreground-2hyALB mt-4" fill="#fff"
                                                        d="M1,14.1538462 L1.95,14.1538462 C3.73125,14.1538462 5.5125,13.5384615 6.81875,12.4307692 C5.15625,12.4307692 3.73125,11.2 3.1375,9.6 C3.375,9.6 3.6125,9.72307692 3.85,9.72307692 C4.20625,9.72307692 4.5625,9.72307692 4.91875,9.6 C3.1375,9.23076923 1.7125,7.63076923 1.7125,5.66153846 C2.1875,5.90769231 2.78125,6.15384615 3.49375,6.15384615 C2.425,5.41538462 1.83125,4.18461538 1.83125,2.70769231 C1.83125,1.96923077 2.06875,1.23076923 2.30625,0.615384615 C4.20625,3.07692308 7.05625,4.67692308 10.38125,4.8 C10.2625,4.67692308 10.2625,4.30769231 10.2625,4.06153846 C10.2625,1.84615385 12.04375,0 14.18125,0 C15.25,0 16.31875,0.492307692 17.03125,1.23076923 C17.8625,1.10769231 18.8125,0.738461538 19.525,0.246153846 C19.2875,1.23076923 18.575,1.96923077 17.8625,2.46153846 C18.575,2.46153846 19.2875,2.21538462 20,1.84615385 C19.525,2.70769231 18.8125,3.32307692 18.1,3.93846154 L18.1,4.43076923 C18.1,9.84615385 14.18125,16 6.9375,16 C4.68125,16 2.6625,15.3846154 1,14.1538462 Z">
                                                    </path>
                                                    <rect width="20" height="16"></rect>
                                                </g>
                                            </svg>
                                        </Link>
                                    </li>
                                    <li class="transition p-1 ease-in-out delay-150 hover:-translate-y-1 hover:scale-150 duration-300">
                                        <Link href="https://www.youtube.com/channel/UCburjfRVtD3gKLI2jZ9oxdw" target="_blank" rel="noopener noreferrer"><svg className='text-white'
                                            stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512"
                                            height="25" width="25" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z">
                                            </path>
                                        </svg>
                                        </Link>
                                    </li>
                                    <li class="transition p-1 ease-in-out delay-150 hover:-translate-y-1 hover:scale-150 duration-300">
                                        <Link href="https://www.instagram.com/thepairup" target="_blank" rel="noopener noreferrer">
                                            <svg className='text-white' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512"
                                                height="25" width="25" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z">
                                                </path>
                                            </svg>
                                        </Link>
                                    </li>
                                    <li class="">
                                        <Link href={'mailto:admin@thepairup.com'} target="_blank" rel="noopener noreferrer">
                                            <button className='hover:scale-110 transition ease-in-out delay-150 duration-300  font-semibold bg-sky-400 md:px-6 px-3 p-1 text-white rounded-full'>Email</button>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Login
