"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTPU } from '@/app/layout'
import { useRef } from 'react'
import Search from '@/app/Search/page'
import Notification from '@/app/Notification/page'
import Intrested from '@/app/Intrested/page'
import { useEffect, useState } from 'react'
import Message from '@/app/Message/page'

const RightSideNavbar = () => {
    const [userDetails1, setUserDetails1] = useState('');
    const [userDetails2, setUserDetails2] = useState('');

    const [showTooltip, setShowTooltip] = useState(false);
    const [showTooltip2, setShowTooltip2] = useState(false);

    useEffect(() => {
        fetchUserDetails1()
        fetchUserDetails2();
    }, [])

    const fetchUserDetails1 = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserDetails1(data.userDetails1);
            } else {
                // Handle error
            }
        } catch (error) {
            console.log(error)
        }
    };

    const fetchUserDetails2 = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/details`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserDetails2(data.userDetails2);
            } else {
                // Handle error
            }
        } catch (error) {
            console.log("hooo")
        }
    };

    // search 
    const toggleCart1 = () => {
        if (ref1.current.classList.contains('-translate-x-full')) {
            ref1.current.classList.remove('-translate-x-full')
            ref1.current.classList.add('translate-x-0')
        }
        else {
            ref1.current.classList.remove('translate-x-0')
            ref1.current.classList.add('-translate-x-full')
        }
    }
    // Notification
    const toggleCart2 = () => {
        if (ref2.current.classList.contains('-translate-x-full')) {
            ref2.current.classList.remove('-translate-x-full')
            ref2.current.classList.add('translate-x-0')
        }
        else {
            ref2.current.classList.remove('translate-x-0')
            ref2.current.classList.add('-translate-x-full')
        }
    }
    // Intrested
    const toggleCart3 = () => {
        if (ref3.current.classList.contains('-translate-x-full')) {
            ref3.current.classList.remove('-translate-x-full')
            ref3.current.classList.add('translate-x-0')
        }
        else {
            ref3.current.classList.remove('translate-x-0')
            ref3.current.classList.add('-translate-x-full')
        }
    }
    // Message
    const toggleCart4 = () => {
        if (ref4.current.classList.contains('-translate-x-full')) {
            ref4.current.classList.remove('-translate-x-full')
            ref4.current.classList.add('translate-x-0')
        }
        else {
            ref4.current.classList.remove('translate-x-0')
            ref4.current.classList.add('-translate-x-full')
        }
    }
    // Create
    const toggleTooltip = () => {
        setShowTooltip(!showTooltip);
    };
    // Create
    const toggleTooltip2 = () => {
        setShowTooltip2(!showTooltip2);
    };

    // search 
    const ref1 = useRef();
    // Notification
    const ref2 = useRef();
    // Intrested
    const ref3 = useRef();
    // Message
    const ref4 = useRef();
    const { logout } = useTPU()
    return (
        <>
            <div className="md:block fixed hidden bg-black text-white h-screen col-start-1 col-end-4 border-r border-gray-500 rounded-r-[5rem]">
                <div className="mt-16 px-8">

                    <Link href={'/Home'} className="flex items-center">
                        <span className="self-center text-3xl whitespace-nowrap text-white font-extrabold  ">
                            <span className='line-through decoration-white text-sky-400'>The</span> PairUp</span>
                        <span className='text-4xl font-extrabold text-sky-400'>.</span>
                    </Link>

                    {/* Home  */}
                    <Link href={'/Home'} className="flex-row flex mt-16 px-4 text-xl font-medium items-center hover:bg-sky-900 rounded-2xl py-2">
                        <div className="pr-4">
                            <svg className="w-7 h-7 mb-1 text-sky-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                            </svg>
                            <span className="sr-only">Home</span>
                        </div>
                        <div className="">Home</div>
                    </Link>


                    {/* Search  */}
                    <din onClick={toggleCart1} className="flex-row cursor-pointer flex mt-4 px-4 text-xl font-medium items-center hover:bg-sky-900 rounded-2xl py-2">
                        <div className="pr-4">
                            <svg className="w-7 h-7 text-sky-400 group-hover:text-sky-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Search</span>
                        </div>
                        <div className="">Search</div>
                    </din>

                    <div ref={ref1} className="absolute border-r border-gray-500 top-0 left-0 z-50 w-96 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-black" tabIndex="-1">
                        <div className="text-base font-semibold font-mono text-sky-400">Search</div>
                        <button onClick={toggleCart1} type="button" className="text-gray-400 bg-transparent hover:bg-sky-500 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center" >
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close menu</span>
                        </button>
                        <hr className="my-3" />
                        {/* Here notofication */}
                        <Search />
                    </div>


                    {/* Message  */}
                    <div onClick={toggleCart4} className="flex-row cursor-pointer flex mt-4 px-4 text-xl font-medium items-center hover:bg-sky-900 rounded-2xl py-2">
                        <div className="pr-4">
                            <svg className="w-7 h-7 text-sky-400 group-hover:text-sky-400" aria-label="Messenger" color="rgb(245, 245, 245)" fill="rgb(0, 178, 255)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.739"></path><path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fillRule="evenodd"></path></svg>
                        </div>
                        <div className="">Messages</div>
                    </div>

                    <div ref={ref4} className="absolute border-r border-gray-500 top-0 left-0 z-50 w-96 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-black" tabIndex="-1">
                        <div className="text-base font-semibold font-mono text-sky-400">Messages</div>
                        <button onClick={toggleCart4} type="button" className="text-gray-400 bg-transparent hover:bg-sky-500 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center" >
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close menu</span>
                        </button>
                        <hr className="my-3" />
                        {/* Here notofication */}
                        <Message />
                    </div>


                    {/* Notification  */}
                    <div onClick={toggleCart2} className="flex-row cursor-pointer flex mt-4 px-4 text-xl font-medium items-center hover:bg-sky-900 rounded-2xl py-2">
                        <div className="pr-4 relative">
                            <svg className="w-7 h-7 text-sky-400 group-hover:text-sky-400" aria-label="Notifications" fill="rgb(0, 178, 255)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                            <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full -top-1 right-2">
                            </div>
                        </div>
                        <div className="">Notifications</div>
                    </div>

                    <div ref={ref2} className="absolute border-r border-gray-500 top-0 left-0 z-50 w-96 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-black" tabIndex="-1">
                        <div className="text-base font-semibold font-mono text-sky-400">Notification</div>
                        <button onClick={toggleCart2} type="button" className="text-gray-400 bg-transparent hover:bg-sky-500 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center" >
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close menu</span>
                        </button>
                        <hr className="my-3" />
                        {/* Here notofication */}
                        <Notification />
                    </div>


                    {/* Create  */}
                    <div className="relative">
                        <div onClick={toggleTooltip} className="flex-row flex mt-4 px-4 text-xl font-medium items-center hover:bg-sky-900 rounded-2xl py-2 cursor-pointer">
                            <div className="pr-4">
                                <svg className='w-7 h-7 text-sky-400 group-hover:text-sky-400' aria-label="New post" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
                            </div>
                            <div className="">Create</div>

                            {showTooltip && (
                                <>
                                    <div className="ml-6 text-base bg-transparent text-sky-400 rounded-2xl">
                                        <div className="flex flex-row space-x-2">

                                            {(userDetails1.tick === 'yes' || userDetails1.tick === 'active' || userDetails1.role === 'admin') ? (
                                                < Link href={'/Feed/Create/Story'} className="px-3 p-1 bg-black hover:scale-110 border border-gray-600 hover:text-sky-400 rounded-2xl">
                                                    Story
                                                </Link>) : (< button disabled={true} className="px-3 p-1 bg-black hover:scale-110 border border-gray-600 hover:text-sky-400 rounded-2xl">
                                                    Story
                                                </button>)}

                                            <Link href={'/Feed/Create/Post'} className="px-3 p-1 bg-black hover:scale-110 border border-gray-600 hover:text-sky-400 rounded-2xl">Post</Link>

                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Intrested  */}
                    <div onClick={toggleCart3} className="flex-row cursor-pointer flex mt-4 px-4 text-xl font-medium items-center hover:bg-sky-900 rounded-2xl py-2">
                        <div className="pr-4">
                            <Image className='w-7 h-7' width={28} height={28} src={'/live-7.png'}></Image>
                            <span className="sr-only">Intrested</span>
                        </div>
                        <div className="">Interested</div>
                    </div>

                    <div ref={ref3} className="absolute border-r border-gray-500 top-0 left-0 z-50 w-96 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-black" tabIndex="-1">
                        <div className="text-base font-semibold font-mono text-sky-400">Intrested</div>
                        <button onClick={toggleCart3} type="button" className="text-gray-400 bg-transparent hover:bg-sky-500 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center" >
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close menu</span>
                        </button>
                        <hr className="my-3" />
                        <Intrested />
                    </div>


                    {/* Profile  */}
                    <Link href={`/user/profile/${userDetails1.name}`} className="flex-row cursor-pointer flex mt-4 px-4 text-xl font-medium items-center hover:bg-gray-700 rounded-2xl py-2">
                        <div className={`border p-1 mr-4 rounded-full ${userDetails1.role === 'admin' ? 'border-amber-400' : ''} ${userDetails1.tick === 'yes' ? 'border-sky-400' : ''} ${userDetails1.tick === 'active' ? 'border-teal-500' : ''}`}>
                            {userDetails2.avatar ? (
                                <Image src={`/avatars/${userDetails2.avatar}`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-7 h-7 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                            ) : (<Image src={`/avatars/dummy.jpeg`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-7 h-7 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />)}
                            <span className="sr-only">Search</span>
                        </div>
                        <div className="">Profile</div>
                    </Link>


                    {/* Menu  */}
                    <div className="relative">
                        <div onClick={toggleTooltip2} className="flex-row cursor-pointer flex mt-32 pl-4 pr-44 text-xl font-medium items-center hover:bg-gray-700 rounded-2xl py-2">
                            <div className="pr-4">
                                <svg aria-label="Settings" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="4" y2="4"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="12" y2="12"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="20" y2="20"></line></svg>
                            </div>
                            <div className="">Menu</div>
                        </div>

                        {showTooltip2 && (
                            <div class="z-10 absolute text-white bg-gray-700 divide-y divide-gray-100 rounded-lg shadow w-52 -top-60 -right-0">
                                <div class="flex flex-col justify-center py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownTopButton">
                                    <Link href={'/menu/Setting'} class="flex justify-center px-4 py-3 hover:bg-gray-600 text-white">Settings</Link>
                                    <Link href={'/menu/GuidetoVerification'} class="flex justify-center px-4 py-3 hover:bg-gray-600 text-white">Guide to Verification</Link>
                                    <Link href={'/EXT/Security'} class="flex justify-center px-4 py-3 hover:bg-gray-600 text-white">Security Policy</Link>
                                    <Link href={'https://6z236yooyhh.typeform.com/to/WP5J4BH1'} class="flex justify-center px-4 py-3 hover:bg-gray-600 text-white">Report</Link>
                                    <button onClick={logout} class="flex justify-center px-4 py-3 hover:bg-gray-600 text-white">Logout</button>
                                </div>
                            </div>
                        )}
                    </div>


                </div>
                <div className=""></div>
            </div >
        </>
    )
}

export default RightSideNavbar