import React from 'react'
import { useTPU } from '@/app/layout'
import { useState } from 'react'
import { useEffect } from 'react'
import Link from 'next/link'

const Float = () => {
  const { user } = useTPU()
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    // Hide the banner after 10 seconds
    const timeoutId = setTimeout(() => {
      setShowBanner(false);
    }, 15000);

    return () => clearTimeout(timeoutId); // Cleanup the timeout if the component unmounts

  }, []);

  const hiddenFloat = () => {
    setShowBanner(false);
  }

  return (
    <>
      {showBanner && !user.value ? <div tabIndex="-1" className="md:mt-20 mt-[4rem] fixed z-50 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] p-3 -translate-x-1/2 rounded-lg lg:max-w-7xl left-1/2 top-6 bg-black">

        <div className="flex items-start mb-3 md:items-center flex-row md:mb-0 space-x-2 mr-4 md:space-x-8">

          <section className="h-screens md:mt-0 md:px-10 px-3 text-start bg-black text-white">
            <div className="gap-16 items-center py-4 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
              <div className="font-light text-gray-300 sm:text-lg ">
                <h2 className="mb-4 md:text-4xl text-3xl tracking-tight font-extrabold text-white"><span className="self-center text-4xl text-white font-extrabold"><span className='md:text-4xl text-3xl font-extrabold line-through decoration-white text-sky-400'>The</span> <span className='md:text-4xl text-3xl'>PairUp</span>
                  <span className='md:text-4xl text-3xl font-extrabold text-sky-400'>!</span>
                </span></h2>

                <div className="mb-4">"College students facing challenges in building meaningful connections or seeking companionship now have the opportunity to leverage The PairUp. a platform that offers anonymity while fostering friendships and relationships. Explore a world of possibilities while maintaining your privacy."</div>

                <div className="mb-4 md:block hidden">Pseudonymous social networks encourage open dialogue, creativity, and authenticity, fostering a sense of community where ideas, rather than personal details, take center stage. This paradigm offers users the freedom to explore diverse interests, connect with like-minded individuals, and embrace a more liberated and genuine online presence.</div>

                <div className="md:flex hidden text-sky-400 font-mono md:text-lg text-base md:pt-6 pt-12 justify-center items-center align-middle text-center">"Connecting Lives, Creating Bonds"</div>
              </div>

              <div className="grid-cols-2 gap-4 mt-8 grid">
                <img className="w-full rounded-lg" src="https://res.cloudinary.com/dwb211sw5/image/upload/v1722881369/linko/est8fk7m26uo4uywcls5.jpg" alt="office content 1" />
                <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://res.cloudinary.com/dwb211sw5/image/upload/v1722881383/linko/vdejh7cgata7cfiir144.jpg" alt="office content 2" />
              </div>
            </div>
          </section>

        </div>

        <div className="flex items-start  flex-shrink-0">
          <button onClick={hiddenFloat} type="button" className="absolute top-2.5 right-2.5 md:relative md:top-auto md:right-auto flex-shrink-0 inline-flex justify-center items-center text-gray-400 rounded-lg text-sm p-1.5 hover:bg-sky-400 hover:text-white">
            <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Close banner</span>
          </button>
        </div>

      </div> :
        <div className=""></div>
      }
    </>
  )
}

export default Float
