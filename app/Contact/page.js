'use client'
import React from 'react';
import { useForm, ValidationError } from "@formspree/react";

function ContactForm() {
    const [state, handleSubmit] = useForm("xpzbyygz");

    if (state.succeeded) {
        return (
            <>
                <p className='mb-4 text-center font-mono font-bold text-white'>Thanks for your submission!</p>
                <div className="-mt-40">
                    <ContactForm />
                </div>
            </>
        );

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="font-mono text-3xl underline-offset-4 underline">
                Join Waitlist
            </div>
            <div className="relative mt-12">
                <div className="relative z-0 w-full mb-6 group">
                    <input type="email" name="email" id="email"
                        className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400 peer"
                        placeholder=" "
                        required />
                    <label
                        htmlFor="email"
                        className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <ValidationError prefix="email" field="email" errors={state.errors} />
            </div>

            <button type="submit" disabled={state.submitting}
                className="text-white rounded-lg bg-blue-700 border-0 py-2 px-6 focus:outline-none text-sm transition ease-linear delay-150 duration-300 hover:bg-blue-600">Submit</button>
            <ValidationError errors={state.errors} />
        </form>
    );
}

function Contact() {
    return (
        <ContactForm />
    );
}
export default Contact;
