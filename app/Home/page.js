"use client"
import React from 'react'
import Link from 'next/link'
import BottomNavbar from '@/components/BottomNavbar/page'
import { useEffect } from 'react'
import { useState } from 'react'
import Feed from '../Feed/page'
import Notification from '@/app/Notification/page'
import RightSideNavbar from '@/components/RightSideNavbar/page'
import LeftSideNavbar from '@/components/LeftSideNavbar/page'
import { useRef } from 'react'
import Message from '../Message/page'
import { useTPU } from '@/app/layout'
import Example from '../UI/Loader/page'
import PopupMsg from '@/components/PopupMsg/page'

const Home = () => {
  const [isVisible, setIsVisible] = useState(true);

  const [userDetails1, setUserDetails1] = useState('');
  const [userDetails2, setUserDetails2] = useState('');

  const [showLoader, setShowLoader] = useState(false);

  const [showTooltip2, setShowTooltip2] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = '/'
    }

    setTimeout(() => {
      // After 2 seconds, show the Story
      setShowLoader(true);
    }, 1000);

    fetchUserDetails1()
    fetchUserDetails2();

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000); // 10 seconds in milliseconds

    return () => clearTimeout(timer);
  }, [])

  const toggleCart1 = () => {
    if (ref1.current.classList.contains('-translate-x-full')) {
      ref1.current.classList.remove('-translate-x-full')
      ref1.current.classList.add('translate-x-0')
    }
    else {
      ref1.current.classList.remove('translate-x-0')
      ref1.current.classList.add('-translate-x-full')
    }
  }

  const toggleCart2 = () => {
    if (ref2.current.classList.contains('-translate-x-full')) {
      ref2.current.classList.remove('-translate-x-full')
      ref2.current.classList.add('translate-x-0')
    }
    else {
      ref2.current.classList.remove('translate-x-0')
      ref2.current.classList.add('-translate-x-full')
    }
  }

  const ref1 = useRef();
  const ref2 = useRef();

  const fetchUserDetails1 = async () => {
    try {
      const response = await fetch(`api/login`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserDetails1(data.userDetails1);
      } else {
        localStorage.removeItem('token')
      }
    } catch (error) {
      console.log(error)
    }
  };

  const fetchUserDetails2 = async () => {
    try {
      const response = await fetch(`api/details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserDetails2(data.userDetails2);
      } else {
        // Handle error
      }
    } catch (error) {
      console.log("hooo")
    }
  };

  // Menu
  const toggleTooltip2 = () => {
    setShowTooltip2(!showTooltip2);
  };
  const { logout } = useTPU()
  return (
    <>
      {!showLoader ? (
        // Render the Story component after 2 seconds
        <Example />
      ) : (
        <div className="bg-black">
          <div className="bg-black text-white">
            <div className="">
              <div className="md:grid md:grid-cols-12 flex flex-col bg-black">

                <RightSideNavbar />

                <div className="col-start-4 col-end-11 bg-black px-4">

                  {/* Navbar in mobile  */}
                  <div className="md:hidden">
                    <nav className="bg-black fixed w-full z-50 top-0 left-0 border-b">

                      {/* top navbar */}
                      <div className="grid grid-cols-2 gap-32">

                        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                          <Link href={'/Home'} className="flex items-center">
                            <span className="self-center text-3xl whitespace-nowrap text-white font-extrabold  ">
                              <span className='line-through decoration-white text-[#00B2FF]'>The</span> PairUp</span>
                            <span className='text-4xl font-extrabold text-sky-400'>.</span>
                          </Link>
                        </div>

                        <div className="flex flex-row justify-end p-4">

                          {/* Message  */}
                          <div onClick={toggleCart1} href={''} className="flex-row flex text-xl cursor-pointer font-semibold items-center hover:bg-sky-900 rounded-2xl">
                            <div className="px-2">
                              <svg className="w-7 h-7 text-sky-400 group-hover:text-sky-400" aria-label="Messenger" color="rgb(245, 245, 245)" fill="rgb(0, 178, 255)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.739"></path><path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fillRule="evenodd"></path></svg>
                            </div>
                          </div>

                          <div ref={ref1} className="absolute top-0 -left-2 z-50 w-96 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-black" tabIndex="-1">
                            <div className="text-base font-semibold font-mono text-sky-400">Message</div>
                            <button onClick={toggleCart1} type="button" className="text-gray-400 bg-transparent hover:bg-sky-500 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-6 inline-flex items-center" >
                              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                              <span className="sr-only">Close menu</span>
                            </button>
                            <hr className="my-3 -mx-3" />
                            {/* Here notofication */}
                            <Message />
                          </div>


                          {/* Notification  */}
                          <div onClick={toggleCart2} href={''} className="flex-row flex text-xl cursor-pointer font-semibold items-center hover:bg-sky-900 rounded-2xl">
                            <div className="px-2 relative">
                              <svg className="w-7 h-7 text-sky-400 group-hover:text-sky-400" aria-label="Notifications" fill="rgb(0, 178, 255)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                              <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full -top-1 right-0">

                              </div>
                            </div>
                          </div>

                          <div ref={ref2} className="absolute top-0 -left-2 z-50 w-96 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-black" tabIndex="-1">
                            <div className="text-base font-semibold font-mono text-sky-400">Notification</div>
                            <button onClick={toggleCart2} type="button" className="text-gray-400 bg-transparent hover:bg-sky-500 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-6 inline-flex items-center" >
                              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                              <span className="sr-only">Close menu</span>
                            </button>
                            <hr className="my-3 -mx-3" />
                            {/* Here notofication */}
                            <Notification />
                          </div>

                          <div onClick={toggleTooltip2} className="flex-row flex text-xl cursor-pointer font-semibold items-center hover:bg-sky-900 rounded-2xl">
                            <div className="px-2 flex justify-center items-center text-center">
                              <svg aria-label="Settings" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="4" y2="4"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="12" y2="12"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="20" y2="20"></line></svg>
                            </div>
                          </div>

                          {showTooltip2 && (
                            <div class="z-10 absolute text-white bg-gray-700 divide-y divide-gray-100 rounded-lg shadow w-52 top-16 -right-0">
                              <div class="flex flex-col justify-center py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownTopButton">
                                <Link href={'/menu/Setting'} class="flex justify-center px-4 py-3 hover:bg-gray-600 text-white">Settings</Link>
                                <Link href={'/menu/GuidetoVerification'} class="flex justify-center px-4 py-3 hover:bg-gray-600 text-white">Guide to Verification</Link>
                                <Link href={'/EXT/Security'} class="flex justify-center px-4 py-3 hover:bg-gray-600 text-white">Security Policy</Link>
                                <Link href={'https://6z236yooyhh.typeform.com/to/WP5J4BH1'} class="flex justify-center px-4 py-3 hover:bg-gray-600 text-white">Report</Link>
                                <button onClick={logout} class="flex justify-center px-4 py-3 hover:bg-gray-600 text-white">Logout</button>
                              </div>
                            </div>
                          )}

                        </div>
                      </div>

                    </nav>
                    {isVisible && (
                      <nav className='bg-black fixed w-full z-20 top-20 left-0 border-b pb-1 flex flex-row justify-around animate-bounce'>
                        {userDetails1.name ? (
                          <Link href={`/EXT/CollegeUpdate/${userDetails2.college}`} className="text-sky-400 hover:underline font-mono">
                            College Update
                          </Link>
                        ) : (
                          <Link href={'/user/Details'} className="text-sky-400 hover:underline font-mono">Click to update profile</Link>
                        )}
                      </nav>)}
                  </div>

                  <div className='bg-black'>

                    <PopupMsg />
                    <Feed />

                  </div>
                </div>

                <LeftSideNavbar />

              </div>
            </div>
          </div>
          <BottomNavbar />
        </div>
      )}
    </>
  )
}

export default Home
