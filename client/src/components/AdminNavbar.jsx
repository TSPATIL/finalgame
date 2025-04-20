import React, { useEffect, useState } from 'react'
import {
    Link,
    useLocation,
    useNavigate
} from 'react-router-dom'
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetailsAsync, logoutUserAsync, selectIsLogin, selectUser } from '../Redux/features/Authentication/AuthenticationSlice';
import { signOutUser } from '../firebase/firebase-auth';
import { showAlert } from '../Redux/features/Alerts/AlertSlice';

export default function AdminNavbar() {
    const [toggleNav, setToggleNav] = useState(false)
    const location = useLocation();

    const dispatch = useDispatch();
    const isLogin = useSelector(selectIsLogin);
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    console.log(user)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await dispatch(getUserDetailsAsync());
                const data = response.payload;
                if (data.error === "Unauthorized: No auth token found" || data.error === 'Session expired. Please log in again.') {
                    dispatch(logout());
                    const result = await signOutUser();
                    if (result.status) {
                        dispatch(showAlert({ message: "Session expired. Please log in again.", type: "info" }));
                        navigate('/admin/admin-login')
                    } else {
                        console.log(result.error)
                        dispatch(showAlert({ message: "User logged out failed", type: "error" }));
                    }
                }
                else if (data.status === false) {
                    dispatch(showAlert({ message: data.error, type: "error" }));
                }
                else {
                    console.log(user)
                    console.log(data);
                }
            } catch (error) {
                dispatch(showAlert({ message: error.message, type: "error" }));
            }
        }
        // if (isLogin && user.userType === 'student')
        //     navigate('/');
        if(isLogin)
            fetchUser();
    }, [isLogin])

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(logoutUserAsync());
            const data = response.payload;
            if (!data.status) {
                dispatch(showAlert({ message: "User logged out failed", type: "error" }));
            }
            else {
                const result = await signOutUser();
                if (result.status) {
                    dispatch(showAlert({ message: "User logged out successfully", type: "success" }));
                } else {
                    dispatch(showAlert({ message: "User logged out failed", type: "error" }));
                }
            }
        } catch (error) {
            dispatch(showAlert({ message: "User logged out failed", type: "error" }));
        }
    }
    return (
        <div className='AdminNavbar'>
            <div className="fixed top-0 z-20 block md:hidden text-3xl text-white bg-gray-900 w-full py-5 px-10">
                <AiOutlineMenu onClick={() => setToggleNav(!toggleNav)} className='cursor-pointer' />
            </div>
            <div className={`${toggleNav ? 'block' : 'hidden'} fixed md:block top-0 left-0 z-30 w-[90vw] sm:w-[300px] min-h-screen bg-gray-900 rounded p-3 shadow-xl`}>
                <div className="flex items-center justify-between p-2 mb-5">
                    <div className='flex items-center justify-center space-x-4'>
                        <img className="h-12 rounded-full" src="/user.png" alt="James Bhatta" />
                        <div>
                            <h4 className="font-semibold text-lg text-white capitalize font-poppins tracking-wide">{user ?  (user?.user?.profile?.firstName + " " + user?.user?.profile?.lastName) : 'Not Logged in'}</h4>
                            <p className='font-semibold text-base text-red-500 capitalize font-poppins tracking-wide'>{user?.user?.userType || 'User Type'}</p>
                        </div>
                    </div>
                    <IoMdClose className='text-4xl text-[gold] block md:hidden cursor-pointer' onClick={() => setToggleNav(!toggleNav)} />
                </div>
                <ul className="space-y-2 text-sm">
                    <li>
                        <Link to="/" className={`group flex items-center space-x-3 ${location.pathname === '/' ? 'text-gray-700' : 'text-white'} hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 ${location.pathname === '/' ? 'bg-gray-200' : ''} focus:bg-gray-200 focus:shadow-outline`}>
                            <span className={`${location.pathname === "/" ? "text-gray-600" : "text-[gold]"} group-hover:text-gray-600`}>
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/admin-dashboard" className={`group flex items-center space-x-3 ${location.pathname === '/admin/admin-dashboard' ? 'text-gray-700' : 'text-white'} hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 ${location.pathname === '/admin/admin-dashboard' ? 'bg-gray-200' : ''} focus:bg-gray-200 focus:shadow-outline`}>
                            <span className={`${location.pathname === "/admin/admin-dashboard" ? "text-gray-600" : "text-[gold]"} group-hover:text-gray-600`}>
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/view-users" className={`group flex items-center space-x-3 ${location.pathname === '/admin/view-users' ? 'text-gray-700' : 'text-white'} hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 ${location.pathname === '/admin/view-users' ? 'bg-gray-200' : ''} focus:bg-gray-200 focus:shadow-outline`}>
                            <span className={`${location.pathname === "/admin/view-users" ? "text-gray-600" : "text-[gold]"} group-hover:text-gray-600`}>
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <span>View Users</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/create-quiz" className={`group flex items-center space-x-3 ${location.pathname === '/admin/create-quiz' ? 'text-gray-700' : 'text-white'} hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 ${location.pathname === '/admin/create-quiz' ? 'bg-gray-200' : ''} focus:bg-gray-200 focus:shadow-outline`}>
                            <span className={`${location.pathname === "/admin/create-quiz" ? "text-gray-600" : "text-[gold]"} group-hover:text-gray-600`}>
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <span>Create Quiz</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/view-quiz" className={`group flex items-center space-x-3 ${location.pathname === '/admin/view-quiz' ? 'text-gray-700' : 'text-white'} hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 ${location.pathname === '/admin/view-quiz' ? 'bg-gray-200' : ''} focus:bg-gray-200 focus:shadow-outline`}>
                            <span className={`${location.pathname === "/admin/view-quiz" ? "text-gray-600" : "text-[gold]"} group-hover:text-gray-600`}>
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <span>View Quiz</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/view-feedbacks" className={`group flex items-center space-x-3 ${location.pathname === '/admin/view-feedbacks' ? 'text-gray-700' : 'text-white'} hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 ${location.pathname === '/admin/view-feedbacks' ? 'bg-gray-200' : ''} focus:bg-gray-200 focus:shadow-outline`}>
                            <span className={`${location.pathname === "/admin/view-feedbacks" ? "text-gray-600" : "text-[gold]"} group-hover:text-gray-600`}>
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <span>User Feedbacks</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/view-contacts" className={`group flex items-center space-x-3 ${location.pathname === '/admin/view-contacts' ? 'text-gray-700' : 'text-white'} hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 ${location.pathname === '/admin/view-contacts' ? 'bg-gray-200' : ''} focus:bg-gray-200 focus:shadow-outline`}>
                            <span className={`${location.pathname === "/admin/view-contacts" ? "text-gray-600" : "text-[gold]"} group-hover:text-gray-600`}>
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                                </svg>
                            </span>
                            <span>Contact Messages</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/profile" className={`group flex items-center space-x-3 ${location.pathname === '/user/profile' ? 'text-gray-700' : 'text-white'} hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 ${location.pathname === '/user/profile' ? 'bg-gray-200' : ''} focus:bg-gray-200 focus:shadow-outline`}>
                            <span className={`${location.pathname === "/user/profile" ? "text-gray-600" : "text-[gold]"} group-hover:text-gray-600`}>
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <span>My profile</span>
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/admin/settings" className={`group flex items-center space-x-3 ${location.pathname === '/admin/settings' ? 'text-gray-700' : 'text-white'} hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 ${location.pathname === '/admin/settings' ? 'bg-gray-200' : ''} focus:bg-gray-200 focus:shadow-outline`}>
                            <span className={`${location.pathname === "/admin/settings" ? "text-gray-600" : "text-[gold]"} group-hover:text-gray-600`}>
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                                </svg>
                            </span>
                            <span>Settings</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/change-password" className={`group flex items-center space-x-3 ${location.pathname === '/admin/change-password' ? 'text-gray-700' : 'text-white'} hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 ${location.pathname === '/admin/change-password' ? 'bg-gray-200' : ''} focus:bg-gray-200 focus:shadow-outline`}>
                            <span className={`${location.pathname === "/admin/change-password" ? "text-gray-600" : "text-[gold]"} group-hover:text-gray-600`}>
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>
                            <span>Change password</span>
                        </Link>
                    </li> */}
                    <li>
                        {
                            !isLogin
                                ?
                                <div className='space-y-2 group'>
                                    <Link to="/admin/admin-login" className={`group/link flex items-center space-x-3 ${location.pathname === '/admin/admin-login' ? 'text-gray-700' : 'text-white'} hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 ${location.pathname === '/admin/admin-login' ? 'bg-gray-200' : ''} focus:bg-gray-200 focus:shadow-outline`}>
                                        <span className={`${location.pathname === "/admin/admin-login" ? "text-gray-600" : "text-[gold]"} group-hover/link:text-gray-600`}>
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                        </span>
                                        <span>Login</span>
                                    </Link>
                                    <Link to="/admin/admin-signup" className={`group/link hidden group-hover:flex items-center space-x-3 ${location.pathname === '/admin/admin-signup' ? 'text-gray-700' : 'text-white'} hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 ${location.pathname === '/admin/admin-signup' ? 'bg-gray-200' : ''} focus:bg-gray-200 focus:shadow-outline`}>
                                        <span className={`${location.pathname === "/admin/admin-signup" ? "text-gray-600" : "text-[gold]"} group-hover/link:text-gray-600`}>
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                        </span>
                                        <span>Signup</span>
                                    </Link>
                                </div>
                                :
                                <button type='button' onClick={handleLogOut} className={`group/link w-full flex items-center space-x-3 ${location.pathname === '/admin/admin-logout' ? 'text-gray-700' : 'text-white'} hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 ${location.pathname === '/admin/admin-logout' ? 'bg-gray-200' : ''} focus:bg-gray-200 focus:shadow-outline`}>
                                    <span className={`${location.pathname === "/admin/admin-logout" ? "text-gray-600" : "text-[gold]"} group-hover/link:text-gray-600`}>
                                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                    </span>
                                    <span>Logout</span>
                                </button>
                        }
                    </li>
                </ul>
            </div>
        </div>
    )
}
