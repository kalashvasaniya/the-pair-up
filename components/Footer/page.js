import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="bg-black text-white">
        <hr className="border-gray-200" />
        <div className="mx-auto max-w-screen-xl p-4 lg:py-8">



          <div className="sm:flex sm:items-center sm:justify-between ">
            <p className="text-sm text-white border-l-2">
              <span className="ml-4 font-semibold">
                <a href="https://github.com/kalashvasaniya/the-pair-up/blob/main/LICENSE"
                  target="_blank">
                  © 2023 ThePairUp — All Rights Reserved
                </a>
              </span>
            </p>

            <div className="hidden md:block">
              <p className="text-base text-white">
                <button>
                  <span
                    className="font-semibold rounded-md p-2 md:p-3 transition ease-linear delay-150 duration-100 text-[#00B2FF] hover:underline">
                    <a href="https://6z236yooyhh.typeform.com/to/WP5J4BH1" target="_blank">
                      Feedback
                    </a>
                  </span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </footer>

    </>
  )
}

export default Footer
