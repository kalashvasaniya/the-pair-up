import React from 'react'
import { useEffect } from 'react'

const Live = () => {
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

export default Live
