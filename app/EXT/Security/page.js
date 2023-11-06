import React from 'react'
import Link from 'next/link'

const Security = () => {
    return (
        <>
        <div className='h-screen px-10 flex flex-col justify-center text-center space-y-4 items-center align-middle font-mono text-white bg-black'>

            <div className='font-bold text-sky-400 text-3xl'>Security Policy</div>

            <h2>Supported Versions</h2>

            <p>Use this section to tell people about which versions of your project are currently being supported with security updates.</p>


            <div class="relative shadow-md rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 rounded-lg border border-black">
                    <thead class="text-xs text-gray-300 uppercase bg-gray-800 rounded-lg border border-black">
                        <tr>
                            <th scope="col" class="px-6 py-3 border border-black rounded-tl-xl">
                                Version
                            </th>
                            <th scope="col" class="px-6 py-3 border border-black rounded-tr-xl">
                                Supported
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border border-black hover:bg-gray-50">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border border-black rounded-bl-xl">
                                1.0.0
                            </th>
                            <td class="px-6 py-4 border border-black rounded-br-xl text-center">
                                ✅
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>Reporting a Vulnerability</h2>

            <p>Use this section to tell people how to report a vulnerability.</p>

            <p>Tell them where to go, how often they can expect to get an update on a reported vulnerability, what to expect if the vulnerability is accepted or declined, etc.</p>

            <Link href={'/Home'} className='bg-sky-500 hover:scale-105 p-2 px-3 rounded-2xl'>Back</Link>

        </div>
        </>
    )
}

export default Security
