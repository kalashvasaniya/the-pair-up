"use client"
import Example from '@/app/UI/Loader/page'
import BottomNavbar from '@/components/BottomNavbar/page'
import RightSideNavbar from '@/components/RightSideNavbar/page'
import React from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useState } from 'react'
import Image from 'next/image'

const chat = ({ params }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [slugDetails, setSlugDetails] = useState(null);
    const [postDetails, setPostDetails] = useState(null);

    const [showLoader, setShowLoader] = useState(false);
    const [userDetails1, setUserDetails1] = useState('');
    const [userDetails2, setUserDetails2] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/'
        }

        setTimeout(() => {
            // After 2 seconds, show the Story
            setShowLoader(true);
        }, 1000);

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

    return (
        <>
            {!showLoader ? (
                // Render the Story component after 2 seconds
                <Example />
            ) : (
                <>
                    <RightSideNavbar />

                    {/* itself Chat  */}
                    {params.slug === userDetails1.name && (
                        <div className="flex text-white flex-col justify-center items-center py-10">
                            Hello Self
                        </div>
                    )}

                    {/* Chat with other  */}
                    {params.slug !== userDetails1.name && slugDetails && userDetails && (
                        <div className="flex text-white flex-col justify-end items-end ">
                            <div class="md:mr-20 shadow-lg rounded-lg max-w-4xl">

                                <div class="flex flex-row justify-between bg-black border-r border-l border-gray-500 rounded-[4rem] p-2 h-screen md:mb-0 mb-20">
                                    {/* Hello {params.slug} */}
                                    <div class="w-full px-5 flex flex-col justify-around">

                                        {/* Name  */}
                                        <div className="bg-black border-b border-gray-500 flex justify-between md:space-x-80 space-x-24 p-3 rounded-t-xl">
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
                                                            <div className="text-sm text-gray-300 truncate">{slugDetails.bio ? (
                                                                <div className="text-xs text-gray-400 truncate">12 April at 09.28 PM</div>
                                                            ) : (
                                                                <div className="text-xs text-green-300 truncate">Click To Edit profile</div>
                                                            )}
                                                            </div>
                                                        </div>

                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Chat  */}
                                        <div class="flex flex-col mt-5 overflow-y-auto">
                                            <div class="flex justify-end mb-4">
                                                <div
                                                    class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                                >
                                                    Welcome to group everyone !
                                                </div>
                                                <img
                                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                                    class="object-cover h-8 w-8 rounded-full"
                                                    alt=""
                                                />
                                            </div>
                                            <div class="flex justify-start mb-4">
                                                <img
                                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
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
                                            <div class="flex justify-end mb-4">
                                                <div>
                                                    <div
                                                        class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                                    >
                                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                                        Magnam, repudiandae.
                                                    </div>

                                                    <div
                                                        class="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                                    >
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                        Debitis, reiciendis!
                                                    </div>
                                                </div>
                                                <img
                                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                                    class="object-cover h-8 w-8 rounded-full"
                                                    alt=""
                                                />
                                            </div>
                                            <div class="flex justify-start mb-4">
                                                <img
                                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                                    class="object-cover h-8 w-8 rounded-full"
                                                    alt=""
                                                />
                                                <div
                                                    class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                                                >
                                                    happy holiday guys!
                                                </div>
                                            </div>
                                            <div class="flex justify-end mb-4">
                                                <div
                                                    class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                                >
                                                    Welcome to group everyone !
                                                </div>
                                                <img
                                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                                    class="object-cover h-8 w-8 rounded-full"
                                                    alt=""
                                                />
                                            </div>
                                            <div class="flex justify-start mb-4">
                                                <img
                                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
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
                                            <div class="flex justify-end mb-4">
                                                <div>
                                                    <div
                                                        class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                                    >
                                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                                        Magnam, repudiandae.
                                                    </div>

                                                    <div
                                                        class="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                                    >
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                        Debitis, reiciendis!
                                                    </div>
                                                </div>
                                                <img
                                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                                    class="object-cover h-8 w-8 rounded-full"
                                                    alt=""
                                                />
                                            </div>
                                            <div class="flex justify-start mb-4">
                                                <img
                                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                                    class="object-cover h-8 w-8 rounded-full"
                                                    alt=""
                                                />
                                                <div
                                                    class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                                                >
                                                    happy holiday guys!
                                                </div>
                                            </div>
                                            <div class="flex justify-end mb-4">
                                                <div
                                                    class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                                >
                                                    Welcome to group everyone !
                                                </div>
                                                <img
                                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                                    class="object-cover h-8 w-8 rounded-full"
                                                    alt=""
                                                />
                                            </div>
                                            <div class="flex justify-start mb-4">
                                                <img
                                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
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
                                            <div class="flex justify-end mb-4">
                                                <div>
                                                    <div
                                                        class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                                    >
                                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                                        Magnam, repudiandae.
                                                    </div>

                                                    <div
                                                        class="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                                    >
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                        Debitis, reiciendis!
                                                    </div>
                                                </div>
                                                <img
                                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                                    class="object-cover h-8 w-8 rounded-full"
                                                    alt=""
                                                />
                                            </div>
                                            <div class="flex justify-start mb-4">
                                                <img
                                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                                    class="object-cover h-8 w-8 rounded-full"
                                                    alt=""
                                                />
                                                <div
                                                    class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                                                >
                                                    happy holiday guys!
                                                </div>
                                            </div>
                                            <div class="flex justify-end mb-4">
                                                <div
                                                    class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                                >
                                                    Welcome to group everyone !
                                                </div>
                                                <img
                                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                                    class="object-cover h-8 w-8 rounded-full"
                                                    alt=""
                                                />
                                            </div>
                                            <div class="flex justify-start mb-4">
                                                <img
                                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
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
                                            <div class="flex justify-end mb-4">
                                                <div>
                                                    <div
                                                        class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                                    >
                                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                                        Magnam, repudiandae.
                                                    </div>

                                                    <div
                                                        class="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                                    >
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                        Debitis, reiciendis!
                                                    </div>
                                                </div>
                                                <img
                                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                                    class="object-cover h-8 w-8 rounded-full"
                                                    alt=""
                                                />
                                            </div>
                                            <div class="flex justify-start mb-4">
                                                <img
                                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                                    class="object-cover h-8 w-8 rounded-full"
                                                    alt=""
                                                />
                                                <div
                                                    class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                                                >
                                                    happy holiday guys!
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

                    <BottomNavbar />

                </>
            )
            }
        </>
    )
}

export default chat
