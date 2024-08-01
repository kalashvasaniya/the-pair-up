"use client"
import Example from '@/app/UI/Loader/page'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link'

const page = () => {
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

        fetchUserDetails1()
        fetchUserDetails2();
    }, [])

    const fetchUserDetails1 = async () => {
        try {
            const response = await fetch(`api/login`, {
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
            const response = await fetch(`api/details`, {
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
                <div className="text-white bg-black">
                    {/* gmail.com & Unknown */}
                    {(userDetails2.college === 'Dropout?' || !userDetails2.college) && (
                        <div className="flex flex-col justify-center items-center text-3xl font-bold font-mono h-screen">
                            You are not a student of any college yet.
                            <Link href={`${process.env.NEXT_PUBLIC_HOST}/user/Details`} className='bg-sky-500 hover:scale-105 p-2 px-3 rounded-2xl text-xl mt-12'>Edit Profile</Link>
                        </div>
                    )}
                    {/* VIT  */}
                    {userDetails2.college === 'VIT' && (
                        <div className="my-24 px-6 bg-black flex flex-col items-centers text-center h-screen">
                            <div className="text-base underline underline-offset-1 text-sky-400 mb-6">Updates From College</div>
                            <div className="flex flex-col space-y-3 uppercase">
                                <Link href={'https://vtop.vit.ac.in/'} target='_blank' className="hover:underline text-xs"> - FAT Marks are out For 2021 Batch. <span className='text-sky-400'>(26 July 2023)</span></Link>
                                <Link href={'https://vtop.vit.ac.in/'} target='_blank' className="hover:underline text-xs"> - TOP 10 RANK HOLDERS : 38TH ANNUAL CONVOCATION. <span className='text-sky-400'>(14 Febuary 2023)</span></Link>
                                <Link href={'https://vtop.vit.ac.in/'} target='_blank' className="hover:underline text-xs"> - HOSTEL VACATING CONSENT FORM. <span className='text-sky-400'>(24 March 2023)</span></Link>
                                <Link href={'https://vtop.vit.ac.in/'} target='_blank' className="hover:underline text-xs"> - Student got 10th Rank. <span className='text-sky-400'>(2 September 2023)</span></Link>
                            </div>
                            <div className="mt-6">
                                <Link href={'/Home'} className="hover:underline">
                                    <button className='p-2 px-3 bg-sky-400 rounded-3xl hover:scale-105'>
                                        Back
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                    {/* IITGN  */}
                    {userDetails2.college === 'IITGN' && (
                        <div className="my-24 px-6 bg-black flex flex-col items-centers text-center h-screen">
                            <div className="text-base underline underline-offset-1 text-sky-400 mb-6">Updates From College</div>
                            <div className="flex flex-col space-y-3 uppercase">
                                <Link href={'https://vtop.vit.ac.in/'} target='_blank' className="hover:underline text-xs"> - TOP 10 RANK HOLDERS : 38TH ANNUAL CONVOCATION. <span className='text-sky-400'>(26 July 2023)</span></Link>
                                <Link href={'https://vtop.vit.ac.in/'} target='_blank' className="hover:underline text-xs"> - HOSTEL VACATING CONSENT FORM. <span className='text-sky-400'>(26 July 2023)</span></Link>
                                <Link href={'https://vtop.vit.ac.in/'} target='_blank' className="hover:underline text-xs"> - Student got 10th Rank. <span className='text-sky-400'>(26 July 2023)</span></Link>
                            </div>
                            <div className="mt-6">
                                <Link href={'/Home'} className="hover:underline">
                                    <button className='p-2 px-3 bg-sky-400 rounded-3xl hover:scale-105'>
                                        Back
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default page
