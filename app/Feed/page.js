import React from 'react'
import { useEffect } from 'react'

const Feed = () => {
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/'
        }
    }, [])
    return (
        <>
            <div className="p-3">
                <div className="pb-96 md:pb-[35rem]">

                </div>
                <div className=""></div>
            </div>
        </>
    )
}

export default Feed
