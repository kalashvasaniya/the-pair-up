'use client'
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
    const [showTooltip, setShowTooltip] = useState(false);

    const toggleTooltip = () => {
        setShowTooltip(!showTooltip);
    };

    return (
        <>
            <nav className="bg-black fixed w-full z-20 top-0 left-0 border-b">

                {/* top navbar */}
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href={'/Home'} className="flex items-center">
                        {/* <Image src={'/Logo1.png'} alt="kalash" width={60} height={60} /> */}
                        <span className="self-center text-3xl whitespace-nowrap text-white font-extrabold  ">
                            <span className='line-through decoration-white text-[#00B2FF]'>The</span> PairUp</span>
                        <span className='text-4xl font-extrabold text-sky-400'>.</span>
                    </Link>

                    <div className="md:order-4 inline-flex">

                        {/* Profile icon  */}
                        <div className="relative pl-5">
                            <button onClick={toggleTooltip} className="w-10 h-10 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" >
                                <svg width="26" height="18" viewBox="0 0 26 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13 17.5H0.25V14.6667H13V17.5ZM25.75 10.4167H0.25V7.58333H25.75V10.4167ZM25.75 3.33333H13V0.5H25.75V3.33333Z"
                                        fill="#00B2FF" />
                                </svg>
                            </button>

                            {showTooltip && (
                                <div className="absolute z-10 divide-y rounded-lg shadow w-44 bg-gray-700 divide-gray-600 right-0">
                                    <div className="px-4 py-3 text-sm text-white">
                                        <div>Hello, 👋</div>
                                        <div className="font-medium truncate">New User</div>
                                    </div>
                                    <div className="py-1">
                                        <Link href={'/user/signup'} className="flex px-[4.3rem] py-2 text-sm hover:bg-gray-600 text-gray-200">
                                            SignUp
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </nav>

            {/* Fixed Notification */}
            <div className="fixed top-16 left-0 w-full z-30 px-8 mt-8"> {/* Changed to fixed and added z-index */}
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-sm mx-auto max-w-xl">
                    <p className="text-sm">
                        Old version. Try the new <a href="https://college.thepairup.in/" className="font-semibold text-blue-600 hover:text-blue-800 hover:underline">PairUp</a>!
                    </p>
                </div>
            </div>
        </>
    )
}

export default Navbar