"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar/page'
import Float from '@/components/Float/page'
import Footer from '@/components/Footer/page'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export function useTPU() {
  useEffect(() => {

  }, [])

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return { logout };
}

export default function RootLayout({ children }) {

  const { logout } = useTPU();
  return (
    <html lang="en">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        {children}
        <div className="bg-black ">
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
      </body>
    </html>
  )
}
