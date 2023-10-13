"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar/page'
import Footer from '@/components/Footer/page'
import Example from '@/app/UI/Loader/page'

const Details = () => {
    const [bio, setBio] = useState('')
    const [relation, setRelation] = useState('');
    const [year, setYear] = useState('');
    const [LoveTo, setLoveTo] = useState('');
    const [gender, setGender] = useState('');
    const [bath, setBath] = useState('');
    const [avatar, setAvatar] = useState('');
    const [college, setCollege] = useState('')

    const [userDetails1, setUserDetails1] = useState('');
    const [userDetails2, setUserDetails2] = useState('');

    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/';
        } else {

        }

        setTimeout(() => {
            // After 2 seconds, show the Story
            setShowLoader(true);
        }, 1000);

        fetchUserDetails1();
        fetchUserDetails2();
    }, [])

    const fetchUserDetails1 = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserDetails1(data.userDetails1);

                const userDetails1 = data.userDetails1;

                const emailDomain = userDetails1.email.split('@')[1].toLowerCase(); // Convert to lowercase for case-insensitivity
                if (emailDomain.endsWith('vitstudent.ac.in')) {
                    setCollege('VIT Vellore');
                } else if (emailDomain.endsWith('gmail.com')) {
                    setCollege('Dropout?');
                } else if (emailDomain.endsWith('iitgn.ac.in')) {
                    setCollege('IIT GN');
                } else {
                    setCollege('NA');
                }

            } else {
                // Handle error
            }
        } catch (error) {
            console.log(error)
        }
    };

    const fetchUserDetails2 = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/details`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserDetails2(data.userDetails2);
            } else {
                // Handle error
            }
        } catch (error) {
            console.log("hooo")
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/details`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ bio, relation, year, LoveTo, gender, bath, avatar, college }),
        });
        const json = await res.json();
        console.log(res);
        console.log("hello")

        if (json.success) {
            setBio('')
            setRelation('');
            setYear('');
            setLoveTo('');
            setGender('');
            setBath('');
            setAvatar('');
            window.location.href = `/user/profile/${userDetails1.name}`
        } else {
            alert(json.error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'bio') {
            setBio(value);
        } else if (name === 'relation') {
            setRelation(value);
        } else if (name === 'year') {
            setYear(value);
        } else if (name === 'LoveTo') {
            setLoveTo(value);
        } else if (name === 'gender') {
            setGender(value);
        } else if (name === 'bath') {
            setBath(value);
        } else if (name === 'avatar') {
            setAvatar(value);
        }
    };



    return (
        <>
            {!showLoader ? (
                // Render the Story component after 2 seconds
                <Example />
            ) : (
                <div className="">
                    {
                        userDetails1.tick === 'active' ? (
                            <div className="flex flex-col justify-center items-center text-3xl font-bold font-mono h-screen">
                                Clubs are not allowed to change Details.
                                <Link href={`/Home`} className='bg-sky-500 hover:scale-105 p-2 px-3 rounded-2xl text-xl mt-12'>Back</Link>
                            </div>
                        ) : (
                            <div className="">
                                <Navbar />
                                <section className="bg-black py-24">
                                    <div className="flex flex-col items-center justify-center px-6 mx-auto mt-20">
                                        <Link href={''} className="flex items-center pb-5">
                                            <span className="self-center text-4xl font-bold text-sky-400">Details</span>
                                        </Link>
                                        <form onSubmit={handleSubmit} className="w-full sm:max-w-md p-8">

                                            {/* BIO  */}
                                            <div className="relative z-0 w-full mb-6 group">
                                                <input value={bio} onChange={handleChange} type='text' name="bio" id="bio" placeholder='.'
                                                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400  peer"
                                                    required minLength={3} maxLength={12}>
                                                </input>
                                                <label
                                                    htmlFor="bio"
                                                    className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                    Bio
                                                </label>
                                            </div>

                                            {/* REALTION  */}
                                            <div className="relative z-0 w-full mb-6 group">
                                                <select value={relation} onChange={handleChange} name="relation" id="relation"
                                                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400  peer"
                                                    required>
                                                    <option className="text-xs" value="" disabled>Select an option</option>
                                                    <option className="text-xs" value="Single">Single</option>
                                                    <option className="text-xs" value="In relation">In Relation</option>
                                                    <option className="text-xs" value="Interested">Interested</option>
                                                </select>
                                                <label
                                                    htmlFor="relation"
                                                    className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                    Relation
                                                </label>
                                            </div>

                                            {/* YEAR  */}
                                            <div className="relative z-0 w-full mb-6 group">
                                                <select value={year} onChange={handleChange} name="year" id="year"
                                                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400  peer"
                                                    required>
                                                    <option className="text-xs" value="" disabled>Select an option</option>
                                                    <option className="text-xs" value="Fresher">Fresher</option>
                                                    <option className="text-xs" value="Sophomore">Sophomore</option>
                                                    <option className="text-xs" value="Junior">Junior</option>
                                                    <option className="text-xs" value="Senior">Senior</option>
                                                    <option className="text-xs" value="Super Senior">Super Senior</option>
                                                </select>
                                                <label
                                                    htmlFor="year"
                                                    className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                    College year
                                                </label>
                                            </div>

                                            {/* LOVE TO  */}
                                            <div className="relative z-0 w-full mb-6 group">
                                                <select value={LoveTo} onChange={handleChange} name="LoveTo" id="LoveTo"
                                                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400  peer"
                                                    required>
                                                    <option className="text-xs" value="" disabled>Select an option</option>
                                                    <option className="text-xs" value="Code">Code</option>
                                                    <option className="text-xs" value="Dance">Dance</option>
                                                    <option className="text-xs" value="Guitar">Guitar</option>
                                                    <option className="text-xs" value="Football">Football</option>
                                                    <option className="text-xs" value="Basketball">Basketball</option>
                                                    <option className="text-xs" value="Study">Study</option>
                                                    <option className="text-xs" value="Travel">Travel</option>
                                                    <option className="text-xs" value="Volunteering">Volunteering</option>
                                                    <option className="text-xs" value="Writing">Writing</option>
                                                    <option className="text-xs" value="Reading">Reading</option>
                                                    <option className="text-xs" value="Painting">Painting</option>
                                                    <option className="text-xs" value="Cooking">Cooking</option>
                                                    <option className="text-xs" value="Photography">Photography</option>
                                                    <option className="text-xs" value="Yoga">Yoga</option>
                                                    <option className="text-xs" value="Sports">Sports</option>
                                                    <option className="text-xs" value="Music">Music</option>
                                                    <option className="text-xs" value="Movies">Movies</option>
                                                    <option className="text-xs" value="Gardening">Gardening</option>
                                                    <option className="text-xs" value="Fitness">Fitness</option>
                                                    <option className="text-xs" value="Coding">Coding</option>
                                                    <option className="text-xs" value="Hiking">Hiking</option>
                                                    <option className="text-xs" value="Podcasting">Podcasting</option>
                                                    <option className="text-xs" value="Camping">Camping</option>
                                                    <option className="text-xs" value="Drawing">Drawing</option>
                                                    <option className="text-xs" value="Exploring">Exploring</option>
                                                    <option className="text-xs" value="Swimming">Swimming</option>
                                                    <option className="text-xs" value="Karaoke">Karaoke</option>
                                                    <option className="text-xs" value="Biking">Biking</option>
                                                    <option className="text-xs" value="Shopping">Shopping</option>
                                                    <option className="text-xs" value="Video games">Video Games</option>
                                                    <option className="text-xs" value="Partying">Partying</option>
                                                    <option className="text-xs" value="Cooking">Cooking</option>
                                                    <option className="text-xs" value="Meditation">Meditation</option>
                                                </select>
                                                <label
                                                    htmlFor="LoveTo"
                                                    className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                    Love To
                                                </label>
                                            </div>

                                            {/* GENDER  */}
                                            <div className="relative z-0 w-full mb-6 group">
                                                <select value={gender} onChange={handleChange} name="gender" id="gender"
                                                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400  peer"
                                                    required>
                                                    <option className="text-xs" value="" disabled>Select gender</option>
                                                    <option className="text-xs" value="Male">Male</option>
                                                    <option className="text-xs" value="Female">Female</option>
                                                    <option className="text-xs" value="Gay">Gay</option>
                                                    <option className="text-xs" value="Lesbian">Lesbian</option>
                                                    <option className="text-xs" value="Transgender">Transgender</option>
                                                </select>
                                                <label
                                                    htmlFor="gender"
                                                    className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                    Gender
                                                </label>
                                            </div>

                                            {/* BATH  */}
                                            <div className="relative z-0 w-full mb-6 group">
                                                <select value={bath} onChange={handleChange} name="bath" id="bath"
                                                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400  peer"
                                                    required>
                                                    <option className="text-xs" value="" disabled>Select an option</option>
                                                    <option className="text-xs" value="1/Week">1/Week</option>
                                                    <option className="text-xs" value="2/Week">2/Week</option>
                                                    <option className="text-xs" value="3/Week">3/Week</option>
                                                    <option className="text-xs" value="4/Week">4/Week</option>
                                                    <option className="text-xs" value="5/Week">5/Week</option>
                                                    <option className="text-xs" value="6/Week">6/Week</option>
                                                    <option className="text-xs" value="Daily">Daily</option>
                                                </select>
                                                <label
                                                    htmlFor="bath"
                                                    className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                    Bath
                                                </label>
                                            </div>

                                            {/* AVATAR  */}
                                            <div className="relative z-0 w-full mb-6 group">
                                                <select value={avatar} onChange={handleChange} name="avatar" id="avatar"
                                                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400  peer"
                                                    required>
                                                    <option className="text-xs" value="" disabled>Select an option</option>
                                                    <option className="text-xs" value={`acid-smile-face-psychedelic-symbol-of-rave-vector-44786796.webp`}>Acid Smile Face 1</option>
                                                    <option className="text-xs" value={`acid-smile-face-with-brain-melted-rave-vector-45926123.webp`}>Acid Smile Face 2</option>
                                                    <option className="text-xs" value={`awesome-funny-red-sun-with-a-charming-smiling-face-vector-47870982.webp`}>Funny Red Sun</option>
                                                    <option className="text-xs" value={`cute-beard-man-head-face-logo-symbol-vector-48141076.webp`}>Cute Beard Man</option>
                                                    <option className="text-xs" value={`awesome-funny-red-sun-with-a-charming-smiling-face-vector-47870982.webp`}>Funny Red Sun</option>
                                                    <option className="text-xs" value={`cute-funny-intestine-organ-character-hand-vector-38732208.webp`}>Cute Funny Intestine</option>
                                                    <option className="text-xs" value={`dog-face-hand-draw-vector-47389019.webp`}>Dog Face</option>
                                                    <option className="text-xs" value={`face-of-the-cool-chimp-with-sunglasses-chimpanzee-vector-47366747.webp`}>Cool Chimp</option>
                                                    <option className="text-xs" value={`funny-cartoon-monster-character-wearing-eyeglsses-vector-46869868.webp`}>Cartoon Monster</option>
                                                    <option className="text-xs" value={`funny-smiley-face-emoticon-smoking-cannabis-vector-44924547.webp`}>Smoking Cannabis</option>
                                                    <option className="text-xs" value={`gorilla-with-headphones-vector-26203300.webp`}>Gorilla With Headphones</option>
                                                    <option className="text-xs" value={`happy-face-icon-smile-element-yellow-color-vector-45813921.webp`}>Happy Face</option>
                                                    <option className="text-xs" value={`hedgehog-cute-cartoon-animal-funny-maths-shape-vector-47404491.webp`}>Hedgehog Cute Cartoon</option>
                                                    <option className="text-xs" value={`logo-smile-television-happy-face-abstract-vector-47076603.webp`}>TV Logo</option>
                                                    <option className="text-xs" value={`raccoon-logo-design-in-flat-color-design-template-vector-45713167.webp`}>Raccoon</option>
                                                    <option className="text-xs" value={`rooster-chicken-smile-funny-cute-face-artwork-vector-32104696.webp`}>Rooster Chicken</option>
                                                    <option className="text-xs" value={`scary-grunge-smile-face-halloween-sticker-vector-33974663.webp`}>Scary Grunge Smile</option>
                                                    <option className="text-xs" value={`smiling-face-with-sunglasses-stinky-poop-shit-vector-47901056.webp`}>Smiling Face</option>
                                                    <option className="text-xs" value={`wacky-weed-funny-bud-monster-vector-48056508.webp`}>Wacky Weed</option>
                                                    <option className="text-xs" value={`yum-cartoon-face-with-tongue-lick-mouth-yummy-vector-47019919.webp`}>Yum Cartoon</option>
                                                    <option className="text-xs" value={`pony-girl.jpeg`}>Pony Girl</option>
                                                    <option className="text-xs" value={`single-pony-girl.jpeg`}>Single Pony Girl</option>
                                                    <option className="text-xs" value={`laughing-girl.jpeg`}>Laughing Girl</option>
                                                    <option className="text-xs" value={`curly-girl.png`}>Curly Girl</option>
                                                    <option className="text-xs" value={`nice-girl.jpeg`}>Nice Girl</option>
                                                    <option className="text-xs" value={`cute-girl.jpeg`}>Cute Girl</option>
                                                    <option className="text-xs" value={`cool-avatar.jpeg`}>Cool Avatar</option>
                                                    <option className="text-xs" value={`cap-boy.png`}>Cap Boy</option>
                                                    <option className="text-xs" value={`helmet-boy.png`}>Helmet Boy</option>
                                                    <option className="text-xs" value={`tough-smile.jpeg`}>Tough Smile</option>
                                                    <option className="text-xs" value={`nightmare.png`}>The Nightmare</option>
                                                </select>
                                                <label
                                                    htmlFor="avatar"
                                                    className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                    Avatar
                                                </label>
                                            </div>

                                            <button style={{ backgroundColor: '#00B2FF' }}
                                                type="submit"
                                                className="text-white bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-sky-400  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-sky-400 dark:hover:bg-sky-400 dark:focus:ring-sky-400 hover:scale-105 transition ease-in-out delay-150 duration-300">
                                                Submit Details
                                            </button>
                                        </form>
                                    </div>
                                </section>
                                <Footer />
                            </div>
                        )
                    }
                </div>
            )}
        </>
    )
}

export default Details