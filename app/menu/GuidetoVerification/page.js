"use client"
import Navbar from '@/components/Navbar/page'
import React from 'react'
import Link from 'next/link'
import { useEffect } from 'react'

const GuidetoVerification = () => {
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/'
        }
    }, [])
    return (
        <>
            <Navbar />
            <div className="text-white bg-black h-screen">
                <section class="px-8 flex flex-col justify-center items-center py-40">
                    <div class="flex flex-col space-y-16">
                        <div class="">
                            <div class="flex border-2 rounded-lg p-8 sm:flex-row flex-col">
                                <div class="flex md:mr-8 mb-2 items-center justify-center">
                                    <div className="hover:scale-105 flex items-center justify-center">
                                        <svg className='flex justify-center items-center text-amber-400 w-10 h-10'
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            height="1em"
                                            width="1em">
                                            <path
                                                fillRule="evenodd"
                                                d="M9.585.52a2.678 2.678 0 00-3.17 0l-.928.68a1.178 1.178 0 01-.518.215L3.83 1.59a2.678 2.678 0 00-2.24 2.24l-.175 1.14a1.178 1.178 0 01-.215.518l-.68.928a2.678 2.678 0 000 3.17l.68.928c.113.153.186.33.215.518l.175 1.138a2.678 2.678 0 002.24 2.24l1.138.175c.187.029.365.102.518.215l.928.68a2.678 2.678 0 003.17 0l.928-.68a1.17 1.17 0 01.518-.215l1.138-.175a2.678 2.678 0 002.241-2.241l.175-1.138c.029-.187.102-.365.215-.518l.68-.928a2.678 2.678 0 000-3.17l-.68-.928a1.179 1.179 0 01-.215-.518L14.41 3.83a2.678 2.678 0 00-2.24-2.24l-1.138-.175a1.179 1.179 0 01-.518-.215L9.585.52zM7.303 1.728c.415-.305.98-.305 1.394 0l.928.68c.348.256.752.423 1.18.489l1.136.174c.51.078.909.478.987.987l.174 1.137c.066.427.233.831.489 1.18l.68.927c.305.415.305.98 0 1.394l-.68.928a2.678 2.678 0 00-.489 1.18l-.174 1.136a1.178 1.178 0 01-.987.987l-1.137.174a2.678 2.678 0 00-1.18.489l-.927.68c-.415.305-.98.305-1.394 0l-.928-.68a2.678 2.678 0 00-1.18-.489l-1.136-.174a1.178 1.178 0 01-.987-.987l-.174-1.137a2.678 2.678 0 00-.489-1.18l-.68-.927a1.178 1.178 0 010-1.394l.68-.928c.256-.348.423-.752.489-1.18l.174-1.136c.078-.51.478-.909.987-.987l1.137-.174a2.678 2.678 0 001.18-.489l.927-.68zM11.28 6.78a.75.75 0 00-1.06-1.06L7 8.94 5.78 7.72a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.75-3.75z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div class="md:block flex flex-col justify-center items-center">
                                    <h2 class="text-sky-400 text-lg font-bold mb-3">Admin</h2>
                                    <p class="leading-relaxed text-base">"Admin Verification: Exclusive for Founders, Team Leaders, and Core Members"</p>
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <div class="flex border-2 rounded-lg p-8 sm:flex-row flex-col">
                                <div class="flex md:mr-8 mb-2 items-center justify-center">
                                    <div className="hover:scale-105 flex items-center justify-center">
                                        <svg className='flex justify-center items-center text-sky-400 w-10 h-10'
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            height="1em"
                                            width="1em">
                                            <path
                                                fillRule="evenodd"
                                                d="M9.585.52a2.678 2.678 0 00-3.17 0l-.928.68a1.178 1.178 0 01-.518.215L3.83 1.59a2.678 2.678 0 00-2.24 2.24l-.175 1.14a1.178 1.178 0 01-.215.518l-.68.928a2.678 2.678 0 000 3.17l.68.928c.113.153.186.33.215.518l.175 1.138a2.678 2.678 0 002.24 2.24l1.138.175c.187.029.365.102.518.215l.928.68a2.678 2.678 0 003.17 0l.928-.68a1.17 1.17 0 01.518-.215l1.138-.175a2.678 2.678 0 002.241-2.241l.175-1.138c.029-.187.102-.365.215-.518l.68-.928a2.678 2.678 0 000-3.17l-.68-.928a1.179 1.179 0 01-.215-.518L14.41 3.83a2.678 2.678 0 00-2.24-2.24l-1.138-.175a1.179 1.179 0 01-.518-.215L9.585.52zM7.303 1.728c.415-.305.98-.305 1.394 0l.928.68c.348.256.752.423 1.18.489l1.136.174c.51.078.909.478.987.987l.174 1.137c.066.427.233.831.489 1.18l.68.927c.305.415.305.98 0 1.394l-.68.928a2.678 2.678 0 00-.489 1.18l-.174 1.136a1.178 1.178 0 01-.987.987l-1.137.174a2.678 2.678 0 00-1.18.489l-.927.68c-.415.305-.98.305-1.394 0l-.928-.68a2.678 2.678 0 00-1.18-.489l-1.136-.174a1.178 1.178 0 01-.987-.987l-.174-1.137a2.678 2.678 0 00-.489-1.18l-.68-.927a1.178 1.178 0 010-1.394l.68-.928c.256-.348.423-.752.489-1.18l.174-1.136c.078-.51.478-.909.987-.987l1.137-.174a2.678 2.678 0 001.18-.489l.927-.68zM11.28 6.78a.75.75 0 00-1.06-1.06L7 8.94 5.78 7.72a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.75-3.75z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div class="md:block flex flex-col justify-center items-center">
                                    <h2 class="text-sky-400 text-lg font-bold mb-3">Verified</h2>
                                    <p class="leading-relaxed text-base">"Verification Requirements: Earn the Verification Checkmark with a Minimum of 1000 Followers"</p>
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <div class="flex border-2 rounded-lg p-8 sm:flex-row flex-col">
                                <div class="flex md:mr-8 mb-2 items-center justify-center">
                                    <div className="hover:scale-105 flex items-center justify-center">
                                        <svg className='flex justify-center items-center text-pink-400 w-10 h-10'
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            height="1em"
                                            width="1em">
                                            <path
                                                fillRule="evenodd"
                                                d="M9.585.52a2.678 2.678 0 00-3.17 0l-.928.68a1.178 1.178 0 01-.518.215L3.83 1.59a2.678 2.678 0 00-2.24 2.24l-.175 1.14a1.178 1.178 0 01-.215.518l-.68.928a2.678 2.678 0 000 3.17l.68.928c.113.153.186.33.215.518l.175 1.138a2.678 2.678 0 002.24 2.24l1.138.175c.187.029.365.102.518.215l.928.68a2.678 2.678 0 003.17 0l.928-.68a1.17 1.17 0 01.518-.215l1.138-.175a2.678 2.678 0 002.241-2.241l.175-1.138c.029-.187.102-.365.215-.518l.68-.928a2.678 2.678 0 000-3.17l-.68-.928a1.179 1.179 0 01-.215-.518L14.41 3.83a2.678 2.678 0 00-2.24-2.24l-1.138-.175a1.179 1.179 0 01-.518-.215L9.585.52zM7.303 1.728c.415-.305.98-.305 1.394 0l.928.68c.348.256.752.423 1.18.489l1.136.174c.51.078.909.478.987.987l.174 1.137c.066.427.233.831.489 1.18l.68.927c.305.415.305.98 0 1.394l-.68.928a2.678 2.678 0 00-.489 1.18l-.174 1.136a1.178 1.178 0 01-.987.987l-1.137.174a2.678 2.678 0 00-1.18.489l-.927.68c-.415.305-.98.305-1.394 0l-.928-.68a2.678 2.678 0 00-1.18-.489l-1.136-.174a1.178 1.178 0 01-.987-.987l-.174-1.137a2.678 2.678 0 00-.489-1.18l-.68-.927a1.178 1.178 0 010-1.394l.68-.928c.256-.348.423-.752.489-1.18l.174-1.136c.078-.51.478-.909.987-.987l1.137-.174a2.678 2.678 0 001.18-.489l.927-.68zM11.28 6.78a.75.75 0 00-1.06-1.06L7 8.94 5.78 7.72a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.75-3.75z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div class="md:block flex flex-col justify-center items-center">
                                    <h2 class="text-sky-400 text-lg font-bold mb-3">Active</h2>
                                    <p class="leading-relaxed text-base">"Active User Verification: Obtain the Active Checkmark with a Minimum of 500 Followers and Demonstrated User Activity"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 font-semibold md:block flex flex-col justify-center items-center text-center">Earn Verification by Reaching Milestones: <span className='text-sky-400'>Click to Obtain Verification Badge :)</span></div>
                    <div className="flex flex-row mt-4 space-x-4">
                        <Link href={'/Home'} className='bg-sky-500 hover:scale-105 p-2 px-3 rounded-2xl'>Back</Link>
                        <Link className="bg-sky-500 hover:scale-105 p-2 px-3 rounded-2xl" href={'https://6z236yooyhh.typeform.com/to/WP5J4BH1'} target='_blank'>Apply</Link>
                    </div>
                </section>
            </div>
        </>
    )
}

export default GuidetoVerification
