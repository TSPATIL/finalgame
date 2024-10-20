import React from "react";
import {
    Link
} from 'react-router-dom'

export default function AdminSignup() {
    return (
        <div className="AdminSignup">
            <div class="flex justify-center items-center bg-gray-800 w-full h-screen">
                <div class="absolute top-0 left-0 sm:relative z-20 w-[90vw] sm:w-[300px] h-full bg-gray-900 rounded p-3 shadow-xl">
                    <div class="flex items-center space-x-4 p-2 mb-5">
                        <img class="h-12 rounded-full" src="/user.png" alt="James Bhatta" />
                        <div>
                            <h4 class="font-semibold text-lg text-white capitalize font-poppins tracking-wide">Tanmay Patil</h4>
                            <p className='font-semibold text-base text-red-500 capitalize font-poppins tracking-wide'>admin</p>
                        </div>
                    </div>
                    <ul class="space-y-2 text-sm">
                        <li>
                            <Link to="/admin/admin-dashboard" class="group flex items-center space-x-3 text-white hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                                <span class="text-[gold] group-hover:text-gray-600">
                                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/create-quiz" class="group flex items-center space-x-3 text-white hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                                <span class="text-[gold] group-hover:text-gray-600">
                                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <span>Create Quiz</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/notifications" class="group flex items-center space-x-3 text-white hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                                <span class="text-[gold] group-hover:text-gray-600">
                                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                    </svg>
                                </span>
                                <span>Notifications</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/user-messages" class="group flex items-center space-x-3 text-white hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                                <span class="text-[gold] group-hover:text-gray-600">
                                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                                    </svg>
                                </span>
                                <span>User messages</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/profile" class="group flex items-center space-x-3 text-white hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                                <span class="text-[gold] group-hover:text-gray-600">
                                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <span>My profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/settings" class="group flex items-center space-x-3 text-white hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                                <span class="text-[gold] group-hover:text-gray-600">
                                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                                    </svg>
                                </span>
                                <span>Settings</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/change-password" class="group flex items-center space-x-3 text-white hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                                <span class="text-[gold] group-hover:text-gray-600">
                                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <span>Change password</span>
                            </Link>
                        </li>
                        <li className="space-y-2 group">
                            <Link to="/admin/admin-signup" class="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 bg-gray-200 focus:shadow-outline">
                                <span class="text-gray-600">
                                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </span>
                                <span>Signup</span>
                            </Link>
                            <Link to="/admin/admin-login" class="hidden group-hover:flex items-center space-x-3 text-white hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                                <span class="text-gray-600">
                                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </span>
                                <span>Login</span>
                            </Link>
                            <Link to="/admin/admin-logout" class="hidden group-hover:flex items-center space-x-3 text-white hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                                <span class="text-gray-600">
                                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </span>
                                <span>Logout</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div class="w-full z-10 h-screen">
                    <div class="p-4 text-white overflow-auto h-[90vh]">
                        {/* <div className="login-side w-[45%] h-screen flex justify-center items-center"> */}
                        <div className="flex justify-center items-center flex-col h-full">
                            <h1 className="text-3xl font-bold mb-7">Create your Account</h1>
                            <form className="w-fit space-y-3">
                                <div className="flex justify-center items-start flex-col">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-[370px] px-3 py-2 outline-none border-[gold] rounded-md bg-transparent border-2 border-solid focus:shadow-lg"
                                    />
                                </div>
                                <div className="flex justify-center items-start flex-col">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        required
                                        className="w-[370px] px-3 py-2 outline-none border-[gold] rounded-md bg-transparent border-2 border-solid focus:shadow-lg"
                                    />
                                </div>
                                <div className="flex justify-center items-start flex-col">
                                    <label htmlFor="password">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="cpassword"
                                        name="cpassword"
                                        required
                                        className="w-[370px] px-3 py-2 outline-none border-[gold] rounded-md bg-transparent border-2 border-solid focus:shadow-lg"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-[#b9207c] w-[370px] px-2 py-2 rounded-md font-bold text-white"
                                >
                                    Signup
                                </button>
                            </form>
                            <div className="mt-5">
                                <p>
                                    Already have account?{" "}
                                    <Link to="/login" className="text-[#f134a6]">
                                        Login here
                                    </Link>
                                </p>
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
