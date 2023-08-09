import React from "react"
import Login from "./user/login/page"

export default function Main() {
  return (
    <>
      <div className="bg-black text-white pt-12">
        <div className="md:grid md:grid-cols-2 flex flex-col">
          <div className="bg-sky-400 h-screen rounded-r-full flex justify-center items-center">sfsdfsd</div>
          <Login />
        </div>
      </div>

      <div className="pt-12">
        hello
      </div>
    </>
  )
}