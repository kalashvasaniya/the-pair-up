"use client"
import React from 'react'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Story = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [showTooltip1, setShowTooltip1] = useState(false);
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/'
        }
    }, [])

    // Create
    const toggleTooltip = () => {
        setShowTooltip(!showTooltip);
    };

    const toggleTooltip1 = () => {
        setShowTooltip1(!showTooltip1);
    };

    return (
        <>
            <div className="md:mt-4 mt-20 mb-1 md:mx-12 border-b border-gray-500 z-50 bg-black">
                <div className="flex overflow-x-auto space-x-5 mb-1">

                    {/* Founder  */}
                    <div className="relative z-10 flex flex-col">
                        <button onClick={toggleTooltip1} className="rounded-full p-1 flex justify-center items-center">
                            <Image src={`/avatars/jim.jpeg`} width={1000} height={1000} className="w-[3.25rem] h-[3.25rem] rounded-full cursor-pointer hover:scale-105 border border-amber-400 p-1 object-cover" alt="User dropdown" />
                        </button>
                        <div className="text-xs tracking-wider font-mono flex flex-col justify-center items-center">
                            Founder?
                        </div>

                        {showTooltip1 && (
                            <div class="z-10 w-64 text-sm text-gray-600 bg-gray-700 rounded-lg top-20">
                                <div className="">
                                    <div class="z-10 px-3 py-2 bg-gray-800 border-b border-gray-200 rounded-t-lg">
                                        <h3 class="font-medium text-white">Story Feature</h3>
                                    </div>
                                    <div class="px-3 py-2 text-gray-200">
                                        <p>Exclusive for Verified and Club Members!
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

                    {/* ThePairUp  */}
                    <div className="relative z-10 flex flex-col">
                        <button onClick={toggleTooltip} className="rounded-full p-1 flex justify-center items-center">
                            <Image src={`/avatars/TPU-Final-W.png`} width={1000} height={1000} className="w-[3.25rem] h-[3.25rem] rounded-full cursor-pointer hover:scale-105 border border-teal-500 p-1 object-cover" alt="User dropdown" />
                        </button>
                        <div className="text-xs font-mono flex flex-col justify-center items-center">
                            ThePairUp
                        </div>

                        {showTooltip && (
                            <div class="z-10 w-64 text-sm text-gray-600 bg-gray-700 rounded-lg top-20">
                                <div className="">
                                    <div class="z-10 px-3 py-2 bg-gray-800 border-b border-gray-200 rounded-t-lg">
                                        <h3 class="font-medium text-white">Story Feature</h3>
                                    </div>
                                    <div class="px-3 py-2 text-gray-200">
                                        <p className='mb-2'>Coming Soon, Stay tuned to be a part of it. <span className='text-sky-400'>#TeamPairUp</span>
                                        </p>
                                        <Image src={`/avatars/TPU-Final-W.png`} width={1000} height={1000} className='rounded-lg w-60 h-60'></Image>
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