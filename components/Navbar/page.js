'use client'
import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <>
            <nav className="bg-black fixed w-full z-20 top-0 left-0 border-b">

                {/* top navbar */}
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href={'/'} className="flex items-center">
                        {/* <Image src={'/Logo1.png'} alt="kalash" width={60} height={60} /> */}
                        <span className="self-center text-3xl whitespace-nowrap text-white font-extrabold  ">
                            <span className='line-through decoration-white text-[#00B2FF]'>The</span> PairUp</span>
                    </Link>

                    <div className="md:order-4 inline-flex">

                        {/* Profile icon  */}
                        <div className="pl-5">
                            <button id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-10 h-10 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" >
                                <svg width="26" height="18" viewBox="0 0 26 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13 17.5H0.25V14.6667H13V17.5ZM25.75 10.4167H0.25V7.58333H25.75V10.4167ZM25.75 3.33333H13V0.5H25.75V3.33333Z"
                                        fill="#00B2FF" />
                                </svg>
                            </button>

                            <div id="userDropdown" className="z-10 hidden divide-y rounded-lg shadow w-44 bg-gray-700 divide-gray-600">
                                <div className="px-4 py-3 text-sm text-white">
                                    <div>Hello, 👋</div>
                                    <div className="font-medium truncate"></div>
                                </div>
                                <div className="py-1">
                                    <Link href={'/user/login'} className="flex px-[4.3rem] py-2 text-sm hover:bg-gray-600 text-gray-200">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </nav >
        </>
    )
}

export default Navbar