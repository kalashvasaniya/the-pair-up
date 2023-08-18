"use client"
import RightSideNavbar from '@/components/RightSideNavbar/page'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BottomNavbar from '@/components/BottomNavbar/page'
import { useTPU } from '@/app/layout'
import { useEffect } from 'react'
import { useState } from 'react'

const Profile = () => {
  const [userDetails1, setUserDetails1] = useState('');
  const [userDetails2, setUserDetails2] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = '/';
    }
    fetchUserDetails1();
    fetchUserDetails2();
  }, []);

  const fetchUserDetails1 = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserDetails1(data.userDetails1);
        console.log("User Details", data);
      } else {
        // Handle error
      }
    } catch (error) {
      console.log(error)
    }
  };

  const fetchUserDetails2 = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserDetails2(data.userDetails2);
        console.log("User Details", data);
      } else {
        // Handle error
      }
    } catch (error) {
      console.log("hooo")
    }
  };

  const { logout } = useTPU();

  return (
    <>
      <div className="bg-black text-white">
        <div className="md:grid md:grid-cols-12 flex flex-col">
          <RightSideNavbar />
          {/* Desktop  */}
          <div className="md:block hidden px-20 py-16 col-start-4 col-end-13">
            <div className="md:grid md:grid-cols-12 flex flex-row mt-8 space-x-4">

              {/* image  */}
              <div className="col-start-1 col-end-4">
                <Link href={'/user/profile'} className="flex justify-end text-lg font-medium items-center">
                <div className={`border p-2 rounded-full ${userDetails1.role === 'admin' ? 'border-amber-400' : ''} ${userDetails1.tick === 'yes' ? 'border-sky-400' : ''} ${userDetails1.tick === 'active' ? 'border-teal-500' : ''}`}>
                    <Image src={`/avatars/${userDetails2.avatar}`} width={1000} height={1000} className="w-40 h-40 rounded-full cursor-pointer hover:scale-105" alt="Image" />
                    <span className="sr-only">Search</span>
                  </div>
                </Link>
              </div>

              {/* details  */}
              <div className="md:grid flex flex-col space-x-10">

                {/* first  */}
                <div className="col-start-4 col-end-5 ml-4">
                  <div className="flex flex-col justify-start text-lg font-medium items-start">

                    <div className="flex flex-row pr-24">
                      <div className="text-base flex justify-center items-center pr-2">{userDetails1.name}</div>
                      {userDetails1.role === 'admin' && (<>
                        <div className="relative group">
                          <div className="hover:scale-105">
                            <svg
                              className='flex justify-center items-center text-amber-400'
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              height="1em"
                              width="1em"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9.585.52a2.678 2.678 0 00-3.17 0l-.928.68a1.178 1.178 0 01-.518.215L3.83 1.59a2.678 2.678 0 00-2.24 2.24l-.175 1.14a1.178 1.178 0 01-.215.518l-.68.928a2.678 2.678 0 000 3.17l.68.928c.113.153.186.33.215.518l.175 1.138a2.678 2.678 0 002.24 2.24l1.138.175c.187.029.365.102.518.215l.928.68a2.678 2.678 0 003.17 0l.928-.68a1.17 1.17 0 01.518-.215l1.138-.175a2.678 2.678 0 002.241-2.241l.175-1.138c.029-.187.102-.365.215-.518l.68-.928a2.678 2.678 0 000-3.17l-.68-.928a1.179 1.179 0 01-.215-.518L14.41 3.83a2.678 2.678 0 00-2.24-2.24l-1.138-.175a1.179 1.179 0 01-.518-.215L9.585.52zM7.303 1.728c.415-.305.98-.305 1.394 0l.928.68c.348.256.752.423 1.18.489l1.136.174c.51.078.909.478.987.987l.174 1.137c.066.427.233.831.489 1.18l.68.927c.305.415.305.98 0 1.394l-.68.928a2.678 2.678 0 00-.489 1.18l-.174 1.136a1.178 1.178 0 01-.987.987l-1.137.174a2.678 2.678 0 00-1.18.489l-.927.68c-.415.305-.98.305-1.394 0l-.928-.68a2.678 2.678 0 00-1.18-.489l-1.136-.174a1.178 1.178 0 01-.987-.987l-.174-1.137a2.678 2.678 0 00-.489-1.18l-.68-.927a1.178 1.178 0 010-1.394l.68-.928c.256-.348.423-.752.489-1.18l.174-1.136c.078-.51.478-.909.987-.987l1.137-.174a2.678 2.678 0 001.18-.489l.927-.68zM11.28 6.78a.75.75 0 00-1.06-1.06L7 8.94 5.78 7.72a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.75-3.75z"
                              />
                            </svg>
                          </div>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 p-2 bg-transparent text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            Admin
                          </div>
                        </div>
                      </>
                      )}
                      {userDetails1.tick === 'yes' && (
                        <div className="relative group">
                          <div className="hover:scale-105">
                            <svg className='flex justify-center items-center text-sky-400'
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              height="1em"
                              width="1em">
                              <path
                                fillRule="evenodd"
                                d="M9.585.52a2.678 2.678 0 00-3.17 0l-.928.68a1.178 1.178 0 01-.518.215L3.83 1.59a2.678 2.678 0 00-2.24 2.24l-.175 1.14a1.178 1.178 0 01-.215.518l-.68.928a2.678 2.678 0 000 3.17l.68.928c.113.153.186.33.215.518l.175 1.138a2.678 2.678 0 002.24 2.24l1.138.175c.187.029.365.102.518.215l.928.68a2.678 2.678 0 003.17 0l.928-.68a1.17 1.17 0 01.518-.215l1.138-.175a2.678 2.678 0 002.241-2.241l.175-1.138c.029-.187.102-.365.215-.518l.68-.928a2.678 2.678 0 000-3.17l-.68-.928a1.179 1.179 0 01-.215-.518L14.41 3.83a2.678 2.678 0 00-2.24-2.24l-1.138-.175a1.179 1.179 0 01-.518-.215L9.585.52zM7.303 1.728c.415-.305.98-.305 1.394 0l.928.68c.348.256.752.423 1.18.489l1.136.174c.51.078.909.478.987.987l.174 1.137c.066.427.233.831.489 1.18l.68.927c.305.415.305.98 0 1.394l-.68.928a2.678 2.678 0 00-.489 1.18l-.174 1.136a1.178 1.178 0 01-.987.987l-1.137.174a2.678 2.678 0 00-1.18.489l-.927.68c-.415.305-.98.305-1.394 0l-.928-.68a2.678 2.678 0 00-1.18-.489l-1.136-.174a1.178 1.178 0 01-.987-.987l-.174-1.137a2.678 2.678 0 00-.489-1.18l-.68-.927a1.178 1.178 0 010-1.394l.68-.928c.256-.348.423-.752.489-1.18l.174-1.136c.078-.51.478-.909.987-.987l1.137-.174a2.678 2.678 0 001.18-.489l.927-.68zM11.28 6.78a.75.75 0 00-1.06-1.06L7 8.94 5.78 7.72a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.75-3.75z"
                              />
                            </svg>
                            <div className="absolute bottom-full px-12 left-1/2 transform -translate-x-1/2 p-2 bg-transparent text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              Verified
                            </div>
                          </div>
                        </div>)}
                      {userDetails1.tick === 'active' && (
                        <div className="relative group">
                          <div className="hover:scale-105">
                            <svg className='flex justify-center items-center text-teal-500'
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              height="1em"
                              width="1em">
                              <path
                                fillRule="evenodd"
                                d="M9.585.52a2.678 2.678 0 00-3.17 0l-.928.68a1.178 1.178 0 01-.518.215L3.83 1.59a2.678 2.678 0 00-2.24 2.24l-.175 1.14a1.178 1.178 0 01-.215.518l-.68.928a2.678 2.678 0 000 3.17l.68.928c.113.153.186.33.215.518l.175 1.138a2.678 2.678 0 002.24 2.24l1.138.175c.187.029.365.102.518.215l.928.68a2.678 2.678 0 003.17 0l.928-.68a1.17 1.17 0 01.518-.215l1.138-.175a2.678 2.678 0 002.241-2.241l.175-1.138c.029-.187.102-.365.215-.518l.68-.928a2.678 2.678 0 000-3.17l-.68-.928a1.179 1.179 0 01-.215-.518L14.41 3.83a2.678 2.678 0 00-2.24-2.24l-1.138-.175a1.179 1.179 0 01-.518-.215L9.585.52zM7.303 1.728c.415-.305.98-.305 1.394 0l.928.68c.348.256.752.423 1.18.489l1.136.174c.51.078.909.478.987.987l.174 1.137c.066.427.233.831.489 1.18l.68.927c.305.415.305.98 0 1.394l-.68.928a2.678 2.678 0 00-.489 1.18l-.174 1.136a1.178 1.178 0 01-.987.987l-1.137.174a2.678 2.678 0 00-1.18.489l-.927.68c-.415.305-.98.305-1.394 0l-.928-.68a2.678 2.678 0 00-1.18-.489l-1.136-.174a1.178 1.178 0 01-.987-.987l-.174-1.137a2.678 2.678 0 00-.489-1.18l-.68-.927a1.178 1.178 0 010-1.394l.68-.928c.256-.348.423-.752.489-1.18l.174-1.136c.078-.51.478-.909.987-.987l1.137-.174a2.678 2.678 0 001.18-.489l.927-.68zM11.28 6.78a.75.75 0 00-1.06-1.06L7 8.94 5.78 7.72a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.75-3.75z"
                              />
                            </svg>
                            <div className="absolute bottom-full px-12 left-1/2 transform -translate-x-1/2 p-2 bg-transparent text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              Active
                            </div>
                          </div>
                        </div>)}
                    </div>

                    <div className="text-sm text-gray-500">{userDetails2.bio}<span className='text-sky-400 text-xs'> - {userDetails2.gender}</span></div>
                    <div className="text-sm mt-2">Relation: <span className='text-sky-400 hover:underline'>{userDetails2.relation}</span></div>
                    <div className="text-sm mt-2">Year: <span className='text-sky-400 hover:underline'>{userDetails2.year}</span></div>
                    <div className="text-sm mt-2">Love to: <span className='text-sky-400 hover:underline'>{userDetails2.LoveTo}</span></div>
                    <div className="text-sm mt-2">Bath Ratio: <span className='text-sky-400 hover:underline'>{userDetails2.bath}</span></div>
                  </div>
                </div>

                {/* second  */}
                <div className="md:grid flex col-start-5 col-end-13">
                  <div className="mt-8 justify-start text-base font-medium items-start">
                    <div className="flex flex-row justify-center items-center pl-0">
                      <Link href={'/user/Details'} className='p-1 px-4 rounded-2xl hover:scale-105 bg-sky-500 mr-4'>Edit Profile</Link>
                      <button onClick={logout} className='p-1 px-4 rounded-2xl hover:scale-105 bg-sky-500'>Logout</button>
                      <Link href={'/menu/Setting'} className='p-1 px-4 rounded-2xl hover:scale-105'>
                        <svg aria-label="Options" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                      </Link>
                    </div>
                    <div className="flex flex-row space-x-8 mt-8">
                      <div className="flex flex-row space-x-4"><span className='pr-2 text-sky-400'>8</span> post</div>
                      <div className="flex flex-row space-x-4"><span className='pr-2 text-sky-400'>243</span> followers</div>
                      <div className="flex flex-row space-x-4"><span className='pr-2 text-sky-400'>1846</span> following</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
            <hr className='mt-6 border-gray-500 border' />

            {/* Posts Media & Tagged */}
            <div className="">
              <div className="grid grid-cols-3 mt-3">
                <Link href={''} className="flex justify-center font-semibold hover:text-sky-400">Posts</Link>
                <Link href={''} className="flex justify-center font-semibold hover:text-sky-400">Media</Link>
                <Link href={''} className="flex justify-center font-semibold hover:text-sky-400">Tagged</Link>
              </div>
            </div>

          </div>


          {/* Mobile  */}
          <div className="md:hidden block py-6">
            <nav>

            </nav>

            <div className="">
              {/* first line  */}
              <div className="grid grid-cols-2 px-6 space-x-4">
                <Link href={'/user/profile'} className="flex justify-center text-lg font-medium items-center">
                  <div className={`border p-2 rounded-full ${userDetails1.role === 'admin' ? 'border-amber-400' : ''} ${userDetails1.tick === 'yes' ? 'border-sky-400' : ''} ${userDetails1.tick === 'active' ? 'border-teal-500' : ''}`}>
                    <Image src={`/avatars/${userDetails2.avatar}`} width={1000} height={1000} className="w-28 h-28 rounded-full cursor-pointer hover:scale-105" alt="Image" />
                    <span className="sr-only">Search</span>
                  </div>
                </Link>
                <div className="flex flex-col">
                  <div className="flex flex-col justify-start text-lg font-medium items-start">

                    <div className="flex flex-row">
                      <div className="text-sm flex justify-center items-center pr-2">{userDetails1.name}</div>

                      {userDetails1.role === 'admin' && (
                        <div className="relative group">
                          <div className="hover:scale-105">
                            <svg className='flex justify-center items-center text-amber-400 w-4 h-4'
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
                          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 p-2 bg-transparent text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            Admin
                          </div>
                        </div>
                      )}
                      {userDetails1.tick === 'yes' && (
                        <div className="relative group">
                          <div className="hover:scale-105">
                            <svg className='flex justify-center items-center text-sky-400 w-4 h-4'
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
                          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 p-2 bg-transparent text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            Verified
                          </div>
                        </div>
                      )}
                      {userDetails1.tick === 'active' && (
                        <div className="relative group">
                          <div className="hover:scale-105">
                            <svg className='flex justify-center items-center text-teal-500 w-4 h-4'
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
                          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 p-2 bg-transparent text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            Active
                          </div>
                        </div>
                      )}

                    </div>

                    <div className="text-xs text-gray-500">{userDetails2.bio} <span className='text-sky-400 text-xs'> - {userDetails2.gender}</span></div>
                    <div className="text-xs mt-2">Relation: <span className='text-sky-400 hover:underline'>{userDetails2.relation}</span></div>
                    <div className="text-xs mt-2">Year: <span className='text-sky-400 hover:underline'>{userDetails2.year}</span></div>
                    <div className="text-xs mt-2">Love to: <span className='text-sky-400 hover:underline truncate'>{userDetails2.LoveTo}</span></div>
                    <div className="text-xs mt-2">Bath Ration: <span className='text-sky-400 hover:underline truncate'>{userDetails2.bath}</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="flex justify-center">
                <div className="mt-4 justify-start text-base font-medium items-start">

                  {/* button  */}
                  <div className="flex flex-row justify-center items-center">
                    <Link href={'/user/Details'} className='p-1 px-4 rounded-2xl hover:scale-105 bg-sky-500 mr-4 text-sm'>Edit Profile</Link>
                    <button onClick={logout} href={''} className='p-1 px-4 rounded-2xl hover:scale-105 bg-sky-500 text-sm'>Logout</button>
                    <Link href={'/menu/Setting'} className='p-1 px-4 rounded-2xl hover:scale-105'>
                      <svg aria-label="Options" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                    </Link>
                  </div>

                  <hr className='w-screen mt-2 border-gray-600' />

                  {/* user details  */}
                  <div className="grid grid-cols-3 mt-1">
                    <div className="flex flex-col justify-center items-center space-x-4 text-sm text-gray-400"><span className='pr-2 text-sky-400'>8</span> post</div>
                    <div className="flex flex-col justify-center items-center space-x-4 text-sm text-gray-400"><span className='pr-2 text-sky-400'>243</span> followers</div>
                    <div className="flex flex-col justify-center items-center space-x-4 text-sm text-gray-400"><span className='pr-2 text-sky-400'>1846</span> following</div>
                  </div>

                  <hr className='w-screen mt-1 border-gray-600' />

                  <div className="grid grid-cols-3 mt-2">
                    <Link href={''} className="flex justify-center font-semibold hover:text-sky-400 text-sm">Posts</Link>
                    <Link href={''} className="flex justify-center font-semibold hover:text-sky-400 text-sm">Media</Link>
                    <Link href={''} className="flex justify-center font-semibold hover:text-sky-400 text-sm">Tagged</Link>
                  </div>

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

export default Profile