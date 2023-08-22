"use client"
import React from 'react'
import { useEffect } from 'react'
import Story from './Story/page'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Feed = () => {
    const [userDetails1, setUserDetails1] = useState('');
    const [userDetails2, setUserDetails2] = useState('');

    const [showTooltip2, setShowTooltip2] = useState(false);

    const [isIcon, setIsIcon] = useState(false);

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

    // Like 
    const handleButtonClick = () => {
        setIsIcon(!isIcon);
    };
    // Delete
    const toggleTooltip2 = () => {
        setShowTooltip2(!showTooltip2);
    };

    return (
        <>
            <Story />

            <div className="flex justify-center">
                <div className="md:max-w-xl space-y-6 mt-4 mb-32">

                    {/* User Details */}
                    <div className="flex flex-col bg-gray-800 rounded-xl">
                        {/* Name  */}
                        <div className="bg-gray-800 flex justify-between md:space-x-80 space-x-24 p-3 rounded-t-xl">
                            {/* image  */}
                            <div className="">
                                <div className="">
                                    <Link href={`/user/profile/${userDetails1.name}`} className="flex-row flex text-lg font-medium items-center">
                                        <div className={`border p-1 mr-4 rounded-full ${userDetails1.role === 'admin' ? 'border-amber-400' : ''} ${userDetails1.tick === 'yes' ? 'border-sky-400' : ''} ${userDetails1.tick === 'active' ? 'border-teal-500' : ''}`}>

                                            {userDetails2.avatar ? (
                                                <Image src={`/avatars/${userDetails2.avatar}`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-9 h-9 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                                            ) : (<Image src={`/avatars/dummy.jpeg`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-9 h-9 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />)}
                                            <span className="sr-only">Search</span>

                                        </div>

                                        {/* bio & tick  */}
                                        <div className="">
                                            {/* Tick  */}
                                            <div className="flex flex-row">

                                                <div className="text-sm flex justify-center items-center pr-2">{userDetails1.name}</div>

                                                {userDetails1.role === 'admin' && (
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
                                                {userDetails1.tick === 'yes' && (
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
                                                {userDetails1.tick === 'active' && (
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
                                            <div className="text-sm text-gray-300 truncate">{userDetails2.bio ? (
                                                <div className="text-xs text-gray-400 truncate">12 April at 09.28 PM</div>
                                            ) : (
                                                <div className="text-xs text-green-300 truncate">Click To Edit profile</div>
                                            )}</div>
                                        </div>

                                    </Link>
                                </div>
                            </div>

                            {/* 3 dots  */}
                            <div className="relative">
                                <div onClick={toggleTooltip2} className="cursor-pointer  hover:bg-sky-400 rounded-full">
                                    <svg aria-label="More Options" class="_ab6-" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                                </div>

                                {showTooltip2 && (
                                    <div class="z-10 absolute text-white bg-gray-700 divide-y divide-gray-100 rounded-lg shadow w-52 top-6 right-0">
                                        <div class="flex flex-col justify-center py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownTopButton">
                                            <button class="flex justify-center px-4 py-3 hover:bg-gray-600 text-white">Detele Post</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <hr className='mx-4 border-gray-500' />

                        {/* Post  */}
                        <div className="mx-4 border-gray-500 text-sm py-4 px-2">
                            Post Here Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat dignissimos suscipit nemo veniam similique laborum nostrum, saepe atque maiores. Sit animi laborum reprehenderit veniam, <Image src={'/avatars/hedgehog-cute-cartoon-animal-funny-maths-shape-vector-47404491.webp'} width={1000} height={1000} className='mt-4 rounded-xl'></Image>
                        </div>

                        <hr className='mx-4 border-gray-500' />

                        {/* Comment & Likes  */}
                        <div className="bg-gray-800 flex justify-between p-1">
                            <div className="flex flex-row space-x-4">

                                <button onClick={handleButtonClick} className="pl-4 flex flex-row justify-center items-center space-x-2">

                                    {!isIcon ? (
                                        <svg
                                            viewBox="0 0 1024 1024"
                                            fill="currentColor"
                                            className='hover:scale-105 w-7 h-7 flex justify-center items-center mb-1'
                                            height="1em"
                                            width="1em"
                                        >
                                            <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            viewBox="0 0 1024 1024"
                                            fill="currentColor"
                                            height="1em"
                                            width="1em"
                                            className='hover:scale-105 w-7 h-7 flex justify-center items-center mb-1'
                                        >
                                            <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" />
                                        </svg>)}

                                    <Link className='text-xs flex justify-center items-center hover:underline' href={''}>23 Likes</Link>
                                </button>

                                <button className="px-4 flex flex-row justify-center items-center space-x-2">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        height="1em"
                                        width="1em"
                                        className='hover:scale-105 w-6 h-6 flex justify-center items-center mb-1'
                                    >
                                        <path d="M9 22a1 1 0 01-1-1v-3H4a2 2 0 01-2-2V4a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29H9m1-6v3.08L13.08 16H20V4H4v12h6z" />
                                    </svg>
                                    <Link className='text-xs flex justify-center items-center hover:underline' href={''}>7 Comments</Link>
                                </button>

                            </div>
                        </div>

                        <hr className='mx-4 border-gray-500' />

                        {/* Likes & comments  */}
                        <div className="bg-gray-800 p-3 rounded-b-xl">

                            <form>
                                <div class="relative">
                                    <input class="block w-full p-4 text-sm text-white rounded-full bg-gray-700" placeholder="Write comment" required />
                                    <button type="submit" class="text-white hover:text-sky-400 absolute right-2 bottom-1.5 font-medium rounded-r-full text-sm px-4 py-2">
                                        <svg aria-label="Share Post" class="x1lliihq x1n2onr6" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share Post</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>
                                        </svg>
                                    </button>
                                </div>
                            </form>

                        </div>

                    </div>

                    {/* User Details */}
                    <div className="flex flex-col bg-gray-800 rounded-xl">
                        {/* Name  */}
                        <div className="bg-gray-800 flex justify-between md:space-x-80 space-x-24 p-3 rounded-t-xl">
                            {/* image  */}
                            <div className="">
                                <div className="">
                                    <Link href={`/user/profile/${userDetails1.name}`} className="flex-row flex text-lg font-medium items-center">
                                        <div className={`border p-1 mr-4 rounded-full ${userDetails1.role === 'admin' ? 'border-amber-400' : ''} ${userDetails1.tick === 'yes' ? 'border-sky-400' : ''} ${userDetails1.tick === 'active' ? 'border-teal-500' : ''}`}>

                                            {userDetails2.avatar ? (
                                                <Image src={`/avatars/${userDetails2.avatar}`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-9 h-9 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                                            ) : (<Image src={`/avatars/dummy.jpeg`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-9 h-9 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />)}
                                            <span className="sr-only">Search</span>

                                        </div>

                                        {/* bio & tick  */}
                                        <div className="">
                                            {/* Tick  */}
                                            <div className="flex flex-row">

                                                <div className="text-sm flex justify-center items-center pr-2">{userDetails1.name}</div>

                                                {userDetails1.role === 'admin' && (
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
                                                {userDetails1.tick === 'yes' && (
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
                                                {userDetails1.tick === 'active' && (
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
                                            <div className="text-sm text-gray-300 truncate">{userDetails2.bio ? (
                                                <div className="text-xs text-gray-400 truncate">12 April at 09.28 PM</div>
                                            ) : (
                                                <div className="text-xs text-green-300 truncate">Click To Edit profile</div>
                                            )}</div>
                                        </div>

                                    </Link>
                                </div>
                            </div>

                            {/* 3 dots  */}
                            <button className="">
                                <svg aria-label="More Options" class="_ab6-" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                            </button>
                        </div>

                        <hr className='mx-4 border-gray-500' />

                        {/* Post  */}
                        <div className="mx-4 border-gray-500 text-sm py-4 px-2">
                            Post Here Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat dignissimos suscipit nemo veniam similique laborum nostrum, saepe atque maiores. Sit animi laborum reprehenderit veniam, <Image src={'/logo.jpeg'} width={1000} height={1000} className='mt-4 rounded-xl'></Image>
                        </div>

                        <hr className='mx-4 border-gray-500' />

                        {/* Comment & Likes  */}
                        <div className="bg-gray-800 flex justify-between p-1">
                            <div className="flex flex-row space-x-4">

                                <button onClick={handleButtonClick} className="pl-4 flex flex-row justify-center items-center space-x-2">

                                    {!isIcon ? (
                                        <svg
                                            viewBox="0 0 1024 1024"
                                            fill="currentColor"
                                            className='hover:scale-105 w-7 h-7 flex justify-center items-center mb-1'
                                            height="1em"
                                            width="1em"
                                        >
                                            <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            viewBox="0 0 1024 1024"
                                            fill="currentColor"
                                            height="1em"
                                            width="1em"
                                            className='hover:scale-105 w-7 h-7 flex justify-center items-center mb-1'
                                        >
                                            <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" />
                                        </svg>)}

                                    <Link className='text-xs flex justify-center items-center hover:underline' href={''}>23 Likes</Link>
                                </button>

                                <button className="px-4 flex flex-row justify-center items-center space-x-2">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        height="1em"
                                        width="1em"
                                        className='hover:scale-105 w-6 h-6 flex justify-center items-center mb-1'
                                    >
                                        <path d="M9 22a1 1 0 01-1-1v-3H4a2 2 0 01-2-2V4a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29H9m1-6v3.08L13.08 16H20V4H4v12h6z" />
                                    </svg>
                                    <Link className='text-xs flex justify-center items-center hover:underline' href={''}>7 Comments</Link>
                                </button>

                            </div>
                        </div>

                        <hr className='mx-4 border-gray-500' />

                        {/* Likes & comments  */}
                        <div className="bg-gray-800 p-3 rounded-b-xl">

                            <form>
                                <div class="relative">
                                    <input class="block w-full p-4 text-sm text-white rounded-full bg-gray-700" placeholder="Write comment" required />
                                    <button type="submit" class="text-white hover:text-sky-400 absolute right-2 bottom-1.5 font-medium rounded-r-full text-sm px-4 py-2">
                                        <svg aria-label="Share Post" class="x1lliihq x1n2onr6" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share Post</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>
                                        </svg>
                                    </button>
                                </div>
                            </form>

                        </div>

                    </div>

                </div>
            </div>
        </>

    )
}

export default Feed