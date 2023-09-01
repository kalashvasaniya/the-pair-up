"use client"
import React from 'react'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Story = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/'
        }
    }, [])
    // Create
    const toggleTooltip = () => {
        setShowTooltip(!showTooltip);
    };

    return (
        <>
            <div className="mt-20 mb-1 md:mx-12 border-b border-gray-500 z-50 bg-black ">
                <div className="flex overflow-x-auto space-x-3 mb-1">

                    {/* Founder  */}
                    <div className="relative z-10">
                        <button onClick={toggleTooltip} className="border border-amber-400 rounded-full p-1">
                            <Image src={`/avatars/jim.jpeg`} width={1000} height={1000} className="w-14 h-14  rounded-full cursor-pointer hover:scale-105 object-cover" alt="User dropdown" />
                        </button>
                        <div className="text-xs flex flex-col justify-center items-center">
                            Founder
                        </div>

                        {showTooltip && (
                            <div class="z-10 w-64 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg top-20">
                                <div className="">
                                    <div class="z-10 px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg">
                                        <h3 class="font-semibold text-black">Story Feature</h3>
                                    </div>
                                    <div class="px-3 py-2 text-gray-700">
                                        <p>Exclusive for Verified and Active Members!
                                            <br />
                                            How to Join the Elite Circle?
                                            <br />
                                            <Link href={'/menu/GuidetoVerification'} className='hover:underline text-sky-400'>Click Here!</Link>
                                            <br />
                                            <Link href={'/user/profile/Founder'} className='text-sky-400 hover:underline flex justify-end'>~ Founder</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                </div>
            </div >
        </>
    )
}

export default Story
