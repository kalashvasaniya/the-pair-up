"use client"
import React from 'react'
import Link from 'next/link'
import BottomNavbar from '@/components/BottomNavbar/page'
import { useEffect } from 'react'

const Home = () => {

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = '/'
    }
  }, [])

  return (
    <>
      <div className="bg-black text-white">
        <div className="">
          <div className="md:grid md:grid-cols-12 flex flex-col">

            <div className="md:block hidden bg-black h-screen col-start-1 col-end-4 border-r border-gray-500 rounded-r-[5rem]">
              <div className="mt-16 px-6">
                <Link href={'/Home'} className="flex items-center">
                  <span className="self-center text-3xl whitespace-nowrap text-white font-extrabold  ">
                    <span className='line-through decoration-white text-[#00B2FF]'>The</span> PairUp</span>
                  <span className='text-4xl font-extrabold text-sky-400'>.</span>
                </Link>
              </div>
              <div className=""></div>
            </div>

            <div className="col-start-4 col-end-11 bg-black h-screen mx-12">

              {/* Navbar in mobile  */}
              <div className="md:hidden">
                <nav className="bg-black fixed w-full z-20 top-0 left-0 border-b">
                  {/* top navbar */}
                  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href={'/'} className="flex items-center">
                      {/* <Image src={'/Logo1.png'} alt="kalash" width={60} height={60} /> */}
                      <span className="self-center text-3xl whitespace-nowrap text-white font-extrabold  ">
                        <span className='line-through decoration-white text-[#00B2FF]'>The</span> PairUp</span>
                      <span className='text-4xl font-extrabold text-sky-400'>.</span>
                    </Link>
                  </div>
                </nav>
              </div>

              <div className="mt-20">
                dsgsdfgsdf
              </div>
            </div>

            <div className="md:block hidden col-start-11 col-end-13 bg-black h-screen border-l border-gray-500">
              <div className="mt-16 px-6">
                dsfgsdfgd
              </div>
            </div>

          </div>
        </div>
      </div>
      <BottomNavbar />
    </>
  )
}

export default Home
