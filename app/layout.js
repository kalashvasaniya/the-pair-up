"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { useState } from 'react'
import Example from './UI/Loader/page'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export function useTPU() {
  const [user, setUser] = useState({ value: null });

  useEffect(() => {
    const token = localStorage.getItem('token');

    try {
      if (token) {
        setUser({ value: token });

        // Set a timeout to remove the token after 48 hour (172800000 milliseconds)
        setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('formattedDate');
          localStorage.removeItem('bannerCanceled');
          // Optionally, you can clear the user state as well
          setUser({ value: null });
        }, 172800000);
      }
    } catch (error) {
      localStorage.clear();
    }

    // document.addEventListener("contextmenu", function (e) {
    //   e.preventDefault();
    // });

    // document.onkeydown = function (e) {
    //   if (e.ctrlKey &&
    //     (e.keyCode === 67 ||
    //       e.keyCode === 86 ||
    //       e.keyCode === 85 ||
    //       e.keyCode === 117)) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // };

    // Cleanup the event listeners when the component unmounts
    return () => {
      document.removeEventListener("contextmenu", function (e) {
        e.preventDefault();
      });

      document.onkeydown = null;
    };

  }, []);


  const logout = () => {
    if (window.confirm("Are you sure you want to Logout?")) {
      <Example />
      localStorage.removeItem('token');
      localStorage.removeItem('formattedDate');
      localStorage.removeItem('bannerCanceled');
      setUser({ value: null })
      window.location.reload();
    }
  }

  const highlightHashTags = (content) => {
    const regex1 = /#(\w+)/g;
    const regex2 = /@(\w+)/g;
    const regex3 = /(\s|^)(https?:\/\/[^\s]+|www\.[^\s]+|[^\s]+\.[a-zA-Z]{2,})(?=\s|$)/g;
    const regex4 = /(\w{21,})/g; // New regex pattern for words with more than 20 letters

    const highlightedContent = content
      .replace(
        regex1,
        '<span class="hashtag text-sky-400 hover:underline lowercase">$&</span>'
      )
      .replace(
        regex2,
        (match, p1) =>
          p1 === 'Founder' || p1 === 'founder'
            ? `<a href="/user/profile/Founder" class="hashtag text-sky-400 hover:underline">${match}</a>`
            : `<a href="/user/profile/${p1.toLowerCase()}" class="hashtag text-sky-400 hover:underline lowercase">${match}</a>`
      )
      .replace(
        regex3,
        (p2) => {
          let truncatedURL = p2.length > 20 ? p2.slice(7, 30) + '...' : p2;
          return `<a href="${p2}" class="text-sky-400 hover:underline" title="${p2}">${truncatedURL}</a>`;
        }
      )
      .replace(
        regex4,
        (match) => {
          if (match.length > 22) {
            return match.slice(0, 22) + '...';
          }
          return match;
        }
      );

    return <div dangerouslySetInnerHTML={{ __html: highlightedContent }} />;
  };


  return { logout, user, highlightHashTags };
}

export default function RootLayout({ children }) {

  // const { logout } = useTPU();

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <div className="bg-black">
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html >
  )
}
