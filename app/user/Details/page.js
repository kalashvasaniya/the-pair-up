"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar/page'
import Footer from '@/components/Footer/page'

const Details = () => {
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/';
        } else {

        }
    }, [])

    const [bio, setBio] = useState('')
    const [relation, setRelation] = useState('');
    const [year, setYear] = useState('');
    const [LoveTo, setLoveTo] = useState('');
    const [gender, setGender] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/details`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ bio, relation, year, LoveTo, gender }),
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
            window.location.href = "/user/profile"
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
        }
    };



    return (
        <>
            <Navbar />
            <section className="bg-black pt-24 h-screen">
                <div className="flex flex-col items-center justify-center px-6 mx-auto mt-20">
                    <Link href={''} className="flex items-center pb-5">
                        <span className="self-center text-4xl font-bold text-sky-400">Details</span>
                    </Link>
                    <form onSubmit={handleSubmit} className="w-full sm:max-w-md p-8">

                        <div className="relative z-0 w-full mb-6 group">
                            <input value={bio} onChange={handleChange} type='text' name="bio" id="bio" placeholder='.'
                                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400  peer"
                                required maxLength={12}>
                            </input>
                            <label
                                htmlFor="bio"
                                className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Bio
                            </label>
                        </div>

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

                        <div className="relative z-0 w-full mb-6 group">
                            <select value={year} onChange={handleChange} name="year" id="year"
                                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400  peer"
                                required>
                                <option className="text-xs" value="" disabled>Select an option</option>
                                <option className="text-xs" value="Fresher">Fresher</option>
                                <option className="text-xs" value="Sophomore">Sophomore</option>
                                <option className="text-xs" value="Junior">Junior</option>
                                <option className="text-xs" value="Senior">Senior</option>
                            </select>
                            <label
                                htmlFor="year"
                                className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                College year
                            </label>
                        </div>

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

                        <button style={{ backgroundColor: '#00B2FF' }}
                            type="submit"
                            className="text-white bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-sky-400  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-sky-400 dark:hover:bg-sky-400 dark:focus:ring-sky-400 hover:scale-105 transition ease-in-out delay-150 duration-300">
                            Submit Details
                        </button>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Details