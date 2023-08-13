"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
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

            <div className="md:block hidden bg-black h-screen col-start-1 col-end-3 border-r border-gray-500 rounded-r-[5rem]">
              <div className="mt-16 px-4">

                <Link href={'/Home'} className="flex items-center">
                  <span className="self-center text-3xl whitespace-nowrap text-white font-extrabold  ">
                    <span className='line-through decoration-white text-[#00B2FF]'>The</span> PairUp</span>
                  <span className='text-4xl font-extrabold text-sky-400'>.</span>
                </Link>

                {/* Home  */}
                <Link href={''} className="flex-row flex mt-16 px-4 text-xl font-semibold items-center">
                  <div className="pr-4">
                    <svg className="w-7 h-7 mb-1 text-sky-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    <span className="sr-only">Home</span>
                  </div>
                  <div className="">Home</div>
                </Link>

                {/* Search  */}
                <Link href={''} className="flex-row flex mt-8 px-4 text-xl font-semibold items-center">
                  <div className="pr-4">
                    <svg className="w-7 h-7 text-sky-400 group-hover:text-sky-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Search</span>
                  </div>
                  <div className="">Search</div>
                </Link>

                {/* Create  */}
                <Link href={''} className="flex-row flex mt-8 px-4 text-xl font-semibold items-center">
                  <div className="pr-4">
                    <svg className='w-7 h-7 text-sky-400 group-hover:text-sky-400' aria-label="New post" class="_ab6-" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
                  </div>
                  <div className="">Create</div>
                </Link>

                {/* Live  */}
                <Link href={''} className="flex-row flex mt-8 px-4 text-xl font-semibold items-center">
                  <div className="pr-4">
                    <Image className='w-7 h-7' width={28} height={28} src={'/live-7.png'}></Image>
                    <span className="sr-only">Search</span>
                  </div>
                  <div className="">Live</div>
                </Link>

                {/* Profile  */}
                <Link href={''} className="flex-row flex mt-8 px-4 text-xl font-semibold items-center">
                  <div className="pr-4">
                    <Image src={'/logo.jpeg'} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-7 h-7 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                    <span className="sr-only">Search</span>
                  </div>
                  <div className="">Profile</div>
                </Link>

                {/* Menu  */}
                <Link href={''} className="flex-row flex mt-72  px-4 text-xl font-semibold items-center">
                  <div className="pr-4">
                    <svg aria-label="Settings" class="_ab6-" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3" x2="21" y1="4" y2="4"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3" x2="21" y1="12" y2="12"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="3" x2="21" y1="20" y2="20"></line></svg>
                  </div>
                  <div className="">Menu</div>
                </Link>

              </div>
              <div className=""></div>
            </div>

            <div className="col-start-3 col-end-11 bg-black h-screen mx-12">

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
                <Link href={''} className="flex-row flex mt-8 px-4 text-lg font-medium items-center">
                  <div className="pr-4">
                    <Image src={'/logo.jpeg'} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-11 h-11 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                    <span className="sr-only">Search</span>
                  </div>
                  <div className="">
                    <div className="">kalash</div>
                    <div className="text-sm text-gray-500">RockStar</div>
                  </div>
                </Link>
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
