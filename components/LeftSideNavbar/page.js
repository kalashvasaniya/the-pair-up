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
                console.log("User Details", data);
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
                console.log("User Details", data);
            } else {
                // Handle error
            }
        } catch (error) {
            console.log("hooo")
        }
    };


    return (
        <>
            <div className="md:block hidden col-start-11 col-end-13 bg-black h-screen border-l border-gray-500">

                {/* Profile  */}
                <div className="mt-20 px-6">
                    <Link href={'/user/profile'} className="flex-row flex mt-8 text-lg font-medium items-center">
                        <div className="pr-4">
                            <Image src={`/avatars/${userDetails2.avatar}`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-11 h-11 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                            <span className="sr-only">Search</span>
                        </div>
                        <div className="">
                            <div className="flex flex-row">
                                <div className="text-base flex justify-center items-center pr-2">{userDetails1.name}</div>
                                {userDetails1.role === 'admin' && (
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
                                )}
                                {userDetails1.tick === 'yes' && (
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
                                )}
                                {userDetails1.tick === 'active' && (
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

                {/* Suggestion user  */}
                {/* <div className="mt-10 px-6">
                    <div className="text-base font-semibold underline-offset-2 underline text-sky-400 mb-6">Suggestion for you</div>
                    <div className="flex flex-col space-y-3">
                        <Link href={'/user/profile'} className="flex-row flex text-lg font-medium items-center">
                            <div className="pr-4">
                                <Image src={'/logo1.jpeg'} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-8 h-8 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                                <span className="sr-only">Search</span>
                            </div>
                            <div className="">
                                <div className="text-sm">yuvrajsahni</div>
                            </div>
                        </Link>
                        <Link href={'/user/profile'} className="flex-row flex text-lg font-medium items-center">
                            <div className="pr-4">
                                <Image src={'/logo2.jpeg'} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-8 h-8 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                                <span className="sr-only">Search</span>
                            </div>
                            <div className="">
                                <div className="text-sm">dharanshneema</div>
                            </div>
                        </Link>
                        <Link href={'/user/profile'} className="flex-row flex text-lg font-medium items-center">
                            <div className="pr-4">
                                <Image src={'/logo3.jpeg'} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-8 h-8 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                                <span className="sr-only">Search</span>
                            </div>
                            <div className="">
                                <div className="text-sm">adamyajha</div>
                            </div>
                        </Link>
                        <Link href={'/user/profile'} className="flex-row flex text-lg font-medium items-center">
                            <div className="pr-4">
                                <Image src={'/logo4.jpeg'} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-8 h-8 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                                <span className="sr-only">Search</span>
                            </div>
                            <div className="">
                                <div className="text-sm">aliabhat</div>
                            </div>
                        </Link>
                    </div>
                </div> */}

                {/* suggestion  */}
                <div className="mb-20 mt-20 px-6">
                    <div className="text-base font-semibold underline-offset-2 underline text-sky-400 mb-6">Updates From College</div>
                    <div className="flex flex-col space-y-3 uppercase">
                        <Link href={'https://vtop.vit.ac.in/'} target='_blank' className="hover:underline text-xs"> - FAT Marks are out For 2021 Batch. <span className='text-sky-400'>(26 July 2023)</span></Link>
                        <Link href={'https://vtop.vit.ac.in/'} target='_blank' className="hover:underline text-xs"> - TOP 10 RANK HOLDERS : 38TH ANNUAL CONVOCATION. <span className='text-sky-400'>(26 July 2023)</span></Link>
                        <Link href={'https://vtop.vit.ac.in/'} target='_blank' className="hover:underline text-xs"> - HOSTEL VACATING CONSENT FORM. <span className='text-sky-400'>(26 July 2023)</span></Link>
                        <Link href={'https://vtop.vit.ac.in/'} target='_blank' className="hover:underline text-xs"> - Student got 10th Rank. <span className='text-sky-400'>(26 July 2023)</span></Link>
                    </div>
                    <div className="mt-4">
                        <Link href={'/CollegeUpdate'} className="hover:underline">
                            More...
                        </Link>
                    </div>
                </div>

                {/* Footer LeftSideNavbar  */}
                <div className="mt-12 px-6 text-xs flex flex-col">
                    <div className="flex flex-row space-x-2 text-gray-400">
                        <Link href={'/About'} target='_blank' className="hover:underline">About</Link>
                        <Link href={'/Contact'} target='_blank' className="hover:underline">Contact</Link>
                        <Link href={'https://github.com/kalashvasaniya/the-pair-up/blob/main/SECURITY.md'} target='_blank' className="hover:underline">Privacy</Link>
                        <Link href={'https://6z236yooyhh.typeform.com/to/WP5J4BH1'} target='_blank' className="hover:underline">Feedback</Link>
                    </div>
                    <Link href={''} className="mt-2">
                        © 2023 ThePairUp
                    </Link>
                </div>

            </div>
        </>
    )
}

export default LeftSideNavbar
