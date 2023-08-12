"use client"
import React from 'react'
import Link from 'next/link'

const VerifyDone = () => {
  return (
    <>
      <div className="pt-40 flex flex-col justify-center items-center">
        <div className="underline text-green-400 text-2xl font-semibold font-mono">Email Verified Successfully</div>
        <div className="pt-16">Back to Login page</div>
        <Link href={'/'} className='pt-4'>
          <button className='p-2 bg-sky-400 rounded-2xl px-4 hover:scale-105'>
            Login
          </button>
        </Link>
      </div>
    </>
  )
}

export default VerifyDone