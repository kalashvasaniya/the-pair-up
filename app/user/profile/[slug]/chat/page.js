"use client"
import Example from '@/app/UI/Loader/page'
import BottomNavbar from '@/components/BottomNavbar/page'
import RightSideNavbar from '@/components/RightSideNavbar/page'
import React from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useState } from 'react'

const chat = ({ params }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [slugDetails, setSlugDetails] = useState(null);
    const [postDetails, setPostDetails] = useState(null);

    const [showLoader, setShowLoader] = useState(false);
    const [userDetails1, setUserDetails1] = useState('');
    const [userDetails2, setUserDetails2] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/'
        }

        setTimeout(() => {
            // After 2 seconds, show the Story
            setShowLoader(true);
        }, 1000);

        fetchUserDetails(params.slug);
        fetchUserDetails1();
        fetchUserDetails2();
    }, [])

    const fetchUserDetails = async (slug) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/checkSlug?slug=${slug}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUserDetails(data.user[0]);
                setSlugDetails(data.details[0])
                setPostDetails(data.posts[0])
                console.log("User Details", userDetails, "Slug details:", slugDetails, "post", postDetails)
            } else throw new Error("Something went wrong!");
        } catch (error) {
            console.log(error)
        }
    };

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
            {!showLoader ? (
                // Render the Story component after 2 seconds
                <Example />
            ) : (
                <>
                    <RightSideNavbar />

                    {/* itself Chat  */}
                    {params.slug === userDetails1.name && (
                        <div className="flex text-white flex-col justify-center items-center py-10">
                            Hello Self
                        </div>
                    )}

                    {/* Chat with other  */}
                    {params.slug !== userDetails1.name && slugDetails && userDetails && (
                        <div className="flex text-white flex-col justify-center items-center py-10">
                            Hello {params.slug}
                        </div>
                    )}

                    {/* Extra  */}
                    {params.slug !== userDetails1.name && !userDetails && (
                        <div className="bg-black text-white flex flex-col justify-center h-screen">
                            <div className="text-base flex justify-center underline text-sky-400 mb-6">Sorry, this page isn't available.</div>
                            <div className="flex justify-center px-4">The link you followed may be broken, or the page may have been removed. </div>
                            <div className="mt-6 flex justify-center">
                                <Link href={`/user/profile/${userDetails1.name}`} className="hover:underline">
                                    <button className='p-2 px-3 bg-sky-400 rounded-3xl hover:scale-105'>
                                        Go back.
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}

                    <BottomNavbar />

                </>
            )}
        </>
    )
}

export default chat
