"use client"
import Example from '@/app/UI/Loader/page'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Setting = () => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = '/'
    }

    setTimeout(() => {
      // After 2 seconds, show the Story
      setShowLoader(true);
    }, 1000);
  }, [])

  return (
    <>
      {!showLoader ? (
        // Render the Story component after 2 seconds
        <Example />
      ) : (
        <div className="">

        </div>
      )}
    </>
  )
}

export default Setting
