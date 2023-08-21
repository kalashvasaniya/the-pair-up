"use client"
import React from 'react'
import { useEffect } from 'react'
import Story from './Story/page'

const Feed = () => {
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/'
        }
    }, [])
    return (
        <>
            <Story />
            <hr className='border border-gray-700 mb-3 md:mx-10' />
            <div className="px-4 p-1">
                <div className="">

                </div>
                <div className="">

                </div>
            </div>
        </>
    )
}

export default Feed
