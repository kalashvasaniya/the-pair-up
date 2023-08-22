"use client"
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Search = () => {
    const [userDetails, setUserDetails] = useState([]);
    const [slugDetails, setSlugDetails] = useState(null);

    // DATE 
    const currentDate = new Date();
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    const monthIndex = currentDate.getMonth();
    const monthName = monthNames[monthIndex];
    const formattedDate = `${currentDate.getDate()} ${monthName} ${currentDate.getFullYear()}`;

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/'
        }
    }, [])

    const searchUser = async (slug) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/searchUser?slug=${slug}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUserDetails(data.users);
                setSlugDetails(data.details)
                console.log("User", userDetails, slugDetails);
            } else {
                throw new Error("Something went wrong!");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="p-4">

                <div id="toast-simple" class="flex items-center w-full max-w-xs p-4 space-x-4 text-white bg-green-500 divide-x divide-gray-200 rounded-lg" role="alert">
                    <svg class="w-5 h-5 text-white rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9" />
                    </svg>
                    <div className="flex flex-col">
                        <div class="pl-4 text-sm font-normal">successfully Login</div>
                        <div class="pl-4 text-xs font-mono text-gray-300">at {formattedDate}</div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Search
