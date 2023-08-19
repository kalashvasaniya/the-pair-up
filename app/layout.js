"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export function useTPU() {
  const [user, setUser] = useState({ value: null });

  useEffect(() => {

    const token = localStorage.getItem('token')
    try {
      if (token) {
        setUser({ value: token });
      }
    }
    catch (error) {
      localStorage.clear();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser({ value: null })
    window.location.reload();
  }

  return { logout, user };
}

export default function RootLayout({ children }) {

  // const { logout } = useTPU();
  return (
    <html lang="en">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css" rel="stylesheet" />
      </head>
      <body className={`${inter.className} bg-black`}>
        {children}
        <div className="bg-black ">
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
      </body>
    </html>
  )
}
