"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import { useTPU } from '@/app/layout'

const BottomNavbar = () => {
    const { logout } = useTPU();

    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         window.location.href = '/'
    //     }
    // }, [])

    return (
        <>
            {/* bottom navbar */}
            < nav className='md:hidden' >
                <div className="fixed z-50 w-full h-16 max-w-xs -translate-x-1/2 border rounded-full bottom-4 left-1/2">
                    <div className="grid h-full max-w-lg grid-cols-5 mx-auto">

                        <Link href={'/Home'} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-800 rounded-l-full group">
                            <svg className="w-6 h-6 mb-1 text-sky-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                            </svg>
                            <span className="sr-only">Home</span>
                        </Link>

                        <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-800 group">
                            <svg className="w-6 h-6 text-gray-100 group-hover:text-sky-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Search</span>
                        </button>

                        <div className="hover:bg-gray-800 flex justify-center items-center group">
                            <Link href={'/Home'} type="button" className="flex items-center justify-center w-10 h-10 font-medium group rounded-full border hover:border-white">
                                <svg className="w-6 h-6 text-gray-100 group-hover:text-sky-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"></path>
                                </svg>
                                <span className="sr-only">New item</span>
                            </Link>
                        </div>

                        <Link href={'/Home'} type="button" className="inline-flex flex-col items-center justify-center px-1 hover:bg-gray-800 group">
                            <Image width={32} height={28} src={'/live-6.png'}></Image>
                            <span className="sr-only">Search</span>
                        </Link>

                        <div className="flex justify-center items-center">
                            <Image src={'/logo.jpeg'} width={100} height={100} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-10 h-10 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />

                            <div id="userDropdown" className="z-10 hidden divide-y rounded-lg shadow w-44 bg-gray-700 divide-gray-600">
                                <div className="flex justify-center py-4 text-sm text-white">
                                    <div className='font-mono'>Go to <Link href={'/user/profile'} className='text-sky-400 hover:underline underline-offset-2'>Profile</Link></div>
                                </div>
                                <div className="py-1">
                                    <button onClick={logout} className="flex px-[4rem] py-2 text-sm hover:bg-gray-600 text-gray-200">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </ nav>
        </>
    )
}

export default BottomNavbar
