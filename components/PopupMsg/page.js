import React, { useState, useEffect } from 'react';
import { useTPU } from '@/app/layout';

const PopupMsg = () => {
    const { user } = useTPU();
    const [showBanner, setShowBanner] = useState(true);

    useEffect(() => {
        // Check if the user has canceled the banner previously
        const bannerCanceled = localStorage.getItem('bannerCanceled');

        if (bannerCanceled === 'true') {
            setShowBanner(false);
        } else {
            // Show the banner after 10 seconds
            const timeoutId = setTimeout(() => {
                setShowBanner(true);
            }, 10000);

            return () => clearTimeout(timeoutId); // Cleanup the timeout if the component unmounts
        }
    }, []);

    const cancel = () => {
        setShowBanner(false);
        // Store a flag in localStorage to indicate that the user has canceled the banner
        localStorage.setItem('bannerCanceled', 'true');
    }

    return (
        <>
            {showBanner && user.value ? (
                <div className="fixed top-0 z-50 left-0 w-full bg-sky-500 border-b border-white text-white text-center md:py-4 py-7">
                    <p className="text-sm font-mono font-semibold flex justify-center">2021 Batch FAT Results are out!
                        <button onClick={cancel}>
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5 flex justify-center ml-5 hover:bg-white hover:text-sky-500 rounded-lg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </p>
                </div>
            ) : (
                <div className=""></div>
            )}
        </>
    );
}

export default PopupMsg;
