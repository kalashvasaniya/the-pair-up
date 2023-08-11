import React from 'react'
import { useTPU } from '@/app/layout'

const Float = () => {
  const { user } = useTPU()
  return (
    <>
      {!user.value ? <div id="marketing-banner" tabIndex="-1" className="md:mt-20 mt-[28rem] fixed z-50 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] p-3 -translate-x-1/2 rounded-lg border border-sky-400 lg:max-w-7xl left-1/2 top-6 bg-black">

        <div className="flex items-start mb-3 md:items-center flex-row md:mb-0 space-x-2 mr-4 md:space-x-8">

          <div>
            <div className="flex justify-center">
              <span className="self-center md:text-lg text-sm text-white font-extrabold px-2 font-mono">
                <span className='underline text-sky-400'>Introverts</span> who struggle to <span className='underline text-sky-400'>make college friends</span> can utilise <span className='line-through decoration-white text-[#00B2FF]'>The</span>PairUp without <span className='underline text-sky-400'>revealing</span> their <span className='underline text-sky-400'>real names</span>.
              </span>
            </div>
          </div>

        </div>

        <div className="flex items-center flex-shrink-0">
          <button data-dismiss-target="#marketing-banner" type="button" className="absolute top-2.5 right-2.5 md:relative md:top-auto md:right-auto flex-shrink-0 inline-flex justify-center items-center text-gray-400 rounded-lg text-sm p-1.5 hover:bg-sky-400 hover:text-white">
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