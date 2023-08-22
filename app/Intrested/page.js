"use client"
import React from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

const Intrested = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [slugDetails, setSlugDetails] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = '/'
    }
    searchUser()
  }, [])

  const searchUser = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/searchUser?slug=${slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserDetails(data.users);
        setSlugDetails(data.details)
        console.log("User", userDetails, slugDetails);
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="p-4 bg-black">

        {/* nothing  */}
        <div className='md:hidden block'>
          <div className="text-base font-semibold font-mono text-sky-400">Intrested</div>
          <Link href={'/Home'} type="button" className="text-gray-400 bg-transparent hover:bg-sky-500 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center" >
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Close menu</span>
          </Link>
          <hr className="my-3" />
        </div>

        <div className="text-base font-mono pb-4">Here are the individuals who are eagerly seeking a connection of the heart.</div>

        <hr className='' />

        {userDetails && userDetails.length > 0 && slugDetails && (
          <div className="mt-6">

            {userDetails.map((user, index) => (

              <Link key={index} href={`/user/profile/${user.name}`} className="flex-row flex mt-4 text-lg font-medium items-center hover:bg-gray-700 p-2 rounded-3xl px-4">

                {user.details && slugDetails.map((details, index2) => (

                  <div key={index2} className="hover:scale-105">
                    {user._id === details.user && (
                      <div>

                        {details.avatar ? (
                          <Image src={`/avatars/${details.avatar}`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-11 h-11 mr-6 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />
                        ) : (<Image src={`/avatars/dummy.jpeg`} width={28} height={28} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-11 h-11 rounded-full cursor-pointer hover:scale-110" alt="User dropdown" />)}
                        <span className="sr-only">Search</span>

                      </div>
                    )}
                  </div>

                ))}

                <div className="">

                  {user.details && (
                    <div className="flex flex-row">
                      <div className="text-base flex justify-center items-center pr-2">{user.name}</div>
                      {user.role === 'admin' && (
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
                      {user.tick === 'yes' && (
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
                      {user.tick === 'active' && (
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
                  {user.details && slugDetails.map((details, index2) => (
                    <div key={index2}>

                      {user._id === details.user && (
                        <div>

                          {details.bio ? (
                            <div className="text-sm text-gray-500 truncate">{details.bio}</div>
                          ) : (
                            <div className="text-sm text-gray-500 truncate">Bio Not available</div>
                          )}

                        </div>
                      )}

                    </div>
                  ))}

                </div>
              </Link>
            ))}

          </div>
        )}


      </div>
    </>
  )
}

export default Intrested
