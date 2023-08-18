"use client"
import React from 'react'
import { useEffect } from 'react'

const Saved = () => {
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/'
        }
    }, [])
    return (
        <>

        </>
    )
}

export default Saved
