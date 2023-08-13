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
            < nav className='md:hidden bg-black' >
                <div className="fixed z-50 w-full h-16 max-w-xs -translate-x-1/2 border rounded-full bottom-4 left-1/2">
                    <div className="grid h-full max-w-lg grid-cols-5 mx-auto">

                        <Link href={'/Home'} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-800 rounded-l-full group">
                            <svg className="w-6 h-6 mb-1 text-sky-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                            </svg>
                            <span className="sr-only">Home</span>
                        </Link>

                        <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-800 group">
                            <svg className="w-6 h-6 text-sky-400 group-hover:text-sky-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Search</span>
                        </button>

                        <div className="hover:bg-gray-800 flex justify-center items-center group">
                            <Link href={'/Home'} type="button" className="flex items-center justify-center w-10 h-10 font-medium group">
                                <svg className='w-7 h-7 text-sky-400 group-hover:text-sky-400' aria-label="New post" class="_ab6-" color="rgb(0, 178, 255)" fill="rgb(0, 178, 255)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
                            </Link>
                        </div>

                        <Link href={'/Home'} type="button" className="inline-flex flex-col items-center justify-center px-1 hover:bg-gray-800 group">
                            <Image width={32} height={28} src={'/live-7.png'}></Image>
                            <span className="sr-only">Search</span>
                        </Link>

                        <Link href={'/user/profile'} className="flex justify-center items-center">
                            <Image src={'/logo.jpeg'} width={100} height={100} className="w-10 h-10 rounded-full cursor-pointer hover:scale-110" alt="Image" />
                        </Link>

                    </div>
                </div>
            </ nav>
        </>
    )
}

export default BottomNavbar
