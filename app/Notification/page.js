"use client"
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Search = () => {
    const [userDetails, setUserDetails] = useState([]);
    const [slugDetails, setSlugDetails] = useState(null);

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
                Hello Notification
            </div>
        </>
    )
}

export default Search
