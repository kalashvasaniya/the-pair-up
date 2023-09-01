"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { useState } from 'react'
import Example from './UI/Loader/page'

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
    if (window.confirm("Are you sure you want to Logout?")) {
      <Example />
      localStorage.removeItem('token');
      localStorage.removeItem('formattedDate');
      setUser({ value: null })
      window.location.reload();
    }
  }

  const highlightHashTags = (content) => {
    const regex1 = /#(\w+)/g;
    const regex2 = /@(\w+)/g;
    const regex3 = /(\s|^)([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(?=[\s$.,])/g;

    const highlightedContent = content
      .replace(
        regex1,
        '<span class="hashtag text-sky-400 hover:underline lowercase">$&</span>'
      )
      .replace(
        regex2,
        (match, p1) =>
          p1 === 'Founder'
            ? `<a href="/user/profile/${p1}" class="hashtag text-sky-400 hover:underline">${match}</a>`
            : `<a href="/user/profile/${p1.toLowerCase()}" class="hashtag text-sky-400 hover:underline lowercase">${match}</a>`
      )
      .replace(
        regex3,
        '<a href="http://$2" class="text-sky-400 hover:underline"> $2</a>'
      );

    return <div dangerouslySetInnerHTML={{ __html: highlightedContent }} />;
  }

  return { logout, user, highlightHashTags };
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
