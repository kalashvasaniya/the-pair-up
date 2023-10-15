"use client"
import BottomNavbar from '@/components/BottomNavbar/page'
import React from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useState } from 'react'
import Image from 'next/image'
import Message from '@/app/Message/page'
import { useRef } from 'react'
import Notification from '@/app/Notification/page'
import { useTPU } from '@/app/layout'

const chat = ({ params }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [slugDetails, setSlugDetails] = useState(null);
    const [postDetails, setPostDetails] = useState(null);

    const [userDetails1, setUserDetails1] = useState('');
    const [userDetails2, setUserDetails2] = useState('');

    const [showTooltip2, setShowTooltip2] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/'
        }

        fetchUserDetails(params.slug);
        fetchUserDetails1();
        fetchUserDetails2();
    }, [])

    const fetchUserDetails = async (slug) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/checkSlug?slug=${slug}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUserDetails(data.user[0]);
                setSlugDetails(data.details[0])
                setPostDetails(data.posts[0])
                console.log("User Details", userDetails, "Slug details:", slugDetails, "post", postDetails)
            } else throw new Error("Something went wrong!");
        } catch (error) {
            console.log(error)
        }
    };

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

    const ref1 = useRef();
    const ref2 = useRef();

    // Menu
    const toggleTooltip2 = () => {
        setShowTooltip2(!showTooltip2);
    };

    const { logout } = useTPU();

    return (
        <>
            {/* Navbar in mobile  */}
            <div className="md:hidden">
                <nav className="bg-black fixed w-full z-50 top-0 left-0 border-b">

                    {/* top navbar */}
                    <div className="grid grid-cols-2 gap-32">

                        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                            <Link href={'/Home'} className="flex items-center">
                                <span className="self-center text-3xl whitespace-nowrap text-white font-extrabold  ">
                                    <span className='line-through decoration-white text-[#00B2FF]'>The</span> PairUp</span>
                                <span className='text-4xl font-extrabold text-sky-400'>.</span>
                            </Link>
                        </div>

                        <div className="flex flex-row justify-end p-4">

                            {/* Message  */}
                            <div onClick={toggleCart1} href={''} className="flex-row flex text-xl cursor-pointer font-semibold items-center hover:bg-sky-900 rounded-2xl">
                                <div className="px-2">
                                    <svg className="w-7 h-7 text-sky-400 group-hover:text-sky-400" aria-label="Messenger" color="rgb(245, 245, 245)" fill="rgb(0, 178, 255)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.739"></path><path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fillRule="evenodd"></path></svg>
                                </div>
                            </div>

                            <div ref={ref1} className="absolute top-0 -left-2 z-50 w-96 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-black" tabIndex="-1">
                                <div className="text-base font-semibold font-mono text-sky-400">Message</div>
                                <button onClick={toggleCart1} type="button" className="text-gray-400 bg-transparent hover:bg-sky-500 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-6 inline-flex items-center" >
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close menu</span>
                                </button>
                                <hr className="my-3 -mx-3" />
                                {/* Here notofication */}
                                <Message />
                            </div>


                            {/* Notification  */}
                            <div onClick={toggleCart2} href={''} className="flex-row flex text-xl cursor-pointer font-semibold items-center hover:bg-sky-900 rounded-2xl">
                                <div className="px-2 relative">
                                    <svg className="w-7 h-7 text-sky-400 group-hover:text-sky-400" aria-label="Notifications" fill="rgb(0, 178, 255)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                                    <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full -top-1 right-0">

                                    </div>
                                </div>
                            </div>

                            <div ref={ref2} className="absolute top-0 -left-2 z-50 w-96 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-black" tabIndex="-1">
                                <div className="text-base font-semibold font-mono text-sky-400">Notification</div>
                                <button onClick={toggleCart2} type="button" className="text-gray-400 bg-transparent hover:bg-sky-500 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-6 inline-flex items-center" >
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close menu</span>
                                </button>
                                <hr className="my-3 -mx-3" />
                                {/* Here notofication */}
                                <Notification />
                            </div>

                            <div onClick={toggleTooltip2} className="flex-row flex text-xl cursor-pointer font-semibold items-center hover:bg-sky-900 rounded-2xl">
                                <div className="px-2 flex justify-center items-center text-center">
                                    <svg aria-label="Settings" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="4" y2="4"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="12" y2="12"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="20" y2="20"></line></svg>
                                </div>
                            </div>

                            {showTooltip2 && (
                                <div class="z-10 absolute text-white bg-gray-700 divide-y divide-gray-100 rounded-lg shadow w-52 top-16 -right-0">
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

                </nav>
            </div>

            <div className="md:grid md:grid-cols-12 md:mt-0 mt-16">
                {/* Messsage side in Laptop  */}
                <div className="col-start-1 col-end-3 md:block hidden">
                    <div className="absolute border-r border-gray-500 top-0 left-0 z-50 w-96 h-screen p-4 overflow-y-auto transition-transform translate-x-0 bg-black" tabIndex="-1">
                        <div className="text-base font-semibold font-mono text-sky-400">Messages</div>
                        <Link href={`/Home`} type="button" className="text-gray-400 bg-transparent hover:bg-sky-500 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center" >
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close menu</span>
                        </Link>
                        <hr className="my-3" />
                        {/* Here notofication */}
                        <Message />
                    </div>
                </div>
                {/* Chat  */}
                <div className="col-start-4 col-end-13">
                    {/* itself Chat  */}
                    {params.slug === userDetails1.name && (
                        <div className="flex text-white flex-col justify-center items-center py-10">
                            Hello Self
                        </div>
                    )}

                    {/* Chat with other  */}
                    {params.slug !== userDetails1.name && slugDetails && userDetails && (
                        <div className="flex text-white flex-col justify-end items-end">
                            <div class="shadow-lg rounded-lg max-w-5xl">

                                <div class="flex flex-row justify-between bg-black md:border-l rounded-[4rem] border-gray-500 p-2 h-screen md:mb-0 mb-20">
                                    <div class="w-full px-5 flex flex-col justify-between">

                                        {/* Name  */}
                                        <div className="bg-black border-t-gray-300 md:border-t-black border-b border-gray-500 flex justify-between md:space-x-80 space-x-24 p-3 fixed w-full z-40 md:top-0 md:left-[26rem] top-[4.5rem] right-0">
                                            {/* image  */}
                                            <div className="">
                                                <div className="">
                                                    <Link href={`/user/profile/${userDetails.name}`} className="flex-row flex text-lg font-medium items-center">
                                                        <div className={`border p-1 mr-4 rounded-full ${userDetails.role === 'admin' ? 'border-amber-400' : ''} ${userDetails.tick === 'yes' ? 'border-sky-400' : ''} ${userDetails.tick === 'active' ? 'border-teal-500' : ''}`}>

                                                            {slugDetails.avatar ? (
                                                                <Image src={`/avatars/${slugDetails.avatar}`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-9 h-9 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                                                            ) : (<Image src={`/avatars/dummy.jpeg`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-9 h-9 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />)}
                                                            <span className="sr-only">Search</span>

                                                        </div>

                                                        {/* bio & tick  */}
                                                        <div className="">
                                                            {/* Tick  */}
                                                            <div className="flex flex-row">

                                                                <div className="text-sm flex justify-center items-center pr-2 text-white">{userDetails.name}</div>

                                                                {userDetails.role === 'admin' && (
                                                                    <div className="group">
                                                                        <div className="hover:scale-105">
                                                                            <svg className='flex justify-center items-center text-amber-400'
                                                                                viewBox="0 0 20 20"
                                                                                fill="currentColor"
                                                                                height="1em"
                                                                                width="1em">
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    d="M9.585.52a2.678 2.678 0 00-3.17 0l-.928.68a1.178 1.178 0 01-.518.215L3.83 1.59a2.678 2.678 0 00-2.24 2.24l-.175 1.14a1.178 1.178 0 01-.215.518l-.68.928a2.678 2.678 0 000 3.17l.68.928c.113.153.186.33.215.518l.175 1.138a2.678 2.678 0 002.24 2.24l1.138.175c.187.029.365.102.518.215l.928.68a2.678 2.678 0 003.17 0l.928-.68a1.17 1.17 0 01.518-.215l1.138-.175a2.678 2.678 0 002.241-2.241l.175-1.138c.029-.187.102-.365.215-.518l.68-.928a2.678 2.678 0 000-3.17l-.68-.928a1.179 1.179 0 01-.215-.518L14.41 3.83a2.678 2.678 0 00-2.24-2.24l-1.138-.175a1.179 1.179 0 01-.518-.215L9.585.52zM7.303 1.728c.415-.305.98-.305 1.394 0l.928.68c.348.256.752.423 1.18.489l1.136.174c.51.078.909.478.987.987l.174 1.137c.066.427.233.831.489 1.18l.68.927c.305.415.305.98 0 1.394l-.68.928a2.678 2.678 0 00-.489 1.18l-.174 1.136a1.178 1.178 0 01-.987.987l-1.137.174a2.678 2.678 0 00-1.18.489l-.927.68c-.415.305-.98.305-1.394 0l-.928-.68a2.678 2.678 0 00-1.18-.489l-1.136-.174a1.178 1.178 0 01-.987-.987l-.174-1.137a2.678 2.678 0 00-.489-1.18l-.68-.927a1.178 1.178 0 010-1.394l.68-.928c.256-.348.423-.752.489-1.18l.174-1.136c.078-.51.478-.909.987-.987l1.137-.174a2.678 2.678 0 001.18-.489l.927-.68zM11.28 6.78a.75.75 0 00-1.06-1.06L7 8.94 5.78 7.72a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.75-3.75z"
                                                                                />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {userDetails.tick === 'yes' && (
                                                                    <div className="group">
                                                                        <div className="hover:scale-105 pt-[0.10rem]">
                                                                            <svg className='flex justify-center items-center text-sky-400'
                                                                                viewBox="0 0 20 20"
                                                                                fill="currentColor"
                                                                                height="1em"
                                                                                width="1em">
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    d="M9.585.52a2.678 2.678 0 00-3.17 0l-.928.68a1.178 1.178 0 01-.518.215L3.83 1.59a2.678 2.678 0 00-2.24 2.24l-.175 1.14a1.178 1.178 0 01-.215.518l-.68.928a2.678 2.678 0 000 3.17l.68.928c.113.153.186.33.215.518l.175 1.138a2.678 2.678 0 002.24 2.24l1.138.175c.187.029.365.102.518.215l.928.68a2.678 2.678 0 003.17 0l.928-.68a1.17 1.17 0 01.518-.215l1.138-.175a2.678 2.678 0 002.241-2.241l.175-1.138c.029-.187.102-.365.215-.518l.68-.928a2.678 2.678 0 000-3.17l-.68-.928a1.179 1.179 0 01-.215-.518L14.41 3.83a2.678 2.678 0 00-2.24-2.24l-1.138-.175a1.179 1.179 0 01-.518-.215L9.585.52zM7.303 1.728c.415-.305.98-.305 1.394 0l.928.68c.348.256.752.423 1.18.489l1.136.174c.51.078.909.478.987.987l.174 1.137c.066.427.233.831.489 1.18l.68.927c.305.415.305.98 0 1.394l-.68.928a2.678 2.678 0 00-.489 1.18l-.174 1.136a1.178 1.178 0 01-.987.987l-1.137.174a2.678 2.678 0 00-1.18.489l-.927.68c-.415.305-.98.305-1.394 0l-.928-.68a2.678 2.678 0 00-1.18-.489l-1.136-.174a1.178 1.178 0 01-.987-.987l-.174-1.137a2.678 2.678 0 00-.489-1.18l-.68-.927a1.178 1.178 0 010-1.394l.68-.928c.256-.348.423-.752.489-1.18l.174-1.136c.078-.51.478-.909.987-.987l1.137-.174a2.678 2.678 0 001.18-.489l.927-.68zM11.28 6.78a.75.75 0 00-1.06-1.06L7 8.94 5.78 7.72a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.75-3.75z"
                                                                                />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {userDetails.tick === 'active' && (
                                                                    <div className="group">
                                                                        <div className="hover:scale-105 pt-[0.10rem]">
                                                                            <svg className='flex justify-center items-center text-teal-500'
                                                                                viewBox="0 0 20 20"
                                                                                fill="currentColor"
                                                                                height="1em"
                                                                                width="1em">
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    d="M9.585.52a2.678 2.678 0 00-3.17 0l-.928.68a1.178 1.178 0 01-.518.215L3.83 1.59a2.678 2.678 0 00-2.24 2.24l-.175 1.14a1.178 1.178 0 01-.215.518l-.68.928a2.678 2.678 0 000 3.17l.68.928c.113.153.186.33.215.518l.175 1.138a2.678 2.678 0 002.24 2.24l1.138.175c.187.029.365.102.518.215l.928.68a2.678 2.678 0 003.17 0l.928-.68a1.17 1.17 0 01.518-.215l1.138-.175a2.678 2.678 0 002.241-2.241l.175-1.138c.029-.187.102-.365.215-.518l.68-.928a2.678 2.678 0 000-3.17l-.68-.928a1.179 1.179 0 01-.215-.518L14.41 3.83a2.678 2.678 0 00-2.24-2.24l-1.138-.175a1.179 1.179 0 01-.518-.215L9.585.52zM7.303 1.728c.415-.305.98-.305 1.394 0l.928.68c.348.256.752.423 1.18.489l1.136.174c.51.078.909.478.987.987l.174 1.137c.066.427.233.831.489 1.18l.68.927c.305.415.305.98 0 1.394l-.68.928a2.678 2.678 0 00-.489 1.18l-.174 1.136a1.178 1.178 0 01-.987.987l-1.137.174a2.678 2.678 0 00-1.18.489l-.927.68c-.415.305-.98.305-1.394 0l-.928-.68a2.678 2.678 0 00-1.18-.489l-1.136-.174a1.178 1.178 0 01-.987-.987l-.174-1.137a2.678 2.678 0 00-.489-1.18l-.68-.927a1.178 1.178 0 010-1.394l.68-.928c.256-.348.423-.752.489-1.18l.174-1.136c.078-.51.478-.909.987-.987l1.137-.174a2.678 2.678 0 001.18-.489l.927-.68zM11.28 6.78a.75.75 0 00-1.06-1.06L7 8.94 5.78 7.72a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.75-3.75z"
                                                                                />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {/* bio max 12 */}
                                                            <div className="text-sm flex flex-row text-gray-300 truncate space-x-1">
                                                                <div className="text-xs text-gray-400 truncate">
                                                                    {slugDetails.bio}
                                                                </div>
                                                                <div className="pr-4 text-xs flex justify-center items-center hover:underline text-sky-400">
                                                                    ~{slugDetails.college}
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Chat  */}
                                        <div class="flex flex-col mt-20 overflow-y-auto no-scrollbar">
                                            {/* Default  */}
                                            <div class="flex justify-end mb-4">
                                                <div
                                                    class="mr-2 py-3 px-4 bg-sky-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                                >
                                                    ThePairUp Welcome you to be a part of our #team !
                                                </div>
                                                <Image
                                                    src={'/avatars/TPU-Final-W.png'} width={1000} height={1000}
                                                    class="object-cover h-8 w-8 rounded-full"
                                                    alt=""
                                                />
                                            </div>
                                            <div class="flex justify-start mb-4">
                                                <Image
                                                    src={'/avatars/jim.jpeg'} width={1000} height={1000}
                                                    class="object-cover h-8 w-8 rounded-full"
                                                    alt=""
                                                />
                                                <div
                                                    class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                                                >
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                                                    at praesentium, aut ullam delectus odio error sit rem. Architecto
                                                    nulla doloribus laborum illo rem enim dolor odio saepe,
                                                    consequatur quas?
                                                </div>
                                            </div>

                                            {/* Live  */}
                                            <div class="flex justify-end mb-4">
                                                <div
                                                    class="mr-2 py-3 px-4 bg-sky-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                                >
                                                    ThePairUp Welcome you to be a part of our #team !
                                                </div>
                                                <Image
                                                    src={`/avatars/${userDetails2.avatar}`} width={1000} height={1000}
                                                    class="object-cover h-8 w-8 rounded-full"
                                                    alt=""
                                                />
                                            </div>
                                            <div class="flex justify-start mb-4">
                                                <Image
                                                    src={`/avatars/${slugDetails.avatar}`} width={1000} height={1000}
                                                    class="object-cover h-8 w-8 rounded-full"
                                                    alt=""
                                                />
                                                <div
                                                    class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                                                >
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                                                    at praesentium, aut ullam delectus odio error sit rem. Architecto
                                                    nulla doloribus laborum illo rem enim dolor odio saepe,
                                                    consequatur quas?
                                                </div>
                                            </div>
                                        </div>

                                        {/* comment */}
                                        <div div className="border rounded-3xl border-gray-500 bg-transparent my-4" >
                                            <div>
                                                <div class="relative">
                                                    <input class="block w-full p-4 text-sm text-white rounded-full bg-transparent " placeholder="Write....." required />
                                                    <button onClick={async (e) => {
                                                        e.preventDefault();
                                                    }} type="submit" class="text-white hover:text-sky-400 absolute right-2 bottom-1.5 font-medium rounded-r-full text-sm px-4 py-2">
                                                        <svg aria-label="Share Post" class="x1lliihq x1n2onr6" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share Post</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Extra  */}
                    {params.slug !== userDetails1.name && !userDetails && (
                        <div className="bg-black text-white flex flex-col justify-center h-screen">
                            <div className="text-base flex justify-center underline text-sky-400 mb-6">Sorry, this page isn't available.</div>
                            <div className="flex justify-center px-4">The link you followed may be broken, or the page may have been removed. </div>
                            <div className="mt-6 flex justify-center">
                                <Link href={`/user/profile/${userDetails1.name}`} className="hover:underline">
                                    <button className='p-2 px-3 bg-sky-400 rounded-3xl hover:scale-105'>
                                        Go back.
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <BottomNavbar />
        </>
    )
}

export default chat
