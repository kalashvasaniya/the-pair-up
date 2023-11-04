import React from 'react';

const Loading = () => {
    return (
        <div>
            <div className='flex justify-center items-center -mt-10 h-screen bg-black'>
                <video
                    autoPlay // This makes the video play automatically
                    muted   // This mutes the video (important for autoplay in some browsers)
                    width={640}
                    height={360}>
                    <source src="/THE.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    );
};

export default Loading;