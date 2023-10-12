"use client"
import Example from '@/app/UI/Loader/page'
import BottomNavbar from '@/components/BottomNavbar/page'
import RightSideNavbar from '@/components/RightSideNavbar/page'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const chat = () => {
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/'
        }

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
                <>
                    <RightSideNavbar />

                    <div className="flex text-white flex-col justify-center items-center py-10">
                        Hello lorem1234
                    </div>

                    <BottomNavbar />

                </>
            )}
        </>
    )
}

export default chat
