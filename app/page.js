import React from "react"
import Login from "./user/login/page"
import Image from "next/image"

export default function Main() {
  return (
    <>
      <div className="bg-black text-white pt-12">
        <div className="md:grid md:grid-cols-2 flex flex-col">
          <div className="bg-sky-500 md:h-screen md:rounded-r-full flex justify-center items-center">
            <Image className="hover:scale-105" src={'/main1.png.webp'} width={600} height={600}>
            </Image>
          </div>
          <Login />
        </div>
      </div>

      <div className="pt-12">
        <div className="md:grid md:grid-cols-2 flex flex-col">
          <div className="md:order-1 order-2 flex justify-center items-center py-20 md:px-28 px-12">

            <span className="self-center md:text-5xl text-3xl text-white font-extrabold">
            Many of you <span className="underline decoration-sky-400">might</span> be <span className="underline decoration-sky-400">wondering</span> what is this F***ing <br /><span className='md:text-5xl text-3xl font-extrabold line-through decoration-white text-sky-400'>The</span> PairUp
              <span className='md:text-5xl text-3xl font-extrabold text-sky-400'>?</span>
            </span>

          </div>
          <div className="flex justify-center items-center md:order-2 order-1">
            <Image className="hover:scale-105" src={'/main2.png.webp'} width={600} height={600}>
            </Image>
          </div>
        </div>
      </div>

      <div className="">
        fhajdfjadsfh
      </div>
    </>
  )
}