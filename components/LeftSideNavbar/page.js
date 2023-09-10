"use client"
import React from 'react'
import Image from 'next/image'
import { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link'

const LeftSideNavbar = () => {
    const [userDetails1, setUserDetails1] = useState('');
    const [userDetails2, setUserDetails2] = useState('');

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


    return (
        <>
            <div className="md:block hidden col-start-11 col-end-13 bg-black border-l h-screen rounded-l-[5rem] border-gray-500">

                {/* Profile  */}
                <div className="mt-20 px-6">
                    <Link href={`/user/profile/${userDetails1.name}`} className="flex-row flex mt-8 text-lg font-medium items-center">
                        <div className={`border p-1 mr-4 rounded-full ${userDetails1.role === 'admin' ? 'border-amber-400' : ''} ${userDetails1.tick === 'yes' ? 'border-sky-400' : ''} ${userDetails1.tick === 'active' ? 'border-teal-500' : ''}`}>
                            {userDetails2.avatar ? (
                                <Image src={`/avatars/${userDetails2.avatar}`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-11 h-11 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                            ) : (<Image src={`/avatars/dummy.jpeg`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-11 h-11 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />)}
                            <span className="sr-only">Search</span>
                        </div>
                        <div className="">
                            <div className="flex flex-row">
                                <div className="text-base flex justify-center items-center pr-2">{userDetails1.name}</div>
                                {userDetails1.role === 'admin' && (
                                    <div className="relative group">
                                        <div className="hover:scale-105">
                                            <svg className='flex justify-center items-center text-amber-400'
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                height="1em"
                                                width="1em">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9.585.52a2.678 2.678 0 00-3.17 0l-.928.68a1.178 1.178 0 01-.518.215L3.83 1.59a2.678 2.678 0 00-2.24 2.24l-.175 1.14a1.178 1.178 0 01-.215.518l-.68.928a2.678 2.678 0 000 3.17l.68.928c.113.153.186.33.215.518l.175 1.138a2.678 2.678 0 002.24 2.24l1.138.175c.187.029.365.102.518.215l.928.68a2.678 2.678 0 003.17 0l.928-.68a1.17 1.17 0 01.518-.215l1.138-.175a2.678 2.678 0 002.241-2.241l.175-1.138c.029-.187.102-.365.215-.518l.68-.928a2.678 2.678 0 000-3.17l-.68-.928a1.179 1.179 0 01-.215-.518L14.41 3.83a2.678 2.678 0 00-2.24-2.24l-1.138-.175a1.179 1.179 0 01-.518-.215L9.585.52zM7.303 1.728c.415-.305.98-.305 1.394 0l.928.68c.348.256.752.423 1.18.489l1.136.174c.51.078.909.478.987.987l.174 1.137c.066.427.233.831.489 1.18l.68.927c.305.415.305.98 0 1.394l-.68.928a2.678 2.678 0 00-.489 1.18l-.174 1.136a1.178 1.178 0 01-.987.987l-1.137.174a2.678 2.678 0 00-1.18.489l-.927.68c-.415.305-.98.305-1.394 0l-.928-.68a2.678 2.678 0 00-1.18-.489l-1.136-.174a1.178 1.178 0 01-.987-.987l-.174-1.137a2.678 2.678 0 00-.489-1.18l-.68-.927a1.178 1.178 0 010-1.394l.68-.928c.256-.348.423-.752.489-1.18l.174-1.136c.078-.51.478-.909.987-.987l1.137-.174a2.678 2.678 0 001.18-.489l.927-.68zM11.28 6.78a.75.75 0 00-1.06-1.06L7 8.94 5.78 7.72a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.75-3.75z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 p-2 bg-transparent text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            Admin
                                        </div>
                                    </div>
                                )}
                                {userDetails1.tick === 'yes' && (
                                    <div className="relative group">
                                        <div className="hover:scale-105 pt-[0.10rem]">
                                            <svg className='flex justify-center items-center text-sky-400'
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                height="1em"
                                                width="1em">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9.585.52a2.678 2.678 0 00-3.17 0l-.928.68a1.178 1.178 0 01-.518.215L3.83 1.59a2.678 2.678 0 00-2.24 2.24l-.175 1.14a1.178 1.178 0 01-.215.518l-.68.928a2.678 2.678 0 000 3.17l.68.928c.113.153.186.33.215.518l.175 1.138a2.678 2.678 0 002.24 2.24l1.138.175c.187.029.365.102.518.215l.928.68a2.678 2.678 0 003.17 0l.928-.68a1.17 1.17 0 01.518-.215l1.138-.175a2.678 2.678 0 002.241-2.241l.175-1.138c.029-.187.102-.365.215-.518l.68-.928a2.678 2.678 0 000-3.17l-.68-.928a1.179 1.179 0 01-.215-.518L14.41 3.83a2.678 2.678 0 00-2.24-2.24l-1.138-.175a1.179 1.179 0 01-.518-.215L9.585.52zM7.303 1.728c.415-.305.98-.305 1.394 0l.928.68c.348.256.752.423 1.18.489l1.136.174c.51.078.909.478.987.987l.174 1.137c.066.427.233.831.489 1.18l.68.927c.305.415.305.98 0 1.394l-.68.928a2.678 2.678 0 00-.489 1.18l-.174 1.136a1.178 1.178 0 01-.987.987l-1.137.174a2.678 2.678 0 00-1.18.489l-.927.68c-.415.305-.98.305-1.394 0l-.928-.68a2.678 2.678 0 00-1.18-.489l-1.136-.174a1.178 1.178 0 01-.987-.987l-.174-1.137a2.678 2.678 0 00-.489-1.18l-.68-.927a1.178 1.178 0 010-1.394l.68-.928c.256-.348.423-.752.489-1.18l.174-1.136c.078-.51.478-.909.987-.987l1.137-.174a2.678 2.678 0 001.18-.489l.927-.68zM11.28 6.78a.75.75 0 00-1.06-1.06L7 8.94 5.78 7.72a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.75-3.75z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 p-2 bg-transparent text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            Verified
                                        </div>
                                    </div>
                                )}
                                {userDetails1.tick === 'active' && (
                                    <div className="relative group">
                                        <div className="hover:scale-105 pt-[0.10rem]">
                                            <svg className='flex justify-center items-center text-teal-500'
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                height="1em"
                                                width="1em">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9.585.52a2.678 2.678 0 00-3.17 0l-.928.68a1.178 1.178 0 01-.518.215L3.83 1.59a2.678 2.678 0 00-2.24 2.24l-.175 1.14a1.178 1.178 0 01-.215.518l-.68.928a2.678 2.678 0 000 3.17l.68.928c.113.153.186.33.215.518l.175 1.138a2.678 2.678 0 002.24 2.24l1.138.175c.187.029.365.102.518.215l.928.68a2.678 2.678 0 003.17 0l.928-.68a1.17 1.17 0 01.518-.215l1.138-.175a2.678 2.678 0 002.241-2.241l.175-1.138c.029-.187.102-.365.215-.518l.68-.928a2.678 2.678 0 000-3.17l-.68-.928a1.179 1.179 0 01-.215-.518L14.41 3.83a2.678 2.678 0 00-2.24-2.24l-1.138-.175a1.179 1.179 0 01-.518-.215L9.585.52zM7.303 1.728c.415-.305.98-.305 1.394 0l.928.68c.348.256.752.423 1.18.489l1.136.174c.51.078.909.478.987.987l.174 1.137c.066.427.233.831.489 1.18l.68.927c.305.415.305.98 0 1.394l-.68.928a2.678 2.678 0 00-.489 1.18l-.174 1.136a1.178 1.178 0 01-.987.987l-1.137.174a2.678 2.678 0 00-1.18.489l-.927.68c-.415.305-.98.305-1.394 0l-.928-.68a2.678 2.678 0 00-1.18-.489l-1.136-.174a1.178 1.178 0 01-.987-.987l-.174-1.137a2.678 2.678 0 00-.489-1.18l-.68-.927a1.178 1.178 0 010-1.394l.68-.928c.256-.348.423-.752.489-1.18l.174-1.136c.078-.51.478-.909.987-.987l1.137-.174a2.678 2.678 0 001.18-.489l.927-.68zM11.28 6.78a.75.75 0 00-1.06-1.06L7 8.94 5.78 7.72a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.75-3.75z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 p-2 bg-transparent text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            Club
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* bio max 12 */}
                            <div className="text-sm text-gray-400 truncate">{userDetails2.bio ? (
                                <div className="text-sm text-gray-500 truncate">{userDetails2.bio}</div>
                            ) : (
                                <div className="text-sm text-green-500 truncate">Click To Edit profile</div>
                            )}</div>
                        </div>
                    </Link>
                </div>

                {/* User Updateds  */}
                <div className="mt-10 mb-10 space-y-3 px-4">
                    <div class="w-full p-4 text-gray-100 bg-gray-800 rounded-lg">
                        <div class="flex">
                            <div class="ml-3 text-sm font-normal">
                                <div class="mb-2 text-sm font-normal">Hi <Link href={`${process.env.NEXT_PUBLIC_HOST}/user/profile/${userDetails1.name}`} className='text-sky-500 hover:underline'>{userDetails1.name}</Link>, "Your presence in The PairUp makes it a more vibrant and interesting place."</div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full p-4 text-gray-100 bg-gray-800 rounded-lg">
                        <div class="flex">
                            <div class="ml-3 text-sm font-normal">
                                <div class="mb-2 text-sm font-normal">We're expanding PairUp to the whole world! But first, we need your honest <Link href={'https://6z236yooyhh.typeform.com/to/WP5J4BH1'} className='text-sky-500 hover:underline' target='_blank'>Feedback</Link> to make it even better.</div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full p-4 text-gray-100 bg-gray-800 rounded-lg">
                        <div class="flex">
                            <div class="ml-3 text-sm font-normal">
                                <div class="mb-2 text-sm font-normal">"PairUp, is an exclusive for the exceptional scholars of VIT Student, where only <span className='underline decoration-sky-400 '>4 colleges </span>unite."</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CollegeUpdate  */}
                <div className="mt-10 px-6">
                    <Link href={'/EXT/CollegeUpdate'} className="text-base font-mono font-semibold underline-offset-2 hover:underline text-sky-400 mb-6">College Updates</Link>
                </div>

                {/* Footer LeftSideNavbar  */}
                <div className="mt-8 px-6 text-xs flex flex-col">
                    <div className="flex flex-row space-x-2 text-gray-400">
                        <Link href={'/EXT/About'} className="hover:underline">About</Link>
                        <Link href={'/EXT/Contact'} className="hover:underline">Contact</Link>
                        <Link href={'/EXT/Security'} className="hover:underline">Security</Link>
                        <Link href={'https://6z236yooyhh.typeform.com/to/WP5J4BH1'} target='_blank' className="hover:underline">Feedback</Link>
                    </div>
                    <Link href={''} className="mt-2">
                        © 2023 ThePairUp
                    </Link>
                </div>

            </div >
        </>
    )
}

export default LeftSideNavbar