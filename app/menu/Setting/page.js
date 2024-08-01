"use client"
import Example from '@/app/UI/Loader/page'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link'

const Setting = () => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // if (!localStorage.getItem('token')) {
    //   window.location.href = '/'
    // }

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
        <div className="h-screen flex flex-col justify-center items-center bg-black text-white">
          <div class="text-gray-400">
            <div class="flex md:flex-row flex-col text-center justify-center">
              <div class="p-10 hover:scale-110 transition ease-in-out delay-150">
                <Link href={'/EXT/About'} class="font-medium text-3xl text-white  hover:text-sky-500">About</Link>
              </div>
              <div class="p-10 hover:scale-110 transition ease-in-out delay-150">
                <Link href={'/EXT/Contact'} class="font-medium text-3xl text-white  hover:text-sky-500">Contact</Link>
              </div>
              <div class="p-10 hover:scale-110 transition ease-in-out delay-150">
                <Link href={'/forgot'} class="font-medium text-3xl text-white  hover:text-green-500">Change Password</Link>
              </div>
              <div class="p-10 hover:scale-110 transition ease-in-out delay-150">
                <Link href={'/EXT/Delete'} class="font-medium text-3xl text-white  hover:text-red-500">Delete Account</Link>
              </div>
              <div class="p-10 hover:scale-110 transition ease-in-out delay-150">
                <Link href={'https://6z236yooyhh.typeform.com/to/WP5J4BH1'} class="font-medium text-3xl text-white  hover:text-sky-500">Feedback</Link>
              </div>
            </div>
          </div>
          <div className="p-10">
            <Link href={'/Home'} className='bg-sky-500 hover:scale-105 p-2 px-3 rounded-2xl'>Back</Link>
          </div>
        </div>
      )}
    </>
  )
}

export default Setting
