import React from 'react'

const About = () => {
    return (
        <>
            <section className="bg-transparent my-32 mx-8">
                <div className="gap-16 items-center py-4 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                    <div className="font-light text-gray-300 sm:text-lg ">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">Let's talk about <span className="self-center text-4xl text-white font-extrabold"><span className='text-4xl font-extrabold line-through decoration-white text-sky-400'>The</span> PairUp
                            <span className='text-4xl font-extrabold text-sky-400'>!</span>
                        </span></h2>
                        <p className="mb-4">The emergence of the pseudonymous era in social networking marks a transformative shift in online interactions. In this new era, individuals can engage and share without revealing their true identities, allowing for a level of privacy and personal expression previously unavailable in traditional platforms.</p>
                        <p>Pseudonymous social networks encourage open dialogue, creativity, and authenticity, fostering a sense of community where ideas, rather than personal details, take center stage. This paradigm offers users the freedom to explore diverse interests, connect with like-minded individuals, and embrace a more liberated and genuine online presence.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <img className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1" />
                        <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default About
