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
            },
            body: JSON.stringify({ relation, year, LoveTo, gender }),
        });
        const json = await res.json();
        console.log(res);
        console.log("hello")

        if (json.success) {
            setRelation('');
            setYear('');
            setLoveTo('');
            setGender('');
            window.location.href = "/Home"
        } else {
            alert(json.error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'relation') {
            setRelation(value)
        } else if (name === 'year') {
            setYear(value)
        } else if (name === 'LoveTo') {
            setLoveTo(value)
        } else if (name === 'gender') {
            setGender(value)
        }
    }

    return (
        <>
            <Navbar />
            <section className="bg-black pt-24 h-screen">
                <div className="flex flex-col items-center justify-center px-6 mx-auto mt-20">
                    <Link href={'/user/signup'} className="flex items-center pb-5">
                        <span className="self-center text-4xl font-bold text-sky-400">Details</span>
                    </Link>
                    <form onSubmit={handleSubmit} className="w-full sm:max-w-md p-8">

                        <div className="relative z-0 w-full mb-6 group">
                            <div className="relative z-0 w-full mb-6 group">
                                <input value={relation} onChange={handleChange} type="relation" name="relation" id="relation"
                                    className="lowercase block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400 peer"
                                    placeholder=" "
                                    required />
                                <label htmlFor="relation"
                                    className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Relation</label>
                            </div>
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                            <input value={year} onChange={handleChange} type="year" name="year" id="year"
                                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400  peer"
                                placeholder=" "
                                required />
                            <label
                                htmlFor="year"
                                className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">College year</label>
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                            <input value={LoveTo} onChange={handleChange} type="LoveTo" name="LoveTo" id="LoveTo"
                                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400  peer"
                                placeholder=" "
                                required />
                            <label
                                htmlFor="LoveTo"
                                className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">LoveTo</label>
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                            <input value={gender} onChange={handleChange} type="gender" name="gender" id="gender"
                                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400  peer"
                                placeholder=" "
                                required />
                            <label
                                htmlFor="gender"
                                className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Gender</label>
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
