import React, { useEffect, useState } from 'react';

const Search = () => {
    const [userDetails, setUserDetails] = useState([]);
    const [slugDetails, setSlugDetails] = useState(null);
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/';
        }
        searchUser()
    }, []);

    useEffect(() => {
        // Check if the formatted date is stored in localStorage
        const storedFormattedDate = localStorage.getItem('formattedDate');

        if (storedFormattedDate) {
            // If it exists in localStorage, use it
            setFormattedDate(storedFormattedDate);
        } else {
            // If it doesn't exist in localStorage, calculate and set it
            const currentDate = new Date();
            const dayOfWeekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            const dayOfWeekIndex = currentDate.getDay();
            const monthIndex = currentDate.getMonth();

            const hours = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedTime = `${hours % 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;

            const formattedDateText = `${dayOfWeekNames[dayOfWeekIndex]} ${currentDate.getDate()} ${monthNames[monthIndex]} ${formattedTime}`;

            setFormattedDate(formattedDateText);

            // Store the formatted date in localStorage
            localStorage.setItem('formattedDate', formattedDateText);
        }
    }, []);

    const searchUser = async (slug) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/searchUser?slug=${slug}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUserDetails(data.users);
                setSlugDetails(data.details);
            } else {
                throw new Error("Something went wrong!");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="p-4">

                {/* Login time  */}
                <div id="toast-simple" className="flex items-center w-full max-w-xs p-4 space-x-4 text-white bg-green-500 divide-x divide-gray-200 rounded-lg" role="alert">
                    <svg className="w-5 h-5 text-white rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9" />
                    </svg>
                    <div className="flex flex-col">
                        <div className="pl-4 text-sm font-normal">Last Login</div>
                        <div className="pl-4 text-xs font-mono text-gray-300">at {formattedDate}</div>
                    </div>
                </div>

                {/* other Notification  */}
                
            </div>
        </>
    );
}

export default Search;
