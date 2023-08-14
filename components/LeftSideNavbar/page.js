import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const LeftSideNavbar = () => {
    return (
        <>
            <div className="md:block hidden col-start-11 col-end-13 bg-black h-screen border-l border-gray-500">

                {/* Profile  */}
                <div className="mt-16 px-6">
                    <Link href={'/user/profile'} className="flex-row flex mt-8 text-lg font-medium items-center">
                        <div className="pr-4">
                            <Image src={'/logo.jpeg'} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-11 h-11 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                            <span className="sr-only">Search</span>
                        </div>
                        <div className="">
                            <div className="truncate text-base ">kalashvasaniya</div>

                            {/* bio max 12 */}
                            <div className="text-sm text-gray-500 truncate">RockStar</div>
                        </div>
                    </Link>
                </div>

                {/* Suggestion user  */}
                <div className="mt-10 px-6">
                    <div className="text-base font-semibold underline-offset-2 underline text-sky-400 mb-6">Suggestion for you</div>
                    <div className="flex flex-col space-y-3">
                        <Link href={'/user/profile'} className="flex-row flex text-lg font-medium items-center">
                            <div className="pr-4">
                                <Image src={'/logo1.jpeg'} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-8 h-8 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                                <span className="sr-only">Search</span>
                            </div>
                            <div className="">
                                <div className="text-sm">yuvrajsahni</div>
                            </div>
                        </Link>
                        <Link href={'/user/profile'} className="flex-row flex text-lg font-medium items-center">
                            <div className="pr-4">
                                <Image src={'/logo2.jpeg'} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-8 h-8 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                                <span className="sr-only">Search</span>
                            </div>
                            <div className="">
                                <div className="text-sm">dharanshneema</div>
                            </div>
                        </Link>
                        <Link href={'/user/profile'} className="flex-row flex text-lg font-medium items-center">
                            <div className="pr-4">
                                <Image src={'/logo3.jpeg'} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-8 h-8 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                                <span className="sr-only">Search</span>
                            </div>
                            <div className="">
                                <div className="text-sm">adamyajha</div>
                            </div>
                        </Link>
                        <Link href={'/user/profile'} className="flex-row flex text-lg font-medium items-center">
                            <div className="pr-4">
                                <Image src={'/logo4.jpeg'} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-8 h-8 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                                <span className="sr-only">Search</span>
                            </div>
                            <div className="">
                                <div className="text-sm">aliabhat</div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* suggestion  */}
                <div className="mb-6 mt-10 px-6">
                    <div className="text-base font-semibold underline-offset-2 underline text-sky-400 mb-6">Updates From College</div>
                    <div className="flex flex-col space-y-3 uppercase">
                        <Link href={'https://vtop.vit.ac.in/'} target='_blank' className="hover:underline text-xs"> - FAT Marks are out For 2021 Batch. <span className='text-sky-400'>(26 July 2023)</span></Link>
                        <Link href={'https://vtop.vit.ac.in/'} target='_blank' className="hover:underline text-xs"> - TOP 10 RANK HOLDERS : 38TH ANNUAL CONVOCATION. <span className='text-sky-400'>(26 July 2023)</span></Link>
                        <Link href={'https://vtop.vit.ac.in/'} target='_blank' className="hover:underline text-xs"> - HOSTEL VACATING CONSENT FORM. <span className='text-sky-400'>(26 July 2023)</span></Link>
                        <Link href={'https://vtop.vit.ac.in/'} target='_blank' className="hover:underline text-xs"> - Student got 10th Rank. <span className='text-sky-400'>(26 July 2023)</span></Link>
                    </div>
                    <div className="mt-4">
                        <Link href={'/CollegeUpdate'} className="hover:underline">
                            More...
                        </Link>
                    </div>
                </div>

                {/* Footer LeftSideNavbar  */}
                <div className="mt-12 px-6 text-xs flex flex-col">
                    <div className="flex flex-row space-x-2 text-gray-400">
                        <Link href={'/About'} target='_blank' className="hover:underline">About</Link>
                        <Link href={'/Contact'} target='_blank' className="hover:underline">Contact</Link>
                        <Link href={'https://github.com/kalashvasaniya/the-pair-up/blob/main/SECURITY.md'} target='_blank' className="hover:underline">Privacy</Link>
                        <Link href={'https://6z236yooyhh.typeform.com/to/WP5J4BH1'} target='_blank' className="hover:underline">Feedback</Link>
                    </div>
                    <Link href={''} className="mt-2">
                        © 2023 ThePairUp
                    </Link>
                </div>

            </div>
        </>
    )
}

export default LeftSideNavbar
