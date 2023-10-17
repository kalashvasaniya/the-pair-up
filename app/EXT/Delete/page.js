"use client"
import Example from '@/app/UI/Loader/page'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link'

const Delete = () => {
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        // if (!localStorage.getItem('token')) {
        //   window.location.href = '/'
        // }

        setTimeout(() => {
            // After 2 seconds, show the Story
            setShowLoader(true);
        }, 1000);
    }, [])

    return (
        <>
            {!showLoader ? (
                // Render the Story component after 2 seconds
                <Example />
            ) : (
                <div className="text-white bg-black">
                    <div className="h-screen flex flex-col justify-center items-center">
                        <div className="text-4xl font-bold p-10">
                            Soon ...
                        </div>
                        <div className="">
                            <Link href={'/Home'} className='bg-sky-500 hover:scale-105 p-2 px-3 rounded-2xl'>Back</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Delete
