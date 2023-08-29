"use client"
import Example from '@/app/UI/Loader/page';
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Page({ params }) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
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
          <h1>My {params.slug} post</h1>
          <h1>My {params.slugPost} Link</h1>
        </div>
      )}
    </>
  )
}