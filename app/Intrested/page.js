"use client"
import React from 'react'
import { useEffect } from 'react'
import Link from 'next/link'


const Intrested = () => {
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = '/'
    }
  }, [])

  return (
    <>
      <div className="p-4">

        {/* nothing  */}
        <div className='md:hidden block'>
          <div className="text-base font-semibold font-mono text-sky-400">Intrested</div>
          <Link href={'/Home'} type="button" className="text-gray-400 bg-transparent hover:bg-sky-500 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center" >
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Close menu</span>
          </Link>
          <hr className="my-3" />
        </div>

        <div className="">
          Show the people whoes relation === intrested
          Hello intrested
        </div>


      </div>
    </>
  )
}

export default Intrested
