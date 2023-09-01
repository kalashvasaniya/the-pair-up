"use client"
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'



const createStory = () => {
    const [userDetails1, setUserDetails1] = useState('');
    const [userDetails2, setUserDetails2] = useState('');

    useEffect(() => {
        fetchUserDetails1()
        fetchUserDetails2()
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
        <div className='text-white'>
            {(userDetails1.name === "Founder") ? (
                <div className='flex flex-col items-center justify-center text-3xl font-bold h-screen'>
                    Founder
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center text-3xl font-bold h-screen'>
                    Coming Soon, Stay tuned to be a part of it.
                </div>
            )}
        </div>
    )
}

export default createStory
