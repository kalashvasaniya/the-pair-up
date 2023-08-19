"use client"
import React from 'react'
import { useEffect } from 'react'
import Link from 'next/link'

const Search = () => {
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/'
        }
    }, [])

    const searchUser = () => {
    }
    
    return (
        <>
            <div className="p-4">
                <div className='md:hidden block'>
                    <div className="text-base font-semibold font-mono text-sky-400">Search</div>
                    <Link href={'/Home'} type="button" className="text-gray-400 bg-transparent hover:bg-sky-500 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center" >
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close menu</span>
                    </Link>
                    <hr className="my-3" />
                </div>
                <form onSubmit={searchUser} class="flex items-center">
                    <label for="simple-search" class="sr-only">Search</label>
                    <div class="relative w-full">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                            </svg>
                        </div>
                        <input type="text" id="simple-search" class=" text-black font-semibold text-sm rounded-lg block w-full pl-10 p-2.5 " placeholder="Search Username..." required />
                    </div>

                    {/* <!-- Search input --> */}
                    <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white hover:bg-sky-400 bg-sky-400 rounded-lg border hover:border-sky-400">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span class="sr-only">Search</span>
                    </button>
                </form>
                <div className="p-4">Hello</div>
            </div>
        </>
    )
}

export default Search
