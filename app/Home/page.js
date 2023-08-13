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
                <Link href={''} className="flex-row flex mt-16 px-4 text-xl font-semibold items-center hover:bg-sky-900 rounded-2xl py-2">
                  <div className="pr-4">
                    <svg className="w-7 h-7 mb-1 text-sky-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    <span className="sr-only">Home</span>
                  </div>
                  <div className="">Home</div>
                </Link>

                {/* Search  */}
                <Link href={''} className="flex-row flex mt-4 px-4 text-xl font-semibold items-center hover:bg-sky-900 rounded-2xl py-2">
                  <div className="pr-4">
                    <svg className="w-7 h-7 text-sky-400 group-hover:text-sky-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Search</span>
                  </div>
                  <div className="">Search</div>
                </Link>

                {/* Message  */}
                <Link href={''} className="flex-row flex mt-4 px-4 text-xl font-semibold items-center hover:bg-sky-900 rounded-2xl py-2">
                  <div className="pr-4">
                    <svg className="w-7 h-7 text-sky-400 group-hover:text-sky-400" aria-label="Messenger" class="_ab6-" color="rgb(245, 245, 245)" fill="rgb(0, 178, 255)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="1.739"></path><path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fill-rule="evenodd"></path></svg>
                  </div>
                  <div className="">Message</div>
                </Link>

                {/* Notification  */}
                <Link href={''} className="flex-row flex mt-4 px-4 text-xl font-semibold items-center hover:bg-sky-900 rounded-2xl py-2">
                  <div className="pr-4">
                    <svg className="w-7 h-7 text-sky-400 group-hover:text-sky-400" aria-label="Notifications" fill="rgb(0, 178, 255)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                  </div>
                  <div className="">Notifications</div>
                </Link>

                {/* Create  */}
                <Link href={''} className="flex-row flex mt-4 px-4 text-xl font-semibold items-center hover:bg-sky-900 rounded-2xl py-2">
                  <div className="pr-4">
                    <svg className='w-7 h-7 text-sky-400 group-hover:text-sky-400' aria-label="New post" class="_ab6-" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
                  </div>
                  <div className="">Create</div>
                </Link>

                {/* Live  */}
                <Link href={''} className="flex-row flex mt-4 px-4 text-xl font-semibold items-center hover:bg-sky-900 rounded-2xl py-2">
                  <div className="pr-4">
                    <Image className='w-7 h-7' width={28} height={28} src={'/live-7.png'}></Image>
                    <span className="sr-only">Search</span>
                  </div>
                  <div className="">Live</div>
                </Link>

                {/* Profile  */}
                <Link href={'/user/profile'} className="flex-row flex mt-4 px-4 text-xl font-semibold items-center hover:bg-gray-700 rounded-2xl py-2">
                  <div className="pr-4">
                    <Image src={'/logo.jpeg'} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-7 h-7 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                    <span className="sr-only">Search</span>
                  </div>
                  <div className="">Profile</div>
                </Link>

                {/* Menu  */}
                <Link href={'/user/menu'} className="flex-row flex mt-32 px-4 text-xl font-semibold items-center hover:bg-gray-700 rounded-2xl py-2">
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
                  <div className="grid grid-cols-2 gap-32">

                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                      <Link href={'/Home'} className="flex items-center">
                        <span className="self-center text-3xl whitespace-nowrap text-white font-extrabold  ">
                          <span className='line-through decoration-white text-[#00B2FF]'>The</span> PairUp</span>
                        <span className='text-4xl font-extrabold text-sky-400'>.</span>
                      </Link>
                    </div>

                    <div className="flex flex-row space-x-1 justify-end mx-auto p-4">

                      <Link href={''} className="flex-row flex text-xl font-semibold items-center hover:bg-sky-900 rounded-2xl">
                        <div className="px-2">
                          <svg class="w-7 h-7 text-sky-400 group-hover:text-sky-400" aria-label="Messenger" color="rgb(245, 245, 245)" fill="rgb(0, 178, 255)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="1.739"></path><path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fill-rule="evenodd"></path></svg>
                        </div>
                      </Link>

                      <Link href={''} className="flex-row flex text-xl font-semibold items-center hover:bg-sky-900 rounded-2xl">
                        <div className="px-2">
                          <svg className="w-7 h-7 text-sky-400 group-hover:text-sky-400" aria-label="Notifications" fill="rgb(0, 178, 255)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                        </div>
                      </Link>

                    </div>
                  </div>

                </nav>
              </div>

              <div className="mt-20">
                dsgsdfgsdf
              </div>
            </div>

            <div className="md:block hidden col-start-11 col-end-13 bg-black h-screen border-l border-gray-500">

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

              {/* suggestion  */}
              <div className="my-24 px-6">
                <div className="text-base underline underline-offset-1 text-sky-400 mb-6">Updates From College</div>
                <div className="flex flex-col space-y-3 uppercase">
                  <div className="hover:underline text-xs"> - FAT Marks are out For 2021 Batch.</div>
                  <div className="hover:underline text-xs"> - TOP 10 RANK HOLDERS : 38TH ANNUAL CONVOCATION.</div>
                  <div className="hover:underline text-xs"> - HOSTEL VACATING CONSENT FORM.</div>
                  <div className="hover:underline text-xs"> - Student got 10th Rank.</div>
                </div>
              </div>

              <div className="mt-16 px-6 text-xs">
                <div className="flex flex-row space-x-2 text-gray-400">
                  <Link href={''} className="hover:underline">About</Link>
                  <Link href={''} className="hover:underline">Contact</Link>
                  <Link href={''} className="hover:underline">Help</Link>
                  <Link href={''} className="hover:underline">Feedback</Link>
                </div>
                <div className="mt-2">
                  © 2023 ThePairUp
                </div>
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
