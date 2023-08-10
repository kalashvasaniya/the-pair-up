import React from 'react'

const Home = () => {
  return (
    <>
      <div className="bg-black text-white mt-16">
        <div className="">
          <div className="md:grid md:grid-cols-12 flex flex-col">

            <div className="md:block hidden bg-black h-[90vh] col-start-1 col-end-3 border-r border-gray-500 rounded-r-[5rem] ">
              <div className="mt-16 px-4">
                dsfdsfsd
              </div>
            </div>

            <div className="col-start-3 col-end-11 bg-black h-screen">
              <div className="mt-20">
                dsgsdfgsdf
              </div>
            </div>

            <div className="md:block hidden col-start-11 col-end-13 bg-black h-screen">
              <div className="mt-20">
                dsfgsdfgd
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Home
