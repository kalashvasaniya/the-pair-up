"use client"
import React from 'react'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Story = () => {
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/'
        }
    }, [])

    return (
        <>
            <div className="mt-20 mb-1 md:mx-12">
                <div className="flex overflow-x-auto space-x-3">

                    {/* Founder  */}
                    <div className="flex flex-col justify-center items-center">
                        <button data-popover-target="popover-hover" data-popover-trigger="hover" type="button" className="border border-amber-400 rounded-full p-1">
                            <Image src={`/avatars/jim.jpeg`} width={1000} height={1000} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-14 h-14  rounded-full cursor-pointer hover:scale-105 object-cover" alt="User dropdown" />
                        </button>
                        <div data-popover id="popover-hover" role="tooltip" class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                            <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                                <h3 class="font-semibold text-gray-900 dark:text-white">Story Feature</h3>
                            </div>
                            <div class="px-3 py-2">
                                <p>Exclusive for Verified and Active Members!
                                    <br />
                                    How to Join the Elite Circle?
                                    <br />
                                    <Link href={'/menu/GuidetoVerification'} className='hover:underline text-sky-400'>Click Here!</Link>
                                    <br />
                                    <Link href={'/user/profile/Founder'} className='text-sky-400 hover:underline flex justify-end'>~ Founder</Link>
                                </p>
                            </div>
                            <div data-popper-arrow>
                            </div>
                        </div>
                        <div className="text-xs">
                            Founder
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Story
