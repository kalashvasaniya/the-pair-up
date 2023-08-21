"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const BottomNavbar = () => {
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
            {/* bottom navbar */}
            < nav className='md:hidden bg-sky-400 z-50 ' >
                <div className="fixed z-50 w-full h-16 max-w-xs -translate-x-1/2 border border-gray-500 bg-black rounded-full bottom-4 left-1/2">
                    <div className="grid h-full max-w-lg grid-cols-5 mx-auto">

                        <Link href={'/Home'} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-800 rounded-l-full group">
                            <svg className="w-6 h-6 mb-1 text-sky-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                            </svg>
                            <span className="sr-only">Home</span>
                        </Link>

                        <Link href={'/Search'} type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-800 group">
                            <svg className="w-6 h-6 text-sky-400 group-hover:text-sky-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Search</span>
                        </Link>

                        <div className="hover:bg-gray-800 flex justify-center items-center group">
                            <Link href={'/Home'} type="button" className="flex items-center justify-center w-10 h-10 font-medium group">
                                <svg className='w-7 h-7 text-sky-400 group-hover:text-sky-400' aria-label="New post" class="_ab6-" color="rgb(0, 178, 255)" fill="rgb(0, 178, 255)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
                            </Link>
                        </div>

                        <Link href={'/Intrested'} type="button" className="inline-flex flex-col items-center justify-center px-1 hover:bg-gray-800 group">
                            <Image width={32} height={28} src={'/live-7.png'}></Image>
                            <span className="sr-only">Search</span>
                        </Link>

                        <Link href={`/user/profile/${userDetails1.name}`} className="flex justify-center items-center">
                            {userDetails2.avatar ? (
                                <Image src={`/avatars/${userDetails2.avatar}`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-10 h-10 rounded-full cursor-pointer hover:scale-105" alt="User dropdown" />
                            ) : (<Image src={`/avatars/dummy.jpeg`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-10 h-10 rounded-full cursor-pointer hover:scale-105" alt="User dropdown" />)}
                            <span className="sr-only">Search</span>
                        </Link>

                    </div>
                </div>
            </ nav>
        </>
    )
}

export default BottomNavbar
