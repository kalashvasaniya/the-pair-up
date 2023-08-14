import User from '@/models/User';
import React from 'react'

const Details = () => {
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/details`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        const json = await res.json();
        console.log('Response status:', res.status);
        console.log('JSON message:', json);
        if (!res.ok) throw Error(json.message);
    };

    return (
        <>
            <div className="">

            </div>
        </>
    )
}

export default Details
