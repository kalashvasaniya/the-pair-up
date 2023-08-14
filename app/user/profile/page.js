import RightSideNavbar from '@/components/RightSideNavbar/page'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BottomNavbar from '@/components/BottomNavbar/page'

const Profile = () => {
  return (
    <>
      <div className="bg-black text-white">
        <div className="md:grid md:grid-cols-12 flex flex-col">
          <RightSideNavbar />
          {/* Desktop  */}
          <div className="md:block hidden px-20 py-16 col-start-4 col-end-13">
            <div className="md:grid md:grid-cols-12 flex flex-row mt-8 space-x-4">

              {/* image  */}
              <div className="col-start-1 col-end-4">
                <Link href={'/user/profile'} className="flex justify-end text-lg font-medium items-center">
                  <div className="border border-gray-500 p-2 rounded-full">
                    <Image src={'/logo.jpeg'} width={1000} height={1000} className="w-40 h-40 rounded-full cursor-pointer hover:scale-105" alt="Image" />
                    <span className="sr-only">Search</span>
                  </div>
                </Link>
              </div>

              {/* details  */}
              <div className="md:grid flex flex-col space-x-20">

                {/* first  */}
                <div className="col-start-4 col-end-5 ml-4">
                  <div className="flex flex-col mt-4 justify-start text-lg font-medium items-start">
                    <div className="text-base ">kalashvasaniya</div>
                    <div className="text-sm text-gray-500">Rockstar<span className='text-sky-400 text-xs'> - M</span></div>
                    <div className="text-sm mt-2">Status: <span className='text-sky-400 hover:underline'>Single</span></div>
                    <div className="text-sm mt-2">Year: <span className='text-sky-400 hover:underline'>Junior</span></div>
                    <div className="text-sm mt-2">Love to: <span className='text-sky-400 hover:underline'>Code</span></div>
                  </div>
                </div>

                {/* second  */}
                <div className="md:grid flex col-start-5 col-end-13">
                  <div className="mt-8 justify-start text-base font-medium items-start">
                    <div className="flex flex-row justify-center items-center pl-0">
                      <Link href={''} className='p-1 px-4 rounded-2xl hover:scale-105 bg-sky-500 mr-4'>Edit Profile</Link>
                      <Link href={''} className='p-1 px-4 rounded-2xl hover:scale-105 bg-sky-500'>Find one</Link>
                      <Link href={'/menu/Setting'} className='p-1 px-4 rounded-2xl hover:scale-105'>
                        <svg aria-label="Options" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                      </Link>
                    </div>
                    <div className="flex flex-row space-x-8 mt-8">
                      <div className="flex flex-row space-x-4"><span className='pr-2 text-sky-400'>8</span> post</div>
                      <div className="flex flex-row space-x-4"><span className='pr-2 text-sky-400'>243</span> followers</div>
                      <div className="flex flex-row space-x-4"><span className='pr-2 text-sky-400'>1846</span> following</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
            <hr className='mt-6 border-gray-500 border' />

            {/* Posts Media & Tagged */}
            <div className="">
              <div className="grid grid-cols-3 mt-3">
                <Link href={''} className="flex justify-center font-semibold hover:text-sky-400">Posts</Link>
                <Link href={''} className="flex justify-center font-semibold hover:text-sky-400">Media</Link>
                <Link href={''} className="flex justify-center font-semibold hover:text-sky-400">Tagged</Link>
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
                <Link href={'/user/profile'} className="flex justify-center text-lg font-medium items-center">
                  <div className="border border-gray-500 p-2 rounded-full">
                    <Image src={'/logo.jpeg'} width={1000} height={1000} className="w-28 h-28 rounded-full cursor-pointer hover:scale-105" alt="Image" />
                    <span className="sr-only">Search</span>
                  </div>
                </Link>
                <div className="flex flex-col">
                  <div className="flex flex-col mt-2 justify-start text-lg font-medium items-start">
                    <div className="text-sm ">kalashvasaniya</div>
                    <div className="text-xs text-gray-500">Rockstar <span className='text-sky-400 text-xs'> - M</span></div>
                    <div className="text-xs mt-2">Status: <span className='text-sky-400 hover:underline'>Single</span></div>
                    <div className="text-xs mt-2">Year: <span className='text-sky-400 hover:underline'>Sophomore</span></div>
                    <div className="text-xs mt-2">Love to: <span className='text-sky-400 hover:underline truncate'>Code</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="flex justify-center">
                <div className="mt-4 justify-start text-base font-medium items-start">

                  {/* button  */}
                  <div className="flex flex-row justify-center items-center">
                    <Link href={''} className='p-1 px-4 rounded-2xl hover:scale-105 bg-sky-500 mr-4 text-sm'>Edit Profile</Link>
                    <Link href={''} className='p-1 px-4 rounded-2xl hover:scale-105 bg-sky-500 text-sm'>Find one</Link>
                    <Link href={'/menu/Setting'} className='p-1 px-4 rounded-2xl hover:scale-105'>
                      <svg aria-label="Options" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                    </Link>
                  </div>

                  <hr className='w-screen mt-2 border-gray-600' />

                  {/* user details  */}
                  <div className="grid grid-cols-3 mt-1">
                    <div className="flex flex-col justify-center items-center space-x-4 text-sm text-gray-400"><span className='pr-2 text-sky-400'>8</span> post</div>
                    <div className="flex flex-col justify-center items-center space-x-4 text-sm text-gray-400"><span className='pr-2 text-sky-400'>243</span> followers</div>
                    <div className="flex flex-col justify-center items-center space-x-4 text-sm text-gray-400"><span className='pr-2 text-sky-400'>1846</span> following</div>
                  </div>

                  <hr className='w-screen mt-1 border-gray-600' />

                  <div className="grid grid-cols-3 mt-2">
                    <Link href={''} className="flex justify-center font-semibold hover:text-sky-400 text-sm">Posts</Link>
                    <Link href={''} className="flex justify-center font-semibold hover:text-sky-400 text-sm">Media</Link>
                    <Link href={''} className="flex justify-center font-semibold hover:text-sky-400 text-sm">Tagged</Link>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <BottomNavbar/>
    </>
  )
}

export default Profile