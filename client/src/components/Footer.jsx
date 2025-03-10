import React from 'react'
import { Link } from 'react-router-dom'
import { CiLinkedin } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";

export default function Footer() {
    return (
        <div className='Footer'>
            <div className="w-full bg-gray-200">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center flex-col py-7">
                        <div className="mb-7 flex justify-center items-center">
                            <div className="w-fit h-fit">
                                <div className="w-fit -mb-5 [-webkit-text-stroke:2px_#000000] font-medium text-black text-[80px] tracking-[0] leading-[normal] whitespace-nowrap shadow-drop-shadow-100">
                                    Qᵘᵉʳʸ ᶜʳᵃᶠᵗ
                                </div>
                                <div className="w-fit ml-20 text-black text-[25px] font-bold tracking-[0] leading-[normal]">
                                    The Hogwarts Enigma
                                </div>
                            </div>
                        </div>
                        {/* <div className="text-left w-full">
                            <h4 className="text-lg text-gray-900 font-medium mb-7 lg:mb-0">Pagedone</h4>
                            <ul className="text-md  transition-all duration-500 w-full">
                                <li className=""><a href="#" className="text-gray-600 hover:text-gray-900">Home</a></li>
                                <li className=""><a href="#" className=" text-gray-600 hover:text-gray-900">About</a></li>
                                <li className=""><a href="#" className=" text-gray-600 hover:text-gray-900">Pricing</a></li>
                                <li><a href="#" className=" text-gray-600 hover:text-gray-900">Features</a></li>
                            </ul>
                        </div> */}
                        <ul className="text-xl w-full flex items-center justify-center flex-col md:flex-row py-5 gap-3 md:gap-5 lg:gap-20">
                            <li><Link to="/" className="text-gray-800 hover:text-gray-900 hover:underline">Home</Link></li>
                            <li><Link to="/login" className="text-gray-800 hover:text-gray-900 hover:underline">Login</Link></li>
                            <li><Link to="/contact" className="text-gray-800 hover:text-gray-900 hover:underline">Contact us</Link></li>
                            <li><Link to="/about" className="text-gray-800 hover:text-gray-900 hover:underline">About us</Link></li>
                            <li><Link to="/services" className="text-gray-800 hover:text-gray-900 hover:underline">Services</Link></li>
                        </ul>
                    </div>

                    <div className="py-7 border-t border-gray-500">
                        <div className="flex items-center justify-center">
                            {/* <span className="text-sm text-gray-500 ">©<a href="https://pagedone.io/">pagedone</a> 2024, All rights reserved.</span> */}
                            <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0 ">
                                <a href="https://in.linkedin.com/" target='_blank' className="w-9 h-9 rounded-lg bg-gray-800 flex justify-center items-center hover:bg-blue-700">
                                    <CiLinkedin className='text-3xl text-white font-bold'/>
                                </a>
                                <a href="https://www.instagram.com/" target='_blank' className="w-9 h-9 rounded-lg bg-gray-800 flex justify-center items-center hover:bg-blue-700">
                                    <CiInstagram className='text-3xl text-white font-bold'/>
                                </a>
                                <a href="https://www.facebook.com/" target='_blank' className="w-9 h-9 rounded-lg bg-gray-800 flex justify-center items-center hover:bg-blue-700">
                                    <CiFacebook className='text-3xl text-white font-bold'/>
                                </a>
                                <a href="https://www.youtube.com/" target='_blank' className="w-9 h-9 rounded-lg bg-gray-800 flex justify-center items-center hover:bg-blue-700">
                                    <CiYoutube className='text-3xl text-white font-bold'/>
                                </a>
                                <a href="https://github.com/" target='_blank' className="w-9 h-9 rounded-lg bg-gray-800 flex justify-center items-center hover:bg-blue-700">
                                    <FiGithub className='text-2xl text-white font-bold'/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
