"use client"
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RightSideNavbar from '@/components/RightSideNavbar/page'
import BottomNavbar from '@/components/BottomNavbar/page'

const Post = () => {
    const [userDetails1, setUserDetails1] = useState('');
    const [userDetails2, setUserDetails2] = useState('');

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

    return (
        <>
            <RightSideNavbar />

            <div className="flex justify-center items-center">

                <div className="md:max-w-xl space-y-6 py-16 flex flex-col justify-center items-center px-4">

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

                            <div className="mx-4 border-gray-500 text-sm py-4 px-2">
                                {/* Input Area */}
                                <div className="mb-4">
                                    <label htmlFor="inputField" className="block text-gray-700">Input Field</label>
                                    <input
                                        type="text"
                                        id="inputField"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                        placeholder="Enter text here"
                                    />
                                </div>

                                {/* Image Area */}
                                <div className="mb-4">
                                    <label htmlFor="imageUpload" className="block text-gray-700">Image Upload</label>
                                    <input
                                        type="file"
                                        id="imageUpload"
                                        className="hidden"
                                        accept="image/*"
                                    />
                                    <label
                                        htmlFor="imageUpload"
                                        className="block px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
                                    >
                                        Upload Image
                                    </label>
                                </div>

                                {/* Other content within the div */}
                            </div>

                        </div>

                        <hr className='mx-4 border-gray-500' />

                        {/* Likes & comments  */}
                        <div className="bg-gray-800 p-3 rounded-b-xl">

                            <form>
                                <div class="flex flex-row justify-end">
                                    <button type="submit" class="hover:text-white text-sky-500 hover:bg-sky-500 rounded-full text-lg px-4 py-1 font-bold">
                                        Post
                                    </button>
                                </div>
                            </form>

                        </div>

                    </div>

                </div>

            </div>
            <BottomNavbar />
        </>

    )
}

export default Post