import React, { useState } from 'react'
import { BsEnvelope } from "react-icons/bs";

export default function Contact() {
    const [contactDetails, setContactDetails] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const handleOnChange = (e) => {
        setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
    }
    return (
        <div className='Contact overflow-hidden'>
            <div className="absolute w-fit h-fit top-[40px] left-0 right-0 mx-auto">
                <div className="bg-gradient-to-b from-yellow-400 to-yellow-700 bg-clip-text text-transparent w-fit drop-shadow-2xl font-medium text-gray-300 text-[60px] sm:text-[80px] md:text-[120px] tracking-[0] leading-[normal] whitespace-nowrap shadow-drop-shadow-100">
                    Qᵘᵉʳʸ ᶜʳᵃᶠᵗ
                </div>
                <div className="w-fit relative -top-[24px] md:-top-[32px] left-[90px] sm:left-[140px] md:left-[250px] bg-gradient-to-b from-yellow-300 to-yellow-700 bg-clip-text text-transparent md:text-[30px] sm:text-[22px] text-[18px] font-bold tracking-[0] leading-[normal]">
                    The Hogwarts Enigma
                </div>
            </div>
            <div class="w-full bg-gray-800 h-full pb-20">
                <div class="h-96 bg-no-repeat bg-cover bg-[url('./contact-image.jpg')]"></div>
                <div class="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
                    <div class="bg-gray-900 w-full shadow rounded p-8 sm:p-12 -mt-60 sm:-mt-52 md:-mt-40">
                        <p class="text-3xl font-bold leading-7 text-center text-white">Contact us</p>
                        <form>
                            <div class="md:flex items-center mt-12">
                                <div class="w-full md:w-1/2 flex flex-col">
                                    <label class="font-semibold leading-none text-gray-300" htmlFor='email'>Name</label>
                                    <input type="text" id='name' name='name' value={contactDetails.name} onChange={handleOnChange} class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded" />
                                </div>
                                <div class="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                                    <label class="font-semibold leading-none text-gray-300" htmlFor='email'>Email</label>
                                    <input type="email" id='email' name='email' value={contactDetails.email} onChange={handleOnChange} class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded" />
                                </div>
                            </div>
                            <div class="md:flex items-center mt-4 md:mt-8">
                                <div class="w-full md:w-1/2 flex flex-col">
                                    <label class="font-semibold leading-none text-gray-300" htmlFor='phone'>Phone</label>
                                    <input type="text" id='phone' name='phone' value={contactDetails.phone} onChange={handleOnChange} class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded" />
                                </div>
                                <div class="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                                    <label class="font-semibold leading-none text-gray-300" htmlFor='subject'>Subject</label>
                                    <input type="text" id='subject' name='subject' value={contactDetails.subject} onChange={handleOnChange} class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded" />
                                </div>
                            </div>
                            {/*<div class="md:flex items-center mt-8">
                                <div class="w-full flex flex-col">
                                    <label class="font-semibold leading-none text-gray-300">Subject</label>
                                    <input type="text" class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded" />
                                </div>
                            </div> */}
                            <div>
                                <div class="w-full flex flex-col mt-4 md:mt-8">
                                    <label class="font-semibold leading-none text-gray-300" htmlFor='message'>Message</label>
                                    <textarea type="text" id='message' name='message' value={contactDetails.name} onChange={handleOnChange} class="h-40 text-base leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-800 border-0 rounded"></textarea>
                                </div>
                            </div>
                            <div class="flex items-center justify-center w-full">
                                <button class="mt-9 font-semibold leading-none flex justify-center items-center text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none">
                                    <BsEnvelope className='text-2xl text-white mr-2 font-bold' />
                                    <p>Send message</p>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
