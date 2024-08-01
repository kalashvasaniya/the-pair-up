"use client"
import RightSideNavbar from '@/components/RightSideNavbar/page'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BottomNavbar from '@/components/BottomNavbar/page'
import { useTPU } from '@/app/layout'
import { useEffect } from 'react'
import { useState } from 'react'
import Example from '@/app/UI/Loader/page'
import ScrollButton1 from '@/app/UI/ScrollButton1/page'
import { useRef } from 'react'
import connect from '@/lib/db'

const Profile = async ({ params }) => {
  await connect(); // Ensure a database connection
  const [userDetails, setUserDetails] = useState(null);
  const [slugDetails, setSlugDetails] = useState(null);
  const [postDetails, setPostDetails] = useState(null);
  const [followDetails, setFollowDetails] = useState(null);

  const [userDetailsk1, setUserDetailsk1] = useState([]);
  const [slugDetailsk1, setSlugDetailsk1] = useState(null);

  const [userDetails1, setUserDetails1] = useState('');
  const [userDetails2, setUserDetails2] = useState('');
  const [userDetails3, setUserDetails3] = useState('');
  const [userDetails4, setUserDetails4] = useState('');
  const [userDetails7, setUserDetails7] = useState('');

  const [showFeed, setShowFeed] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [showTagged, setShowTagged] = useState(false);

  const [isFollowing, setIsFollowing] = useState(false);

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = '/';
    }

    setTimeout(() => {
      // After 2 seconds, show the Story
      setShowLoader(true);
    }, 1000);

    fetchUserDetails(params.slug);
    fetchUserDetails1();
    fetchUserDetails2();
    fetchUserDetails3();
    fetchUserDetails4();
    searchUser(" ")
  }, [params.slug]);

  const fetchUserDetails = async (slug) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/checkSlug?slug=${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUserDetails(data.user[0]);
        setSlugDetails(data.details[0])
        setPostDetails(data.posts[0])
        setFollowDetails(data.follower)
      } else throw new Error("Something went wrong!");
    } catch (error) {
      console.log(error)
    }
  };

  const searchUser = async (slug) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/searchUser?slug=${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserDetailsk1(data.users);
        setSlugDetailsk1(data.details)
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      } else {
        // Handle error
      }
    } catch (error) {
      console.log("hooo")
    }
  };

  // Post 
  const fetchUserDetails3 = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/post`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if (response.ok) {
        const data = await response.json();
        setUserDetails3(data.posts);
        setUserDetails4(data.userPost);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUserDetails4 = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/follow`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserDetails7(data.followers);
      } else {
        // Handle other HTTP errors (e.g., 404, 500)
        console.error("Request failed with status:", response.status, response.message);
      }
    } catch (error) {
      console.error('Error following user:', error);
      // Handle the error as needed, e.g., show an error message to the user.
    }

  }

  const handleButtonClick = async (userToFollow, userToUnfollow) => {
    // Invert the isFollowing state
    setIsFollowing(!isFollowing);

    try {
      if (isFollowing) {
        // Unfollow the user
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/unfollow`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ userIdToUnfollow: userToUnfollow }) // Pass the user ID to unfollow
        });

        if (response.ok) {
          const data = await response.json();
          window.location.reload()
        } else {
          // Handle the case where unfollowing failed
          console.log('Failed to unfollow user');
        }
      } else {
        // Follow the user
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/follow`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            userIdToFollow: userToFollow,
          })
        });

        if (response.ok) {
          const data = await response.json();
          window.location.reload()
        } else {
          console.log('Failed to follow user');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };


  function reverseArray(arr) {
    return arr.slice().reverse();
  }
  // Example usage:
  const userDetails6 = [...userDetails3]
  const reverse = reverseArray(userDetails6);

  // Date 
  function formatDate(inputDate) {
    const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', };
    const date = new Date(inputDate);
    return date.toLocaleDateString('en-IN', options);
  }

  const togglePost = () => {
    setShowPost(showPost);
    setShowFeed(false); // Close other components if needed
    setShowTagged(false);
  };

  const toggleFeed = () => {
    setShowPost(true);
    setShowFeed(!showFeed);
    setShowTagged(false); // Close other components if needed
  };

  const toggleTagged = () => {
    setShowPost(true);
    setShowFeed(false);
    setShowTagged(!showTagged);
  };

  let totalPosts = 0;
  let totalFollowers = 0;
  let totalFollowing = 0;

  const showFollower = () => {
    if (ref1.current.classList.contains('-translate-x-full')) {
      ref1.current.classList.remove('-translate-x-full')
      ref1.current.classList.add('translate-x-0')
    }
    else {
      ref1.current.classList.remove('translate-x-0')
      ref1.current.classList.add('-translate-x-full')
    }
    if (ref3.current.classList.contains('-translate-x-full')) {
      ref3.current.classList.remove('-translate-x-full')
      ref3.current.classList.add('translate-x-0')
    }
    else {
      ref3.current.classList.remove('translate-x-0')
      ref3.current.classList.add('-translate-x-full')
    }
  };

  const showFollowing = () => {
    if (ref2.current.classList.contains('-translate-x-full')) {
      ref2.current.classList.remove('-translate-x-full')
      ref2.current.classList.add('translate-x-0')
    }
    else {
      ref2.current.classList.remove('translate-x-0')
      ref2.current.classList.add('-translate-x-full')
    }
    if (ref4.current.classList.contains('-translate-x-full')) {
      ref4.current.classList.remove('-translate-x-full')
      ref4.current.classList.add('translate-x-0')
    }
    else {
      ref4.current.classList.remove('translate-x-0')
      ref4.current.classList.add('-translate-x-full')
    }
  };

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const { logout, highlightHashTags } = useTPU();

  return (
    <>
      {/* Count Post  */}
      <div className="hidden">
        {Array.isArray(reverse) && reverse.map((post, index) => (
          <div key={index} className="">
            {Array.isArray(userDetails4) && userDetails4.map((userPost, index) => (
              <div key={index} className="">
                {params.slug === userPost.name && (
                  <div key={index} className="">
                    {(userPost._id === post.user) && (
                      <div key={index} className="">
                        {/* here  */}
                        {totalPosts++}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Count Followers  */}
      <div className="hidden">
        {userDetails7 && userDetails && Array.isArray(userDetails7) && userDetails7.map((userDet, indexDet) => (
          <div key={indexDet} className="">
            {userDet.following === userDetails._id && (
              <div key={indexDet} className="">
                {totalFollowers++}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Count Following  */}
      <div className="hidden" >
        {
          Array.isArray(followDetails) && followDetails.map((userPot, index) => (
            <div key={index} className="">
              {/* here */}
              {totalFollowing++}
            </div>
          ))
        }
      </div>


      {!showLoader ? (
        // Render the Story component after 2 seconds
        <Example />
      ) : (
        <div className="">
          {/* self  */}
          {params.slug === userDetails1.name && (
            <div className="bg-black text-white">
              <div className="md:grid md:grid-cols-12 flex flex-col">
                <RightSideNavbar />
                {/* Desktop  */}
                <div className="md:block hidden px-20 py-16 col-start-4 col-end-13">
                  <div className="md:grid md:grid-cols-12 flex flex-row mt-8 space-x-4">

                    {/* image  */}
                    <div className="col-start-1 col-end-4">
                      <Link href={`/user/profile/${userDetails1.name}`} className="flex justify-end text-lg font-medium items-center">
                        <div className={`border p-2 rounded-full ${userDetails1.role === 'admin' ? 'border-amber-400' : ''} ${userDetails1.tick === 'yes' ? 'border-sky-400' : ''} ${userDetails1.tick === 'active' ? 'border-teal-500' : ''}`}>
                          {slugDetails ? (
                            <Image src={`/avatars/${slugDetails.avatar}`} width={1000} height={1000} className="w-40 h-40 rounded-full cursor-pointer hover:scale-105" alt="Image" />) : (<Image src={`/avatars/dummy.jpeg`} width={1000} height={1000} className="w-40 h-40 rounded-full cursor-pointer hover:scale-105" alt="Image" />)}
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
                                    Club
                                  </div>
                                </div>
                              </div>)}
                          </div>


                          <div className="text-sm text-gray-500">{userDetails2.bio}<span className='text-sky-400 text-xs'>  {userDetails2.gender}</span></div>
                          {userDetails1.tick === 'active' ? (
                            <div className="">
                              <div className="text-sm mt-2">Leader: <span className='text-sky-400 hover:underline'>{userDetails2.relation}</span></div>
                              <div className="text-sm mt-2">Since: <span className='text-sky-400 hover:underline'>{userDetails2.year}</span></div>
                              <div className="text-sm mt-2">Website: <Link href={`https://${userDetails2.LoveTo}`} className='text-sky-400 hover:underline'>{userDetails2.LoveTo}</Link></div>
                              <div className="text-sm mt-2">Insta: <Link href={`https://instagram.com/${userDetails2.bath}`} className='text-sky-400 hover:underline'>{userDetails2.bath}</Link></div>
                              <div className="text-sm mt-2">College: <span className='text-sky-400 hover:underline'>{userDetails2.college}</span></div>
                            </div>
                          ) : (
                            <div className="">
                              <div className="text-sm mt-2">Relation: <span className='text-sky-400 hover:underline'>{userDetails2.relation}</span></div>
                              <div className="text-sm mt-2">Year: <span className='text-sky-400 hover:underline'>{userDetails2.year}</span></div>
                              <div className="text-sm mt-2">Love to: <span className='text-sky-400 hover:underline'>{userDetails2.LoveTo}</span></div>
                              <div className="text-sm mt-2">Bath: <span className='text-sky-400 hover:underline'>{userDetails2.bath}</span></div>
                              <div className="text-sm mt-2">College: <span className='text-sky-400 hover:underline'>{(userDetails2.college !== 'NA') ? (userDetails2.college) : (
                                <Link href={`https://6z236yooyhh.typeform.com/to/tcFr6KOm`} target='_blank' className='text-red-500 hover:underline'>Add College</Link>
                              )}</span></div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* second  */}
                      <div className="md:grid flex col-start-5 col-end-13">
                        <div className="mt-8 justify-start text-base font-medium items-start">
                          <div className="flex flex-row justify-center items-center pl-0">
                            {userDetails1.tick === 'active' ? (<Link href={''} className='p-1 px-4 rounded-2xl hover:scale-105 bg-sky-500 mr-4'>Hola 👋</Link>) : (
                              <Link href={'/user/Details'} className='p-1 px-4 rounded-2xl hover:scale-105 bg-sky-500 mr-4'>Edit Profile</Link>
                            )}
                            <button onClick={logout} className='p-1 px-4 rounded-2xl hover:scale-105 bg-sky-500 hover:bg-red-500'>Logout</button>
                            <Link href={'/menu/Setting'} className='p-1 px-4 rounded-2xl hover:scale-105'>
                              <svg aria-label="Options" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                            </Link>
                          </div>
                          {/* Post & Follow  */}
                          <div className="flex flex-row space-x-8 mt-8">
                            {/* Post  */}
                            <div className="flex flex-row space-x-4"><span className='pr-2 text-sky-400'>{totalPosts}</span> post</div>

                            {/* Followers  */}
                            <button onClick={showFollowing} className="relative flex flex-row space-x-4"><span className='pr-2 text-sky-400'>{totalFollowers}</span> followers</button>
                            <div className="absolute">
                              <div ref={ref2} className="fixed border-l border-gray-500 top-0 -right-96 z-50 w-96 h-screen p-4 overflow-y-auto transition-transform translate-x-0 bg-black">
                                <div className="">
                                  <div className="text-base font-semibold font-mono text-sky-400">Followers</div>
                                  <button onClick={showFollowing} type="button" className="text-gray-400 bg-transparent hover:bg-sky-500 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center" >
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close menu</span>
                                  </button>
                                  <hr className="my-3" />
                                </div>
                                {userDetails7 && slugDetails && userDetails && Array.isArray(userDetails7) && userDetails7.map((userDet, indexDet) => (
                                  <div key={indexDet} className="">
                                    {userDet.following === userDetails._id && (
                                      <div key={indexDet} className="bg-black">
                                        {userDetailsk1 && userDetailsk1.length > 0 && slugDetailsk1 && (
                                          <div className="">

                                            {Array.isArray(userDetailsk1) && userDetailsk1.map((user, index) => (

                                              <div key={index} className="">
                                                {userDet.user === user._id && (
                                                  <Link key={index} href={`/user/profile/${user.name}`} className="flex-row flex text-lg mt-6 font-medium items-center hover:bg-gray-700 p-2 rounded-3xl px-4">

                                                    {user.details && slugDetailsk1.map((details, index2) => (

                                                      <div key={index2} className="hover:scale-105">
                                                        {userDet.user === details.user && userDet.user === user._id && (
                                                          <div>

                                                            {userDet.user === details.user && userDet.user === user._id && details.avatar && (
                                                              <Image src={`/avatars/${details.avatar}`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-11 h-11 mr-6 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                                                            )}
                                                            <span className="sr-only">Search</span>
                                                          </div>
                                                        )}
                                                      </div>

                                                    ))}

                                                    {Array.isArray(userDetailsk1) && userDetailsk1.map((user, index2) => (
                                                      <div key={index2} className="hover:scale-105">
                                                        {user.details && slugDetailsk1.map((details, index2) => (
                                                          <div className="">
                                                            {userDet.user === details.user && userDet.user === user._id && (
                                                              <div className="">

                                                                {userDet.user === details.user && userDet.user === user._id && user.details && (
                                                                  <div className="flex flex-row">
                                                                    <div className="text-base flex justify-center items-center pr-2">{user.name}</div>
                                                                    {userDet.user === details.user && userDet.user === user._id && user.role === 'admin' && (
                                                                      <div className="hover:scale-105">
                                                                        <svg className='flex justify-center items-center text-amber-400'
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
                                                                    )}
                                                                    {userDet.user === details.user && userDet.user === user._id && user.tick === 'yes' && (
                                                                      <div className="hover:scale-105 pt-[0.10rem]">
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
                                                                      </div>
                                                                    )}
                                                                    {userDet.user === details.user && userDet.user === user._id && user.tick === 'active' && (
                                                                      <div className="hover:scale-105 pt-[0.10rem]">
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
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                )}

                                                                {/* bio max 12 */}
                                                                {user.details && slugDetailsk1.map((details, index2) => (
                                                                  <div key={index2}>

                                                                    {userDet.user === details.user && userDet.user === user._id && (
                                                                      <div>

                                                                        {userDet.user === details.user && userDet.user === user._id && details.bio && (
                                                                          <div className="text-sm text-gray-500 truncate">{details.bio}</div>
                                                                        )}

                                                                      </div>
                                                                    )}

                                                                  </div>
                                                                ))}

                                                              </div>
                                                            )}
                                                          </div>
                                                        ))}
                                                      </div>
                                                    ))}
                                                  </Link>
                                                )}
                                              </div>
                                            ))}

                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Following  */}
                            <button onClick={showFollower} className="relative flex flex-row space-x-4"><span className='pr-2 text-sky-400'>{totalFollowing}</span> following</button>
                            <div className="absolute">
                              <div ref={ref1} className="fixed border-l border-gray-500 top-0 -right-96 z-50 w-96 h-screen p-4 overflow-y-auto transition-transform translate-x-0 bg-black">
                                <div className="">
                                  <div className="text-base font-semibold font-mono text-sky-400">Followings</div>
                                  <button onClick={showFollower} type="button" className="text-gray-400 bg-transparent hover:bg-sky-500 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center" >
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close menu</span>
                                  </button>
                                  <hr className="my-3" />
                                </div>
                                {Array.isArray(followDetails) && followDetails.map((userPot, index) => (
                                  <div key={index}>
                                    {userDetailsk1 && userDetailsk1.length > 0 && slugDetailsk1 && (
                                      <div className="mt-6">

                                        {Array.isArray(userDetailsk1) && userDetailsk1.map((user, index) => (

                                          <div key={index} className="">
                                            {userPot.following === user._id && (
                                              <Link key={index} href={`/user/profile/${user.name}`} className="flex-row flex mt-4 text-lg font-medium items-center hover:bg-gray-700 p-2 rounded-3xl px-4">

                                                {user.details && slugDetailsk1.map((details, index2) => (

                                                  <div key={index2} className="hover:scale-105">
                                                    {userPot.following === details.user && userPot.following === user._id && (
                                                      <div>

                                                        {userPot.following === details.user && userPot.following === user._id && details.avatar && (
                                                          <Image src={`/avatars/${details.avatar}`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-11 h-11 mr-6 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                                                        )}
                                                        <span className="sr-only">Search</span>

                                                      </div>
                                                    )}
                                                  </div>

                                                ))}

                                                {Array.isArray(userDetailsk1) && userDetailsk1.map((user, index2) => (
                                                  <div key={index2} className="hover:scale-105">
                                                    {user.details && slugDetailsk1.map((details, index2) => (
                                                      <div className="">
                                                        {userPot.following === details.user && userPot.following === user._id && (
                                                          <div className="">

                                                            {userPot.following === details.user && userPot.following === user._id && user.details && (
                                                              <div className="flex flex-row">
                                                                <div className="text-base flex justify-center items-center pr-2">{user.name}</div>
                                                                {userPot.following === details.user && userPot.following === user._id && user.role === 'admin' && (
                                                                  <div className="hover:scale-105">
                                                                    <svg className='flex justify-center items-center text-amber-400'
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
                                                                )}
                                                                {userPot.following === details.user && userPot.following === user._id && user.tick === 'yes' && (
                                                                  <div className="hover:scale-105 pt-[0.10rem]">
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
                                                                  </div>
                                                                )}
                                                                {userPot.following === details.user && userPot.following === user._id && user.tick === 'active' && (
                                                                  <div className="hover:scale-105 pt-[0.10rem]">
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
                                                                  </div>
                                                                )}
                                                              </div>
                                                            )}

                                                            {/* bio max 12 */}
                                                            {user.details && slugDetailsk1.map((details, index2) => (
                                                              <div key={index2}>

                                                                {userPot.following === details.user && userPot.following === user._id && (
                                                                  <div>

                                                                    {userPot.following === details.user && userPot.following === user._id && details.bio && (
                                                                      <div className="text-sm text-gray-500 truncate">{details.bio}</div>
                                                                    )}

                                                                  </div>
                                                                )}

                                                              </div>
                                                            ))}

                                                          </div>
                                                        )}
                                                      </div>
                                                    ))}
                                                  </div>
                                                ))}
                                              </Link>
                                            )}
                                          </div>
                                        ))}

                                      </div>
                                    )}

                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                  <hr className='mt-6 border-gray-500 border' />

                  {/* Posts Media & Tagged */}
                  <div className="">
                    <div className="grid grid-cols-3 mt-3">
                      <button className="flex justify-center font-semibold text-sky-400">Posts</button>
                      <button className="flex justify-center font-semibold text-sky-400">Media</button>
                      <button className="flex justify-center font-semibold text-sky-400">Tagged</button>
                    </div>



                    {/* ALL POST  */}
                    <div className="">
                      {postDetails === undefined ? (
                        // If no posts, show a message to create a post
                        <div className="my-8 flex justify-center pt-12">
                          <Link href={`${process.env.NEXT_PUBLIC_HOST}/Feed/Create/Post`} className='text-white rounded-full bg-sky-500 p-3 font-medium hover:text-sky-500 hover:bg-white hover:scale-110'>Create a post</Link>
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-6 my-8">
                          {/* Post */}
                          <div className="">
                            {Array.isArray(reverse) && reverse.map((post, index) => (
                              <Link href={`${process.env.NEXT_PUBLIC_HOST}/user/profile/${userDetails.name}/${post.slugPostLink}`}>
                                <div key={index} className="">
                                  {Array.isArray(userDetails4) && userDetails4.map((userPost, index) => (
                                    <div key={index} className="">
                                      {params.slug === userPost.name && (
                                        <div key={index} className="">
                                          {(userPost._id === post.user) && (
                                            <div key={index} className="flex flex-col bg-gray-800 rounded-xl mb-4">
                                              <div key={index} className="mx-4 border-gray-500 text-sm py-4 px-2">
                                                <div key={index} className="">
                                                  {highlightHashTags(post.content)}
                                                </div>
                                                <div key={index} className="">
                                                  {post.image === '' ? <div className=""></div> : (
                                                    <Image src={`${post.image}`} width={1000} height={1000} alt={`${post.image}`} className='mt-4 rounded-xl'></Image>)}
                                                </div>
                                                <div className="text-xs mt-6 text-gray-400 truncate">
                                                  {formatDate(post.date)}
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </Link>
                            ))}
                          </div>

                          {/* media  */}
                          <div className="">
                            {Array.isArray(reverse) && reverse.map((post, index) => (
                              <div key={index} className="">
                                {Array.isArray(userDetails4) && userDetails4.map((userPost, index) => (
                                  <div key={index} className="">
                                    {params.slug === userPost.name && (
                                      <div key={index} className="">
                                        {(userPost._id === post.user) && (
                                          <div className="flex flex-col bg-black rounded-xl">
                                            <div className="text-sm">
                                              <div key={index} className="">
                                                {post.image === '' ? <div className="hidden"></div> : (
                                                  <Image src={`${post.image}`} width={1000} height={1000} alt={`${post.image}`} className='rounded-xl mb-4'></Image>)}
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>

                          {/* Tagged  */}
                          <div className="">
                            {Array.isArray(reverse) && reverse.map((post, index) => (
                              <div key={index} className="">
                                {Array.isArray(userDetails4) && userDetails4.map((userPost, index) => (
                                  <Link href={`${process.env.NEXT_PUBLIC_HOST}/user/profile/${userPost.name}/${post.slugPostLink}`}>
                                    {params.slug === "Founder" ? (
                                      <div className="">
                                        {post.content.includes("@" + params.slug) ? (
                                          <div key={index} className="">
                                            <div key={index} className="">
                                              {(userPost._id === post.user) && (
                                                <div key={index} className="flex flex-col bg-gray-800 rounded-xl mb-4">

                                                  <div key={index} className="mx-4 border-gray-500 text-sm py-4 px-2">
                                                    <div key={index} className="">
                                                      {highlightHashTags(post.content)}
                                                    </div>
                                                    <div key={index} className="">
                                                      {post.image === '' ? <div className=""></div> : (
                                                        <Image src={`${post.image}`} width={1000} height={1000} alt={`${post.image}`} className='mt-4 rounded-xl'></Image>)}
                                                    </div>
                                                    <div className="text-xs mt-6 text-gray-400 flex flex-col">
                                                      {formatDate(post.date)}
                                                      <div key={index} className="text-gray-400 mt-2">
                                                        Taggeg by <Link href={`${process.env.NEXT_PUBLIC_HOST}/user/profile/${userPost.name}`} className='text-sky-400 hover:underline '>@{userPost.name}</Link>
                                                      </div>
                                                    </div>
                                                  </div>

                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="hidden"></div>
                                        )}
                                      </div>
                                    ) : (
                                      <div className="">
                                        {post.content.toLowerCase().includes("@" + params.slug) ? (
                                          <div key={index} className="">
                                            <div key={index} className="">
                                              {(userPost._id === post.user) && (
                                                <div key={index} className="flex flex-col bg-gray-800 rounded-xl mb-4">

                                                  <div key={index} className="mx-4 border-gray-500 text-sm py-4 px-2">
                                                    <div key={index} className="">
                                                      {highlightHashTags(post.content)}
                                                    </div>
                                                    <div key={index} className="">
                                                      {post.image === '' ? <div className=""></div> : (
                                                        <Image src={`${post.image}`} width={1000} height={1000} alt={`${post.image}`} className='mt-4 rounded-xl'></Image>)}
                                                    </div>
                                                    <div className="text-xs mt-6 text-gray-400 flex flex-col">
                                                      {formatDate(post.date)}
                                                      <div key={index} className="text-gray-400 mt-2">
                                                        Taggeg by <Link href={`${process.env.NEXT_PUBLIC_HOST}/user/profile/${userPost.name}`} className='text-sky-400 hover:underline '>@{userPost.name}</Link>
                                                      </div>
                                                    </div>
                                                  </div>

                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="hidden"></div>
                                        )}
                                      </div>
                                    )}
                                  </Link>
                                ))}
                              </div>

                            ))}
                          </div>

                        </div>
                      )}
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
                      <Link href={`/user/profile/${userDetails1.name}`} className="flex justify-center text-lg font-medium items-center">
                        <div className={`border p-2 rounded-full ${userDetails1.role === 'admin' ? 'border-amber-400' : ''} ${userDetails1.tick === 'yes' ? 'border-sky-400' : ''} ${userDetails1.tick === 'active' ? 'border-teal-500' : ''}`}>
                          {slugDetails ? (
                            <Image src={`/avatars/${slugDetails.avatar}`} width={1000} height={1000} className="w-28 h-28 rounded-full cursor-pointer hover:scale-105" alt="Image" />) : (<Image src={`/avatars/dummy.jpeg`} width={1000} height={1000} className="w-28 h-28 rounded-full cursor-pointer hover:scale-105" alt="Image" />)}
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
                                  Club
                                </div>
                              </div>
                            )}

                          </div>

                          <div className="text-xs text-gray-500">{userDetails2.bio} <span className='text-sky-400 text-xs'> {userDetails2.gender}</span></div>
                          {userDetails1.tick === 'active' ? (
                            <div className="">
                              <div className="text-xs mt-2">Leader: <span className='text-sky-400 hover:underline'>{userDetails2.relation}</span></div>
                              <div className="text-xs mt-2">Since: <span className='text-sky-400 hover:underline'>{userDetails2.year}</span></div>
                              <div className="text-xs mt-2">Website: <Link href={`https://${userDetails2.LoveTo}`} className='text-sky-400 hover:underline'>{userDetails2.LoveTo}</Link></div>
                              <div className="text-xs mt-2">Insta: <Link href={`https://instagram.com/${userDetails2.bath}`} className='text-sky-400 hover:underline'>{userDetails2.bath}</Link></div>
                              <div className="text-xs mt-2">College: <span className='text-sky-400 hover:underline'>{userDetails2.college}</span></div>
                            </div>
                          ) : (
                            <div className="">
                              <div className="text-xs mt-2">Relation: <span className='text-sky-400 hover:underline'>{userDetails2.relation}</span></div>
                              <div className="text-xs mt-2">Year: <span className='text-sky-400 hover:underline'>{userDetails2.year}</span></div>
                              <div className="text-xs mt-2">Love to: <span className='text-sky-400 hover:underline truncate'>{userDetails2.LoveTo}</span></div>
                              <div className="text-xs mt-2">Bath: <span className='text-sky-400 hover:underline truncate'>{userDetails2.bath}</span></div>
                              <div className="text-xs mt-2">College: <span className='text-sky-400 hover:underline'>{(userDetails2.college !== 'NA') ? (userDetails2.college) : (
                                <Link href={`https://6z236yooyhh.typeform.com/to/tcFr6KOm`} target='_blank' className='text-red-500 hover:underline'>Add College</Link>
                              )}</span></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="flex justify-center">
                      <div className="mt-4 justify-start text-base font-medium items-start">

                        {/* button  */}
                        <div className="flex flex-row justify-center items-center">
                          {userDetails1.tick === 'active' ? (<Link href={''} className='p-1 px-4 rounded-2xl hover:scale-105 bg-sky-500 mr-4'>Hola 👋</Link>) : (
                            <Link href={'/user/Details'} className='p-1 px-4 rounded-2xl hover:scale-105 bg-sky-500 mr-4'>Edit Profile</Link>
                          )}
                          <button onClick={logout} href={''} className='p-1 px-4 rounded-2xl hover:scale-105 bg-sky-500 text-sm hover:bg-red-500'>Logout</button>
                          <Link href={'/menu/Setting'} className='p-1 px-4 rounded-2xl hover:scale-105'>
                            <svg aria-label="Options" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                          </Link>
                        </div>

                        <hr className='w-screen mt-2 border-gray-600' />

                        {/* user details  */}
                        <div className="grid grid-cols-3 mt-1">
                          {/* post  */}
                          <div className="flex flex-col justify-center items-center space-x-4 text-sm text-gray-400"><span className='text-sky-400'>{totalPosts}</span> post</div>

                          {/* followers  */}
                          <button onClick={showFollowing} className="flex flex-col justify-center items-center space-x-4 text-sm text-gray-400"><span className=' text-sky-400'>{totalFollowers}</span> followers</button>
                          <div className="absolute">
                            <div ref={ref4} className="fixed top-0 -left-2 z-50 w-96 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-black">
                              <div className="text-base font-semibold font-mono text-sky-400">Followers</div>
                              <button onClick={showFollowing} type="button" className="text-gray-400 bg-transparent hover:bg-sky-500 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-6 inline-flex items-center" >
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close menu</span>
                              </button>
                              <hr className="my-3 -mx-3" />
                              {userDetails7 && slugDetails && userDetails && Array.isArray(userDetails7) && userDetails7.map((userDet, indexDet) => (
                                <div key={indexDet} className="">
                                  {userDet.following === userDetails._id && (
                                    <div key={indexDet} className="bg-black">
                                      {userDetailsk1 && userDetailsk1.length > 0 && slugDetailsk1 && (
                                        <div className="mt-6">

                                          {Array.isArray(userDetailsk1) && userDetailsk1.map((user, index) => (

                                            <div key={index} className="">
                                              {userDet.user === user._id && (
                                                <Link key={index} href={`/user/profile/${user.name}`} className="flex-row flex mt-4 text-lg font-medium items-center hover:bg-gray-700 p-2 rounded-3xl px-4">

                                                  {user.details && slugDetailsk1.map((details, index2) => (

                                                    <div key={index2} className="hover:scale-105">
                                                      {userDet.user === details.user && userDet.user === user._id && (
                                                        <div>

                                                          {userDet.user === details.user && userDet.user === user._id && details.avatar && (
                                                            <Image src={`/avatars/${details.avatar}`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-11 h-11 mr-6 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                                                          )}
                                                          <span className="sr-only">Search</span>

                                                        </div>
                                                      )}
                                                    </div>

                                                  ))}

                                                  {Array.isArray(userDetailsk1) && userDetailsk1.map((user, index2) => (
                                                    <div key={index2} className="hover:scale-105">
                                                      {user.details && slugDetailsk1.map((details, index2) => (
                                                        <div className="">
                                                          {userDet.user === details.user && userDet.user === user._id && (
                                                            <div className="">

                                                              {userDet.user === details.user && userDet.user === user._id && user.details && (
                                                                <div className="flex flex-row">
                                                                  <div className="text-base flex justify-center items-center pr-2">{user.name}</div>
                                                                  {userDet.user === details.user && userDet.user === user._id && user.role === 'admin' && (
                                                                    <div className="hover:scale-105">
                                                                      <svg className='flex justify-center items-center text-amber-400'
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
                                                                  )}
                                                                  {userDet.user === details.user && userDet.user === user._id && user.tick === 'yes' && (
                                                                    <div className="hover:scale-105 pt-[0.10rem]">
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
                                                                    </div>
                                                                  )}
                                                                  {userDet.user === details.user && userDet.user === user._id && user.tick === 'active' && (
                                                                    <div className="hover:scale-105 pt-[0.10rem]">
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
                                                                    </div>
                                                                  )}
                                                                </div>
                                                              )}

                                                              {/* bio max 12 */}
                                                              {user.details && slugDetailsk1.map((details, index2) => (
                                                                <div key={index2}>

                                                                  {userDet.user === details.user && userDet.user === user._id && (
                                                                    <div>

                                                                      {userDet.user === details.user && userDet.user === user._id && details.bio && (
                                                                        <div className="text-sm text-gray-500 truncate">{details.bio}</div>
                                                                      )}

                                                                    </div>
                                                                  )}

                                                                </div>
                                                              ))}

                                                            </div>
                                                          )}
                                                        </div>
                                                      ))}
                                                    </div>
                                                  ))}
                                                </Link>
                                              )}
                                            </div>
                                          ))}

                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* following  */}
                          <button onClick={showFollower} className="flex flex-col justify-center items-center space-x-4 text-sm text-gray-400"><span className='text-sky-400'>{totalFollowing}</span> following</button>
                          <div className="absolute">
                            <div ref={ref3} className="fixed top-0 -left-2 z-50 w-96 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-black">
                              <div className="text-base font-semibold font-mono text-sky-400">Followings</div>
                              <button onClick={showFollower} type="button" className="text-gray-400 bg-transparent hover:bg-sky-500 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-6 inline-flex items-center" >
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close menu</span>
                              </button>
                              <hr className="my-3 -mx-3" />
                              {Array.isArray(followDetails) && followDetails.map((userPot, index) => (
                                <div key={index}>
                                  {userDetailsk1 && userDetailsk1.length > 0 && slugDetailsk1 && (
                                    <div className="mt-6">

                                      {Array.isArray(userDetailsk1) && userDetailsk1.map((user, index) => (

                                        <div key={index} className="">
                                          {userPot.following === user._id && (

                                            <Link key={index} href={`/user/profile/${user.name}`} className="flex-row flex mt-4 text-lg font-medium items-center hover:bg-gray-700 p-2 rounded-3xl px-4">

                                              {user.details && slugDetailsk1.map((details, index2) => (

                                                <div key={index2} className="hover:scale-105">
                                                  {userPot.following === details.user && userPot.following === user._id && (
                                                    <div>

                                                      {userPot.following === details.user && userPot.following === user._id && details.avatar && (
                                                        <Image src={`/avatars/${details.avatar}`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-11 h-11 mr-6 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                                                      )}
                                                      <span className="sr-only">Search</span>

                                                    </div>
                                                  )}
                                                </div>

                                              ))}

                                              {Array.isArray(userDetailsk1) && userDetailsk1.map((user, index2) => (
                                                <div key={index2} className="hover:scale-105">
                                                  {user.details && slugDetailsk1.map((details, index2) => (
                                                    <div className="">
                                                      {userPot.following === details.user && userPot.following === user._id && (
                                                        <div className="">

                                                          {userPot.following === details.user && userPot.following === user._id && user.details && (
                                                            <div className="flex flex-row">
                                                              <div className="text-base flex justify-center items-center pr-2">{user.name}</div>
                                                              {userPot.following === details.user && userPot.following === user._id && user.role === 'admin' && (
                                                                <div className="hover:scale-105">
                                                                  <svg className='flex justify-center items-center text-amber-400'
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
                                                              )}
                                                              {userPot.following === details.user && userPot.following === user._id && user.tick === 'yes' && (
                                                                <div className="hover:scale-105 pt-[0.10rem]">
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
                                                                </div>
                                                              )}
                                                              {userPot.following === details.user && userPot.following === user._id && user.tick === 'active' && (
                                                                <div className="hover:scale-105 pt-[0.10rem]">
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
                                                                </div>
                                                              )}
                                                            </div>
                                                          )}

                                                          {/* bio max 12 */}
                                                          {user.details && slugDetailsk1.map((details, index2) => (
                                                            <div key={index2}>

                                                              {userPot.following === details.user && userPot.following === user._id && (
                                                                <div>

                                                                  {userPot.following === details.user && userPot.following === user._id && details.bio && (
                                                                    <div className="text-sm text-gray-500 truncate">{details.bio}</div>
                                                                  )}

                                                                </div>
                                                              )}

                                                            </div>
                                                          ))}

                                                        </div>
                                                      )}
                                                    </div>
                                                  ))}
                                                </div>
                                              ))}
                                            </Link>
                                          )}
                                        </div>
                                      ))}

                                    </div>
                                  )}

                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <hr className='w-screen mt-1 border-gray-600' />

                        <div className="grid grid-cols-3 mt-2">
                          <button onClick={togglePost} className="flex justify-center font-semibold hover:text-sky-400 text-sm">Posts</button>
                          <button onClick={toggleFeed} className="flex justify-center font-semibold hover:text-sky-400 text-sm">Media</button>
                          <button onClick={toggleTagged} className="flex justify-center font-semibold hover:text-sky-400 text-sm">Tagged</button>

                        </div>

                        {/* post all  */}
                        {postDetails === undefined ? (
                          // If no posts, show a message to create a post
                          <div className="my-8 flex justify-center">
                            <Link href={`${process.env.NEXT_PUBLIC_HOST}/Feed/Create/Post`} className='text-white rounded-full bg-sky-500 p-3 font-medium hover:text-sky-500 hover:bg-white hover:scale-110'>Create a post</Link>
                          </div>
                        ) : (
                          <div className="flex gap-4 my-8 mx-6 mb-24">

                            {!showPost && <div>
                              <div className="">
                                {Array.isArray(reverse) && reverse.map((post, index) => (
                                  <div key={index} className="">
                                    {Array.isArray(userDetails4) && userDetails4.map((userPost, index) => (
                                      <Link href={`${process.env.NEXT_PUBLIC_HOST}/user/profile/${userPost.name}/${post.slugPostLink}`}>
                                        <div key={index} className="">
                                          {params.slug === userPost.name && (
                                            <div key={index} className="">
                                              {(userPost._id === post.user) && (
                                                <div key={index} className="flex flex-col bg-gray-800 rounded-xl mb-4">
                                                  <div key={index} className="mx-4 border-gray-500 text-sm py-4 px-2">
                                                    <div key={index} className="">
                                                      {highlightHashTags(post.content)}
                                                    </div>
                                                    <div key={index} className="">
                                                      {post.image === '' ? <div className=""></div> : (
                                                        <Image src={`${post.image}`} width={1000} height={1000} alt={`${post.image}`} className='mt-4 rounded-xl'></Image>)}
                                                    </div>
                                                    <div className="text-xs mt-6 text-gray-400 truncate">
                                                      {formatDate(post.date)}
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>}

                            {showFeed && (<div className="">
                              {Array.isArray(reverse) && reverse.map((post, index) => (
                                <div key={index} className="">
                                  {Array.isArray(userDetails4) && userDetails4.map((userPost, index) => (
                                    <div key={index} className="">
                                      {params.slug === userPost.name && (
                                        <div key={index} className="">
                                          {(userPost._id === post.user) && (
                                            <div className="flex flex-col bg-black rounded-xl">
                                              <div className="text-sm">
                                                <div key={index} className="">
                                                  {post.image === '' ? <div className="hidden"></div> : (
                                                    <Image src={`${post.image}`} width={1000} height={1000} alt={`${post.image}`} className='rounded-xl mb-4'></Image>)}
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>)}

                            {showTagged && <div className="">
                              {Array.isArray(reverse) && reverse.map((post, index) => (
                                <div key={index} className="">
                                  {Array.isArray(userDetails4) && userDetails4.map((userPost, index) => (
                                    <Link href={`${process.env.NEXT_PUBLIC_HOST}/user/profile/${userPost.name}/${post.slugPostLink}`}>
                                      {params.slug === "Founder" ? (
                                        <div className="">
                                          {post.content.includes("@" + params.slug) ? (
                                            <div key={index} className="">
                                              <div key={index} className="">
                                                {(userPost._id === post.user) && (
                                                  <div key={index} className="flex flex-col bg-gray-800 rounded-xl mb-4">

                                                    <div key={index} className="mx-4 border-gray-500 text-sm py-4 px-2">
                                                      <div key={index} className="">
                                                        {highlightHashTags(post.content)}
                                                      </div>
                                                      <div key={index} className="">
                                                        {post.image === '' ? <div className=""></div> : (
                                                          <Image src={`${post.image}`} width={1000} height={1000} alt={`${post.image}`} className='mt-4 rounded-xl'></Image>)}
                                                      </div>
                                                      <div className="text-xs mt-6 text-gray-400 flex flex-col">
                                                        {formatDate(post.date)}
                                                        <div key={index} className="text-gray-400 mt-2">
                                                          Taggeg by <Link href={`${process.env.NEXT_PUBLIC_HOST}/user/profile/${userPost.name}`} className='text-sky-400 hover:underline '>@{userPost.name}</Link>
                                                        </div>
                                                      </div>
                                                    </div>

                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          ) : (
                                            <div className="hidden"></div>
                                          )}
                                        </div>
                                      ) : (
                                        <div className="">
                                          {post.content.toLowerCase().includes("@" + params.slug) ? (
                                            <div key={index} className="">
                                              <div key={index} className="">
                                                {(userPost._id === post.user) && (
                                                  <div key={index} className="flex flex-col bg-gray-800 rounded-xl mb-4">

                                                    <div key={index} className="mx-4 border-gray-500 text-sm py-4 px-2">
                                                      <div key={index} className="">
                                                        {highlightHashTags(post.content)}
                                                      </div>
                                                      <div key={index} className="">
                                                        {post.image === '' ? <div className=""></div> : (
                                                          <Image src={`${post.image}`} width={1000} height={1000} alt={`${post.image}`} className='mt-4 rounded-xl'></Image>)}
                                                      </div>
                                                      <div className="text-xs mt-6 text-gray-400 flex flex-col">
                                                        {formatDate(post.date)}
                                                        <div key={index} className="text-gray-400 mt-2">
                                                          Taggeg by <Link href={`${process.env.NEXT_PUBLIC_HOST}/user/profile/${userPost.name}`} className='text-sky-400 hover:underline '>@{userPost.name}</Link>
                                                        </div>
                                                      </div>
                                                    </div>

                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          ) : (
                                            <div className="hidden"></div>
                                          )}
                                        </div>
                                      )}
                                    </Link>
                                  ))}
                                </div>

                              ))}
                            </div>}
                          </div>
                        )}

                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}
          {/* other  */}
          {params.slug !== userDetails1.name && slugDetails && userDetails && (
            <div className="bg-black text-white">
              <div className="md:grid md:grid-cols-12 flex flex-col">
                <RightSideNavbar />
                {/* Desktop  */}
                <div className="md:block hidden px-20 py-16 col-start-4 col-end-13">
                  <div className="md:grid md:grid-cols-12 flex flex-row mt-8 space-x-4">

                    {/* image  */}
                    <div className="col-start-1 col-end-4">
                      <Link href={`/user/profile/${userDetails.name}`} className="flex justify-end text-lg font-medium items-center">
                        <div className={`border p-2 rounded-full ${userDetails.role === 'admin' ? 'border-amber-400' : ''} ${userDetails.tick === 'yes' ? 'border-sky-400' : ''} ${userDetails.tick === 'active' ? 'border-teal-500' : ''}`}>
                          {slugDetails.avatar ? (
                            <Image src={`/avatars/${slugDetails.avatar}`} width={1000} height={1000} className="w-40 h-40 rounded-full cursor-pointer hover:scale-105" alt="Image" />) : (<Image src={`/avatars/dummy.jpeg`} width={1000} height={1000} className="w-40 h-40 rounded-full cursor-pointer hover:scale-105" alt="Image" />)}

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
                            <div className="text-base flex justify-center items-center pr-2">{userDetails.name}</div>
                            {userDetails.role === 'admin' && (<>
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
                            {userDetails.tick === 'yes' && (
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
                            {userDetails.tick === 'active' && (
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
                                    Club
                                  </div>
                                </div>
                              </div>)}
                          </div>

                          <div className="text-sm text-gray-500">{slugDetails.bio}<span className={`text-xs ${slugDetails.gender === 'Male' && 'text-sky-400' || slugDetails.gender === 'Female' && 'text-pink-500' || ((slugDetails.gender === 'Gay' || slugDetails.gender === 'Lesbian' || slugDetails.gender === 'Transgender') && 'text-red-500')}`}> {slugDetails.gender}</span></div>
                          {userDetails.tick === 'active' ? (
                            <div className="">
                              <div className="text-sm mt-2">Leader: <span className='text-sky-400 hover:underline'>{slugDetails.relation}</span></div>
                              <div className="text-sm mt-2">Since: <span className='text-sky-400 hover:underline'>{slugDetails.year}</span></div>
                              <div className="text-sm mt-2">Website: <Link href={`https://${slugDetails.LoveTo}`} className='text-sky-400 hover:underline'>{slugDetails.LoveTo}</Link></div>
                              <div className="text-sm mt-2">Insta: <Link href={`https://instagram.com/${slugDetails.bath}`} className='text-sky-400 hover:underline'>{slugDetails.bath}</Link></div>
                              <div className="text-sm mt-2">College: <span className='text-sky-400 hover:underline'>{slugDetails.college}</span></div>
                            </div>
                          ) : (
                            <div className="">
                              <div className="text-sm mt-2">Relation: <span className='text-sky-400 hover:underline'>{slugDetails.relation}</span></div>
                              <div className="text-sm mt-2">Year: <span className='text-sky-400 hover:underline'>{slugDetails.year}</span></div>
                              <div className="text-sm mt-2">Love to: <span className='text-sky-400 hover:underline'>{slugDetails.LoveTo}</span></div>
                              <div className="text-sm mt-2">Bath: <span className='text-sky-400 hover:underline'>{slugDetails.bath}</span></div>
                              <div className="text-sm mt-2">College: <span className='text-sky-400 hover:underline'>{(slugDetails.college !== 'NA') ? (slugDetails.college) : (
                                <Link href={`https://6z236yooyhh.typeform.com/to/tcFr6KOm`} target='_blank' className='text-red-500 hover:underline'>Add College</Link>
                              )}</span></div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* second  */}
                      <div className="md:grid flex col-start-5 col-end-13">
                        <div className="mt-8 justify-start text-base font-medium items-start">
                          <div className="flex flex-row justify-center items-center pl-0">


                            <div className="">
                              <button className={`p-1 px-4 rounded-2xl hover:scale-105 ${isFollowing ? 'bg-red-500' : 'bg-sky-500'} mr-4`} onClick={() => handleButtonClick(userDetails._id, userDetails._id)}>
                                {isFollowing ? 'Unfollow' : 'Follow'}
                              </button>
                            </div>

                            <Link href={`/user/profile/${userDetails.name}/chat`} className='p-1 px-4 rounded-2xl hover:scale-105 bg-sky-500'>Message</Link>
                            <Link href={'/menu/Setting'} className='p-1 px-4 rounded-2xl hover:scale-105'>
                              <svg aria-label="Options" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                            </Link>
                          </div>

                          {/* Follow & Following */}
                          <div className="flex flex-row space-x-8 mt-8">

                            {/* Post  */}
                            <div className="flex flex-row space-x-4"><span className='pr-2 text-sky-400'>{totalPosts}</span> post</div>

                            {/* Followers  */}
                            <button onClick={showFollowing} className="relative flex flex-row space-x-4"><span className='pr-2 text-sky-400'>{totalFollowers}</span> followers</button>
                            <div className="absolute">
                              <div ref={ref2} className="fixed border-l border-gray-500 top-0 -right-96 z-50 w-96 h-screen p-4 overflow-y-auto transition-transform translate-x-0 bg-black">
                                <div className="">
                                  <div className="text-base font-semibold font-mono text-sky-400">Followers</div>
                                  <button onClick={showFollowing} type="button" className="text-gray-400 bg-transparent hover:bg-sky-500 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center" >
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close menu</span>
                                  </button>
                                  <hr className="my-3" />
                                </div>
                                {userDetails7 && slugDetails && userDetails && Array.isArray(userDetails7) && userDetails7.map((userDet, indexDet) => (
                                  <div key={indexDet} className="">
                                    {userDet.following === userDetails._id && (
                                      <div key={indexDet} className="bg-black">
                                        {userDetailsk1 && userDetailsk1.length > 0 && slugDetailsk1 && (
                                          <div className="">

                                            {Array.isArray(userDetailsk1) && userDetailsk1.map((user, index) => (

                                              <div key={index} className="">
                                                {userDet.user === user._id && (
                                                  <Link key={index} href={`/user/profile/${user.name}`} className="flex-row flex text-lg mt-6 font-medium items-center hover:bg-gray-700 p-2 rounded-3xl px-4">

                                                    {user.details && slugDetailsk1.map((details, index2) => (

                                                      <div key={index2} className="hover:scale-105">
                                                        {userDet.user === details.user && userDet.user === user._id && (
                                                          <div>

                                                            {userDet.user === details.user && userDet.user === user._id && details.avatar && (
                                                              <Image src={`/avatars/${details.avatar}`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-11 h-11 mr-6 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                                                            )}
                                                            <span className="sr-only">Search</span>

                                                            <div key={index2} className="hidden">
                                                              {userDet.user === details.user && userDet.user === user._id && details.avatar && user.name === userDetails1.name && (
                                                                <div key={index2} className="">
                                                                  {/* here logic for follow & unfollow  */}
                                                                  {setTimeout(() => {
                                                                    // After 2 seconds, show the Story
                                                                    setIsFollowing(true);
                                                                  }, 10)}
                                                                </div>
                                                              )}
                                                            </div>
                                                            
                                                          </div>
                                                        )}
                                                      </div>

                                                    ))}

                                                    {Array.isArray(userDetailsk1) && userDetailsk1.map((user, index2) => (
                                                      <div key={index2} className="hover:scale-105">
                                                        {user.details && slugDetailsk1.map((details, index2) => (
                                                          <div className="">
                                                            {userDet.user === details.user && userDet.user === user._id && (
                                                              <div className="">

                                                                {userDet.user === details.user && userDet.user === user._id && user.details && (
                                                                  <div className="flex flex-row">
                                                                    <div className="text-base flex justify-center items-center pr-2">{user.name}</div>
                                                                    {userDet.user === details.user && userDet.user === user._id && user.role === 'admin' && (
                                                                      <div className="hover:scale-105">
                                                                        <svg className='flex justify-center items-center text-amber-400'
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
                                                                    )}
                                                                    {userDet.user === details.user && userDet.user === user._id && user.tick === 'yes' && (
                                                                      <div className="hover:scale-105 pt-[0.10rem]">
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
                                                                      </div>
                                                                    )}
                                                                    {userDet.user === details.user && userDet.user === user._id && user.tick === 'active' && (
                                                                      <div className="hover:scale-105 pt-[0.10rem]">
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
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                )}

                                                                {/* bio max 12 */}
                                                                {user.details && slugDetailsk1.map((details, index2) => (
                                                                  <div key={index2}>

                                                                    {userDet.user === details.user && userDet.user === user._id && (
                                                                      <div>

                                                                        {userDet.user === details.user && userDet.user === user._id && details.bio && (
                                                                          <div className="text-sm text-gray-500 truncate">{details.bio}</div>
                                                                        )}

                                                                      </div>
                                                                    )}

                                                                  </div>
                                                                ))}

                                                              </div>
                                                            )}
                                                          </div>
                                                        ))}
                                                      </div>
                                                    ))}
                                                  </Link>
                                                )}
                                              </div>
                                            ))}

                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Following  */}
                            <button onClick={showFollower} className="relative flex flex-row space-x-4"><span className='pr-2 text-sky-400'>{totalFollowing}</span> following</button>
                            <div className="absolute">
                              <div ref={ref1} className="fixed border-l border-gray-500 top-0 -right-96 z-50 w-96 h-screen p-4 overflow-y-auto transition-transform translate-x-0 bg-black">
                                <div className="">
                                  <div className="text-base font-semibold font-mono text-sky-400">Followings</div>
                                  <button onClick={showFollower} type="button" className="text-gray-400 bg-transparent hover:bg-sky-500 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center" >
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close menu</span>
                                  </button>
                                  <hr className="my-3" />
                                </div>
                                {Array.isArray(followDetails) && followDetails.map((userPot, index) => (
                                  <div key={index}>
                                    {userDetailsk1 && userDetailsk1.length > 0 && slugDetailsk1 && (
                                      <div className="mt-6">

                                        {Array.isArray(userDetailsk1) && userDetailsk1.map((user, index) => (

                                          <div key={index} className="">
                                            {userPot.following === user._id && (
                                              <Link key={index} href={`/user/profile/${user.name}`} className="flex-row flex mt-4 text-lg font-medium items-center hover:bg-gray-700 p-2 rounded-3xl px-4">

                                                {user.details && slugDetailsk1.map((details, index2) => (

                                                  <div key={index2} className="hover:scale-105">
                                                    {userPot.following === details.user && userPot.following === user._id && (
                                                      <div>

                                                        {userPot.following === details.user && userPot.following === user._id && details.avatar && (
                                                          <Image src={`/avatars/${details.avatar}`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-11 h-11 mr-6 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                                                        )}
                                                        <span className="sr-only">Search</span>

                                                      </div>
                                                    )}
                                                  </div>

                                                ))}

                                                {Array.isArray(userDetailsk1) && userDetailsk1.map((user, index2) => (
                                                  <div key={index2} className="hover:scale-105">
                                                    {user.details && slugDetailsk1.map((details, index2) => (
                                                      <div className="">
                                                        {userPot.following === details.user && userPot.following === user._id && (
                                                          <div className="">

                                                            {userPot.following === details.user && userPot.following === user._id && user.details && (
                                                              <div className="flex flex-row">
                                                                <div className="text-base flex justify-center items-center pr-2">{user.name}</div>
                                                                {userPot.following === details.user && userPot.following === user._id && user.role === 'admin' && (
                                                                  <div className="hover:scale-105">
                                                                    <svg className='flex justify-center items-center text-amber-400'
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
                                                                )}
                                                                {userPot.following === details.user && userPot.following === user._id && user.tick === 'yes' && (
                                                                  <div className="hover:scale-105 pt-[0.10rem]">
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
                                                                  </div>
                                                                )}
                                                                {userPot.following === details.user && userPot.following === user._id && user.tick === 'active' && (
                                                                  <div className="hover:scale-105 pt-[0.10rem]">
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
                                                                  </div>
                                                                )}
                                                              </div>
                                                            )}

                                                            {/* bio max 12 */}
                                                            {user.details && slugDetailsk1.map((details, index2) => (
                                                              <div key={index2}>

                                                                {userPot.following === details.user && userPot.following === user._id && (
                                                                  <div>

                                                                    {userPot.following === details.user && userPot.following === user._id && details.bio && (
                                                                      <div className="text-sm text-gray-500 truncate">{details.bio}</div>
                                                                    )}

                                                                  </div>
                                                                )}

                                                              </div>
                                                            ))}

                                                          </div>
                                                        )}
                                                      </div>
                                                    ))}
                                                  </div>
                                                ))}
                                              </Link>
                                            )}
                                          </div>
                                        ))}

                                      </div>
                                    )}

                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                  <hr className='mt-6 border-gray-500 border' />

                  {/* Posts Media & Tagged */}
                  <div className="">
                    <div className="grid grid-cols-3 mt-3">
                      <button className="flex justify-center font-semibold text-sky-400">Posts</button>
                      <button className="flex justify-center font-semibold text-sky-400">Media</button>
                      <button className="flex justify-center font-semibold text-sky-400">Tagged</button>
                    </div>



                    {/* ALL POST  */}
                    {postDetails === undefined ? (
                      // If no posts, show a message to create a post
                      <div className="my-8 flex justify-center pt-12">
                        <div className='text-sky-400 font-medium'>No posts available!</div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-4 my-8">
                        {/* Post  */}
                        <div className="">
                          {Array.isArray(reverse) && reverse.map((post, index) => (
                            <Link href={`${process.env.NEXT_PUBLIC_HOST}/user/profile/${userDetails.name}/${post.slugPostLink}`}>
                              <div key={index} className="">
                                {Array.isArray(userDetails4) && userDetails4.map((userPost, index) => (
                                  <div key={index} className="">
                                    {params.slug === userPost.name && (
                                      <div key={index} className="">
                                        {(userPost._id === post.user) && (
                                          <div key={index} className="flex flex-col bg-gray-800 rounded-xl mb-4">
                                            <div key={index} className="mx-4 border-gray-500 text-sm py-4 px-2">
                                              <div key={index} className="">
                                                {highlightHashTags(post.content)}
                                              </div>
                                              <div key={index} className="">
                                                {post.image === '' ? <div className=""></div> : (
                                                  <Image src={`${post.image}`} width={1000} height={1000} alt={`${post.image}`} className='mt-4 rounded-xl'></Image>)}
                                              </div>
                                              <div className="text-xs mt-6 text-gray-400 truncate">
                                                {formatDate(post.date)}
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* media  */}
                        <div className="">
                          {Array.isArray(reverse) && reverse.map((post, index) => (
                            <div key={index} className="">
                              {Array.isArray(userDetails4) && userDetails4.map((userPost, index) => (
                                <div key={index} className="">
                                  {params.slug === userPost.name && (
                                    <div key={index} className="">
                                      {(userPost._id === post.user) && (
                                        <div className="flex flex-col bg-black rounded-xl">
                                          <div className="text-sm">
                                            <div key={index} className="">
                                              {post.image === '' ? <div className="hidden"></div> : (
                                                <Image src={`${post.image}`} width={1000} height={1000} alt={`${post.image}`} className='rounded-xl mb-4'></Image>)}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                        {/* Tagged  */}
                        <div className="">
                          {Array.isArray(reverse) && reverse.map((post, index) => (
                            <div key={index} className="">
                              {Array.isArray(userDetails4) && userDetails4.map((userPost, index) => (
                                <Link href={`${process.env.NEXT_PUBLIC_HOST}/user/profile/${userPost.name}/${post.slugPostLink}`}>
                                  {params.slug === "Founder" ? (
                                    <div className="">
                                      {post.content.includes("@" + params.slug) ? (
                                        <div key={index} className="">
                                          <div key={index} className="">
                                            {(userPost._id === post.user) && (
                                              <div key={index} className="flex flex-col bg-gray-800 rounded-xl mb-4">

                                                <div key={index} className="mx-4 border-gray-500 text-sm py-4 px-2">
                                                  <div key={index} className="">
                                                    {highlightHashTags(post.content)}
                                                  </div>
                                                  <div key={index} className="">
                                                    {post.image === '' ? <div className=""></div> : (
                                                      <Image src={`${post.image}`} width={1000} height={1000} alt={`${post.image}`} className='mt-4 rounded-xl'></Image>)}
                                                  </div>
                                                  <div className="text-xs mt-6 text-gray-400 flex flex-col">
                                                    {formatDate(post.date)}
                                                    <div key={index} className="text-gray-400 mt-2">
                                                      Taggeg by <Link href={`${process.env.NEXT_PUBLIC_HOST}/user/profile/${userPost.name}`} className='text-sky-400 hover:underline '>@{userPost.name}</Link>
                                                    </div>
                                                  </div>
                                                </div>

                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="hidden"></div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="">
                                      {post.content.toLowerCase().includes("@" + params.slug) ? (
                                        <div key={index} className="">
                                          <div key={index} className="">
                                            {(userPost._id === post.user) && (
                                              <div key={index} className="flex flex-col bg-gray-800 rounded-xl mb-4">

                                                <div key={index} className="mx-4 border-gray-500 text-sm py-4 px-2">
                                                  <div key={index} className="">
                                                    {highlightHashTags(post.content)}
                                                  </div>
                                                  <div key={index} className="">
                                                    {post.image === '' ? <div className=""></div> : (
                                                      <Image src={`${post.image}`} width={1000} height={1000} alt={`${post.image}`} className='mt-4 rounded-xl'></Image>)}
                                                  </div>
                                                  <div className="text-xs mt-6 text-gray-400 flex flex-col">
                                                    {formatDate(post.date)}
                                                    <div key={index} className="text-gray-400 mt-2">
                                                      Taggeg by <Link href={`${process.env.NEXT_PUBLIC_HOST}/user/profile/${userPost.name}`} className='text-sky-400 hover:underline '>@{userPost.name}</Link>
                                                    </div>
                                                  </div>
                                                </div>

                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="hidden"></div>
                                      )}
                                    </div>
                                  )}
                                </Link>
                              ))}
                            </div>

                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                </div>


                {/* Mobile  */}
                <div className="md:hidden block py-6">
                  <nav>

                  </nav>

                  <div className="">
                    {/* first line  */}
                    <div className="grid grid-cols-2 px-6 space-x-4">
                      <Link href={`/user/profile/${userDetails.name}`} className="flex justify-center text-lg font-medium items-center">
                        <div className={`border p-2 rounded-full ${userDetails.role === 'admin' ? 'border-amber-400' : ''} ${userDetails.tick === 'yes' ? 'border-sky-400' : ''} ${userDetails.tick === 'active' ? 'border-teal-500' : ''}`}>
                          {slugDetails.avatar ? (
                            <Image src={`/avatars/${slugDetails.avatar}`} width={1000} height={1000} className="w-28 h-28 rounded-full cursor-pointer hover:scale-105" alt="Image" />) : (<Image src={`/avatars/dummy.jpeg`} width={1000} height={1000} className="w-28 h-28 rounded-full cursor-pointer hover:scale-105" alt="Image" />)}
                          <span className="sr-only">Search</span>
                        </div>
                      </Link>
                      <div className="flex flex-col">
                        <div className="flex flex-col justify-start text-lg font-medium items-start">

                          <div className="flex flex-row">
                            <div className="text-sm flex justify-center items-center pr-2">{userDetails.name}</div>

                            {userDetails.role === 'admin' && (
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
                            {userDetails.tick === 'yes' && (
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
                            {userDetails.tick === 'active' && (
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
                                  Club
                                </div>
                              </div>
                            )}

                          </div>

                          <div className="text-xs text-gray-500">{slugDetails.bio} <span className={`text-xs ${slugDetails.gender === 'Male' && 'text-sky-400' || slugDetails.gender === 'Female' && 'text-pink-500' || ((slugDetails.gender === 'Gay' || slugDetails.gender === 'Lesbian' || slugDetails.gender === 'Transgender') && 'text-red-500')}`}> {slugDetails.gender}</span></div>
                          {userDetails.tick === 'active' ? (
                            <div className="">
                              <div className="text-xs mt-2">Leader: <span className='text-sky-400 hover:underline'>{slugDetails.relation}</span></div>
                              <div className="text-xs mt-2">Since: <span className='text-sky-400 hover:underline'>{slugDetails.year}</span></div>
                              <div className="text-xs mt-2">Website: <Link href={`https://${slugDetails.LoveTo}`} className='text-sky-400 hover:underline'>{slugDetails.LoveTo}</Link></div>
                              <div className="text-xs mt-2">Insta: <Link href={`https://instagram.com/${slugDetails.bath}`} className='text-sky-400 hover:underline'>{slugDetails.bath}</Link></div>
                              <div className="text-xs mt-2">College: <span className='text-sky-400 hover:underline'>{slugDetails.college}</span></div>
                            </div>
                          ) : (
                            <div className="">
                              <div className="text-xs mt-2">Relation: <span className='text-sky-400 hover:underline'>{slugDetails.relation}</span></div>
                              <div className="text-xs mt-2">Year: <span className='text-sky-400 hover:underline'>{slugDetails.year}</span></div>
                              <div className="text-xs mt-2">Love to: <span className='text-sky-400 hover:underline truncate'>{slugDetails.LoveTo}</span></div>
                              <div className="text-xs mt-2">Bath: <span className='text-sky-400 hover:underline truncate'>{slugDetails.bath}</span></div>
                              <div className="text-xs mt-2">College: <span className='text-sky-400 hover:underline'>{(slugDetails.college !== 'NA') ? (slugDetails.college) : (
                                <Link href={`https://6z236yooyhh.typeform.com/to/tcFr6KOm`} target='_blank' className='text-red-500 hover:underline'>Add College</Link>
                              )}</span></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="flex justify-center">
                      <div className="mt-4 justify-start text-base font-medium items-start">

                        {/* button  */}
                        <div className="flex flex-row justify-center items-center">

                          <button className={`p-1 px-4 rounded-2xl hover:scale-105 ${isFollowing ? 'bg-red-500' : 'bg-sky-500'} mr-4 text-sm`} onClick={() => handleButtonClick(userDetails._id, userDetails._id)}>
                            {isFollowing ? 'Unfollow' : 'Follow'}
                          </button>

                          <Link href={`/user/profile/${userDetails.name}/chat`} className='p-1 px-4 rounded-2xl hover:scale-105 bg-sky-500 text-sm'>Message</Link>
                          <Link href={'/menu/Setting'} className='p-1 px-4 rounded-2xl hover:scale-105'>
                            <svg aria-label="Options" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                          </Link>
                        </div>

                        <hr className='w-screen mt-2 border-gray-600' />

                        {/* user details  */}
                        <div className="grid grid-cols-3 mt-1">
                          {/* Post  */}
                          <div className="flex flex-col justify-center items-center space-x-4 text-sm text-gray-400"><span className='pr-2 text-sky-400'>{totalPosts}</span> post</div>

                          {/* followers  */}
                          <button onClick={showFollowing} className="flex flex-col justify-center items-center space-x-4 text-sm text-gray-400"><span className=' text-sky-400'>{totalFollowers}</span> followers</button>
                          <div className="absolute">
                            <div ref={ref4} className="fixed top-0 -left-2 z-50 w-96 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-black">
                              <div className="text-base font-semibold font-mono text-sky-400">Followers</div>
                              <button onClick={showFollowing} type="button" className="text-gray-400 bg-transparent hover:bg-sky-500 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-6 inline-flex items-center" >
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close menu</span>
                              </button>
                              <hr className="my-3 -mx-3" />
                              {userDetails7 && slugDetails && userDetails && Array.isArray(userDetails7) && userDetails7.map((userDet, indexDet) => (
                                <div key={indexDet} className="">
                                  {userDet.following === userDetails._id && (
                                    <div key={indexDet} className="bg-black">
                                      {userDetailsk1 && userDetailsk1.length > 0 && slugDetailsk1 && (
                                        <div className="mt-6">

                                          {Array.isArray(userDetailsk1) && userDetailsk1.map((user, index) => (

                                            <div key={index} className="">
                                              {userDet.user === user._id && (
                                                <Link key={index} href={`/user/profile/${user.name}`} className="flex-row flex mt-4 text-lg font-medium items-center hover:bg-gray-700 p-2 rounded-3xl px-4">

                                                  {user.details && slugDetailsk1.map((details, index2) => (

                                                    <div key={index2} className="hover:scale-105">
                                                      {userDet.user === details.user && userDet.user === user._id && (
                                                        <div>

                                                          {userDet.user === details.user && userDet.user === user._id && details.avatar && (
                                                            <Image src={`/avatars/${details.avatar}`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-11 h-11 mr-6 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                                                          )}
                                                          <span className="sr-only">Search</span>
                                                          <div key={index2} className="hidden">
                                                            {userDet.user === details.user && userDet.user === user._id && details.avatar && user.name === userDetails1.name && (
                                                              <div key={index2} className="">
                                                                {/* here logic for follow & unfollow  */}
                                                                {setTimeout(() => {
                                                                  // After 2 seconds, show the Story
                                                                  setIsFollowing(true);
                                                                }, 10)}
                                                              </div>
                                                            )}
                                                          </div>
                                                        </div>
                                                      )}
                                                    </div>

                                                  ))}

                                                  {Array.isArray(userDetailsk1) && userDetailsk1.map((user, index2) => (
                                                    <div key={index2} className="hover:scale-105">
                                                      {user.details && slugDetailsk1.map((details, index2) => (
                                                        <div className="">
                                                          {userDet.user === details.user && userDet.user === user._id && (
                                                            <div className="">

                                                              {userDet.user === details.user && userDet.user === user._id && user.details && (
                                                                <div className="flex flex-row">
                                                                  <div className="text-base flex justify-center items-center pr-2">{user.name}</div>
                                                                  {userDet.user === details.user && userDet.user === user._id && user.role === 'admin' && (
                                                                    <div className="hover:scale-105">
                                                                      <svg className='flex justify-center items-center text-amber-400'
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
                                                                  )}
                                                                  {userDet.user === details.user && userDet.user === user._id && user.tick === 'yes' && (
                                                                    <div className="hover:scale-105 pt-[0.10rem]">
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
                                                                    </div>
                                                                  )}
                                                                  {userDet.user === details.user && userDet.user === user._id && user.tick === 'active' && (
                                                                    <div className="hover:scale-105 pt-[0.10rem]">
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
                                                                    </div>
                                                                  )}
                                                                </div>
                                                              )}

                                                              {/* bio max 12 */}
                                                              {user.details && slugDetailsk1.map((details, index2) => (
                                                                <div key={index2}>

                                                                  {userDet.user === details.user && userDet.user === user._id && (
                                                                    <div>

                                                                      {userDet.user === details.user && userDet.user === user._id && details.bio && (
                                                                        <div className="text-sm text-gray-500 truncate">{details.bio}</div>
                                                                      )}

                                                                    </div>
                                                                  )}

                                                                </div>
                                                              ))}

                                                            </div>
                                                          )}
                                                        </div>
                                                      ))}
                                                    </div>
                                                  ))}
                                                </Link>
                                              )}
                                            </div>
                                          ))}

                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* following  */}
                          <button onClick={showFollower} className="flex flex-col justify-center items-center space-x-4 text-sm text-gray-400"><span className='text-sky-400'>{totalFollowing}</span> following</button>
                          <div className="absolute">
                            <div ref={ref3} className="fixed top-0 -left-2 z-50 w-96 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-black">
                              <div className="text-base font-semibold font-mono text-sky-400">Followings</div>
                              <button onClick={showFollower} type="button" className="text-gray-400 bg-transparent hover:bg-sky-500 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-6 inline-flex items-center" >
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close menu</span>
                              </button>
                              <hr className="my-3 -mx-3" />
                              {Array.isArray(followDetails) && followDetails.map((userPot, index) => (
                                <div key={index}>
                                  {userDetailsk1 && userDetailsk1.length > 0 && slugDetailsk1 && (
                                    <div className="mt-6">

                                      {Array.isArray(userDetailsk1) && userDetailsk1.map((user, index) => (

                                        <div key={index} className="">
                                          {userPot.following === user._id && (

                                            <Link key={index} href={`/user/profile/${user.name}`} className="flex-row flex mt-4 text-lg font-medium items-center hover:bg-gray-700 p-2 rounded-3xl px-4">

                                              {user.details && slugDetailsk1.map((details, index2) => (

                                                <div key={index2} className="hover:scale-105">
                                                  {userPot.following === details.user && userPot.following === user._id && (
                                                    <div>

                                                      {userPot.following === details.user && userPot.following === user._id && details.avatar && (
                                                        <Image src={`/avatars/${details.avatar}`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-11 h-11 mr-6 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                                                      )}
                                                      <span className="sr-only">Search</span>

                                                    </div>
                                                  )}
                                                </div>

                                              ))}

                                              {Array.isArray(userDetailsk1) && userDetailsk1.map((user, index2) => (
                                                <div key={index2} className="hover:scale-105">
                                                  {user.details && slugDetailsk1.map((details, index2) => (
                                                    <div className="">
                                                      {userPot.following === details.user && userPot.following === user._id && (
                                                        <div className="">

                                                          {userPot.following === details.user && userPot.following === user._id && user.details && (
                                                            <div className="flex flex-row">
                                                              <div className="text-base flex justify-center items-center pr-2">{user.name}</div>
                                                              {userPot.following === details.user && userPot.following === user._id && user.role === 'admin' && (
                                                                <div className="hover:scale-105">
                                                                  <svg className='flex justify-center items-center text-amber-400'
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
                                                              )}
                                                              {userPot.following === details.user && userPot.following === user._id && user.tick === 'yes' && (
                                                                <div className="hover:scale-105 pt-[0.10rem]">
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
                                                                </div>
                                                              )}
                                                              {userPot.following === details.user && userPot.following === user._id && user.tick === 'active' && (
                                                                <div className="hover:scale-105 pt-[0.10rem]">
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
                                                                </div>
                                                              )}
                                                            </div>
                                                          )}

                                                          {/* bio max 12 */}
                                                          {user.details && slugDetailsk1.map((details, index2) => (
                                                            <div key={index2}>

                                                              {userPot.following === details.user && userPot.following === user._id && (
                                                                <div>

                                                                  {userPot.following === details.user && userPot.following === user._id && details.bio && (
                                                                    <div className="text-sm text-gray-500 truncate">{details.bio}</div>
                                                                  )}

                                                                </div>
                                                              )}

                                                            </div>
                                                          ))}

                                                        </div>
                                                      )}
                                                    </div>
                                                  ))}
                                                </div>
                                              ))}
                                            </Link>
                                          )}
                                        </div>
                                      ))}

                                    </div>
                                  )}

                                </div>
                              ))}
                            </div>
                          </div>

                        </div>

                        <hr className='w-screen mt-1 border-gray-600' />

                        <div className="grid grid-cols-3 mt-2">
                          <button onClick={togglePost} className="flex justify-center font-semibold hover:text-sky-400 text-sm">Posts</button>
                          <button onClick={toggleFeed} className="flex justify-center font-semibold hover:text-sky-400 text-sm">Media</button>
                          <button onClick={toggleTagged} className="flex justify-center font-semibold hover:text-sky-400 text-sm">Tagged</button>

                        </div>

                        {/* post all  */}
                        {postDetails === undefined ? (
                          // If no posts, show a message to create a post
                          <div className="my-8 flex justify-center pt-12">
                            <div className='text-sky-400 font-medium'>No posts available!</div>
                          </div>
                        ) : (
                          <div className="flex gap-4 my-8 mx-6 mb-24">

                            {!showPost && <div>
                              <div className="">
                                {Array.isArray(reverse) && reverse.map((post, index) => (
                                  <div key={index} className="">
                                    {Array.isArray(userDetails4) && userDetails4.map((userPost, index) => (
                                      <Link href={`${process.env.NEXT_PUBLIC_HOST}/user/profile/${userPost.name}/${post.slugPostLink}`}>
                                        <div key={index} className="">
                                          {params.slug === userPost.name && (
                                            <div key={index} className="">
                                              {(userPost._id === post.user) && (
                                                <div key={index} className="flex flex-col bg-gray-800 rounded-xl mb-4">
                                                  <div key={index} className="mx-4 border-gray-500 text-sm py-4 px-2">
                                                    <div key={index} className="">
                                                      {highlightHashTags(post.content)}
                                                    </div>
                                                    <div key={index} className="">
                                                      {post.image === '' ? <div className=""></div> : (
                                                        <Image src={`${post.image}`} width={1000} height={1000} alt={`${post.image}`} className='mt-4 rounded-xl'></Image>)}
                                                    </div>
                                                    <div className="text-xs mt-6 text-gray-400 truncate">
                                                      {formatDate(post.date)}
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>}

                            {showFeed && <div className="">
                              {Array.isArray(reverse) && reverse.map((post, index) => (
                                <div key={index} className="">
                                  {Array.isArray(userDetails4) && userDetails4.map((userPost, index) => (
                                    <div key={index} className="">
                                      {params.slug === userPost.name && (
                                        <div key={index} className="">
                                          {(userPost._id === post.user) && (
                                            <div className="flex flex-col bg-black rounded-xl">
                                              <div className="text-sm">
                                                <div key={index} className="">
                                                  {post.image === '' ? <div className="hidden"></div> : (
                                                    <Image src={`${post.image}`} width={1000} height={1000} alt={`${post.image}`} className='rounded-xl mb-4'></Image>)}
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>}

                            {showTagged && <div className="">
                              {Array.isArray(reverse) && reverse.map((post, index) => (
                                <div key={index} className="">
                                  {Array.isArray(userDetails4) && userDetails4.map((userPost, index) => (
                                    <Link href={`${process.env.NEXT_PUBLIC_HOST}/user/profile/${userPost.name}/${post.slugPostLink}`}>
                                      {params.slug === "Founder" ? (
                                        <div className="">
                                          {post.content.includes("@" + params.slug) ? (
                                            <div key={index} className="">
                                              <div key={index} className="">
                                                {(userPost._id === post.user) && (
                                                  <div key={index} className="flex flex-col bg-gray-800 rounded-xl mb-4">

                                                    <div key={index} className="mx-4 border-gray-500 text-sm py-4 px-2">
                                                      <div key={index} className="">
                                                        {highlightHashTags(post.content)}
                                                      </div>
                                                      <div key={index} className="">
                                                        {post.image === '' ? <div className=""></div> : (
                                                          <Image src={`${post.image}`} width={1000} height={1000} alt={`${post.image}`} className='mt-4 rounded-xl'></Image>)}
                                                      </div>
                                                      <div className="text-xs mt-6 text-gray-400 flex flex-col">
                                                        {formatDate(post.date)}
                                                        <div key={index} className="text-gray-400 mt-2">
                                                          Taggeg by <Link href={`${process.env.NEXT_PUBLIC_HOST}/user/profile/${userPost.name}`} className='text-sky-400 hover:underline '>@{userPost.name}</Link>
                                                        </div>
                                                      </div>
                                                    </div>

                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          ) : (
                                            <div className="hidden"></div>
                                          )}
                                        </div>
                                      ) : (
                                        <div className="">
                                          {post.content.toLowerCase().includes("@" + params.slug) ? (
                                            <div key={index} className="">
                                              <div key={index} className="">
                                                {(userPost._id === post.user) && (
                                                  <div key={index} className="flex flex-col bg-gray-800 rounded-xl mb-4">

                                                    <div key={index} className="mx-4 border-gray-500 text-sm py-4 px-2">
                                                      <div key={index} className="">
                                                        {highlightHashTags(post.content)}
                                                      </div>
                                                      <div key={index} className="">
                                                        {post.image === '' ? <div className=""></div> : (
                                                          <Image src={`${post.image}`} width={1000} height={1000} alt={`${post.image}`} className='mt-4 rounded-xl'></Image>)}
                                                      </div>
                                                      <div className="text-xs mt-6 text-gray-400 flex flex-col">
                                                        {formatDate(post.date)}
                                                        <div key={index} className="text-gray-400 mt-2">
                                                          Taggeg by <Link href={`${process.env.NEXT_PUBLIC_HOST}/user/profile/${userPost.name}`} className='text-sky-400 hover:underline '>@{userPost.name}</Link>
                                                        </div>
                                                      </div>
                                                    </div>

                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          ) : (
                                            <div className="hidden"></div>
                                          )}
                                        </div>
                                      )}
                                    </Link>
                                  ))}
                                </div>

                              ))}
                            </div>}
                          </div>
                        )}

                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}
          {/* not exist  */}
          {params.slug !== userDetails1.name && !userDetails && (
            <div className="bg-black text-white flex flex-col justify-center h-screen">
              <div className="text-base flex justify-center underline text-sky-400 mb-6">Sorry, this page isn't available.</div>
              <div className="flex justify-center px-4">The link you followed may be broken, or the page may have been removed. </div>
              <div className="mt-6 flex justify-center">
                <Link href={`/user/profile/${userDetails1.name}`} className="hover:underline">
                  <button className='p-2 px-3 bg-sky-400 rounded-3xl hover:scale-105'>
                    Go back.
                  </button>
                </Link>
              </div>
            </div>
          )}
          <ScrollButton1 />
          <BottomNavbar />
        </div >
      )}
    </>
  )
}

export default Profile