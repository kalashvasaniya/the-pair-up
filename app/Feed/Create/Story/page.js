"use client"
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link'

const createStory = () => {
    const [userDetails1, setUserDetails1] = useState('');
    const [userDetails2, setUserDetails2] = useState('');

    useEffect(() => {
        fetchUserDetails1()
        fetchUserDetails2()
    }, [])

    const fetchUserDetails1 = async () => {
        try {
            const response = await fetch(`/api/login`, {
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
            const response = await fetch(`/api/details`, {
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
        <div className='text-white'>
            {(userDetails1.role === "admin") && (
                <div className='flex flex-col items-center justify-center text-3xl font-bold h-screen'>
                    Founder's Property
                    <Link href={`/Home`} className='bg-sky-500 hover:scale-105 p-2 px-3 rounded-2xl text-xl mt-12'>Back</Link>
                </div>
            )}
            {(userDetails1.tick === "active" || userDetails1.tick === "yes") && (
                <div className='flex flex-col items-center justify-center text-3xl font-bold h-screen text-center'>
                    Coming Soon, Stay tuned to be a part of it.
                    <Link href={`/Home`} className='bg-sky-500 hover:scale-105 p-2 px-3 rounded-2xl text-xl mt-12'>Back</Link>
                </div>
            )}
            {(userDetails1.tick === "no") && (
                <div className="">
                    <div className='flex flex-col items-center justify-center text-3xl font-bold h-screen text-center'>
                        Only Verified members & Clubs are allowed to create Story :(
                        <Link href={`/Home`} className='bg-sky-500 hover:scale-105 p-2 px-3 rounded-2xl text-xl mt-12'>Back</Link>
                    </div>

                </div>
            )}
        </div>
    )
}

export default createStory
