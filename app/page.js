"use client"
import React from "react"
import Login from "./user/login/page"
import Image from "next/image"
import Link from "next/link"
import Contact from "./Contact/page"
import { useEffect } from "react"
import Navbar from "@/components/Navbar/page"
import Footer from "@/components/Footer/page"
import Float from "@/components/Float/page"
import { useState } from "react"

import Loading from "./UI/Loading/page"

export default function Main() {

  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      window.location.href = '/Home'
    }
    setTimeout(() => {
      setContentLoaded(true);
    }, 1000);
  }, [])

  return (
    <>
      {!contentLoaded ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <Float />
          <div className="bg-black text-white pt-12">
            <div className="md:grid md:grid-cols-2 flex flex-col">
              <div className="bg-sky-500 md:h-screen md:rounded-r-full flex justify-center items-center">
                <Image className="hover:scale-105 transition ease-in-out delay-150 duration-300" src={'/main1.png.webp'} width={600} height={600}>
                </Image>
              </div>
              <Login />
            </div>
          </div>

          <div className="bg-black pt-24">
            <div className="md:grid md:grid-cols-2 flex flex-col">
              <div className="md:order-1 order-2 flex justify-center items-center py-20 md:px-28 px-12">
                <div className="">
                  <span className="self-center md:text-5xl text-3xl text-white font-extrabold">
                    Many of you <span className="underline decoration-sky-400">might</span> be <span className="underline decoration-sky-400">wondering</span> what is this Freaking <br /><span className='md:text-5xl text-3xl font-extrabold line-through decoration-white text-sky-400'>The</span> PairUp
                    <span className='md:text-5xl text-3xl font-extrabold text-sky-400'>?</span>
                  </span>
                  <br />
                  <div className="pt-6 space-x-4">
                    <Link href={'/About'} className="border p-2 px-4 rounded-3xl decoration-white text-white">Read</Link>
                  </div>
                </div>

              </div>
              <div className="flex justify-center items-center md:order-2 order-1">
                <Image className="hover:scale-105 transition ease-in-out delay-150 duration-300" src={'/main2.png.webp'} width={600} height={600}>
                </Image>
              </div>
            </div>
          </div>

          <div className="relative bg-black">
            <div className="md:absolute top-[65%] right-[42%] flex justify-center">
              <Contact />
            </div>
            <Image className="" width={1800} height={400} src={'/main3.jpg'}></Image>
          </div>
          <Footer />
        </>
      )}
    </>
  )
}