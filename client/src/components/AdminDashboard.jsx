import React, { lazy, Suspense, useEffect, useState } from 'react'
import {
    Link
} from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Clock from './Clock';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../Redux/features/Alerts/AlertSlice';
import { selectIsLogin } from '../Redux/features/Authentication/AuthenticationSlice';
import LoginModal from './LoginModal';
const Footer = lazy(() => import('./Footer'))

export default function AdminDashboard() {
    const [value, onChange] = useState(new Date());
    const [userInfo, setUserInfo] = useState(0);
    const [feedbackInfo, setFeedbackInfo] = useState([]);
    const [resultInfo, setResultInfo] = useState(0);
    const [testInfo, setTestInfo] = useState(0);
    const [contactInfo, setContactInfo] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchDetails() {
            try {
                const response = await fetch("http://localhost:5000/api/sitedetails/getDetails", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                });
                const result = await response.json();
                console.log(result)
                if (result.status) {
                    console.log(result)
                    setUserInfo(result.userInfo);
                    setFeedbackInfo(result.feedbackInfo);
                    setResultInfo(result.resultInfo);
                    setTestInfo(result.testInfo);
                    setContactInfo(result.contactInfo);
                    dispatch(showAlert({ message: result.message, type: "success" }));
                }
                else {
                    dispatch(showAlert({ message: result.message, type: "error" }));
                }
            } catch (error) {
                console.log(error)
                dispatch(showAlert({ message: "Error Occurred", type: "error" }));
            }
        }
        if(isLogin)
            fetchDetails();
    }, []);

    const isLogin = useSelector(selectIsLogin);

    if(!isLogin){
        return <LoginModal/>
    }

    return (
        <div className='AdminDashboard'>
            <AdminNavbar />
            <div className="bg-gray-800 w-full min-h-screen flex items-center justify-center pt-28 pb-5 md:pt-16">
                <div className="w-full min-h-full z-10 md:ml-[300px] flex justify-center items-center flex-col px-10">
                    <div className='w-full'>
                        <h1 className='text-5xl font-bold text-white text-left'>Dashboard</h1>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-7 mt-5'>
                        <Link className='p-5 bg-white flex justify-center items-start flex-col text-xl w-full rounded-md'>
                            <div className='text-4xl font-bold'>{userInfo}</div>
                            <div>Total Users</div>
                        </Link>
                        <Link to="/admin/view-quiz" className='p-5 bg-white flex justify-center items-start flex-col text-xl w-full rounded-md'>
                            <div className='text-4xl font-bold'>{testInfo}</div>
                            <div>Total Tests</div>
                        </Link>
                        <Link to="/admin/view-feedbacks" className='p-5 bg-white flex justify-center items-start flex-col text-xl w-full rounded-md'>
                            <div className='text-4xl font-bold'>{feedbackInfo.length}</div>
                            <div>Total Feedbacks</div>
                        </Link>
                        <Link to="/admin/view-contacts" className='p-5 bg-white flex justify-center items-start flex-col text-xl w-full rounded-md'>
                            <div className='text-4xl font-bold'>{resultInfo}</div>
                            <div>Total Test Given</div>
                        </Link>
                    </div>
                    <hr className='w-full mt-5' />
                    <div className='w-full flex justify-center items-center text-white text-lg mt-5 bg-gray-600'>
                        <marquee behavior="scroll" direction="left" scrollamount={10}><span className='text-[gold] font-bold'>Notice:</span> All users are welcomed on our platform. Enjoy our different conditional tests.</marquee>
                    </div>
                    <hr className='w-full mt-5' />
                    <div className='w-full grid grid-cols-1 lg:grid-cols-3 justify-items-stretch mt-5'>
                        <div className='p-5 lg:border-x-2 lg:border-x-gray-30 flex justify-start items-start flex-col gap-3'>
                            <Link to="/admin/view-feedback" className="text-2xl text-white font-bold hover:text-[gold]">Feedbacks</Link>
                            <div className='flex justify-start items-center flex-col gap-3 w-full'>
                            {
                                feedbackInfo.length
                                    ?
                                    feedbackInfo.map((feedback, index) => {
                                        if(index < 4)
                                        return (
                                            <div key={feedback + " " + index} className='flex justify-center w-full items-start flex-col text-black p-2 bg-white rounded-md'>
                                                <p><span className='text-xl font-bold'>ID:</span> {feedback._id}</p>
                                                <p><span className='text-xl font-bold'>Rating:</span> {feedback.rating}</p>
                                                <p><span className='text-xl font-bold'>Created At:</span> {new Date(feedback.createdAt).toLocaleString()}</p>
                                            </div>
                                        )
                                    })
                                    :
                                    <div className="text-white">No feedbacks from users yet.</div>
                            }
                            </div>
                        </div>
                        <div className='p-5 flex justify-start items-start flex-col gap-3 border-t-2 border-t-gray-30 lg:border-t-0'>
                            <Link to="/admin/view-contacts" className="text-2xl text-white font-bold hover:text-[gold]">User Messages</Link>
                            <div className='flex justify-start items-start flex-col gap-3 w-full'>
                            {
                                contactInfo.length
                                    ?
                                    contactInfo.map((contact, index) => {
                                        if(index < 4)
                                        return (
                                            <div key={contact + " " + index} className='flex justify-center w-full items-start flex-col text-black p-2 bg-white rounded-md'>
                                                <p><span className='text-xl font-bold'>Name:</span> {contact.name}</p>
                                                <p><span className='text-xl font-bold'>Email:</span> {contact.email}</p>
                                                <p><span className='text-xl font-bold'>Subject:</span> {contact.subject}</p>
                                                <p><span className='text-xl font-bold'>Created At:</span> {new Date(contact.createdAt).toLocaleString()}</p>
                                            </div>
                                        )
                                    })
                                    :
                                    <div className="text-white">No user messages from users yet.</div>
                            }
                            </div>
                        </div>
                        <div className='p-5 flex justify-start items-start flex-col gap-7 lg:border-x-2 lg:border-x-gray-300 border-t-2 border-t-gray-30 lg:border-t-0'>
                            <div className="text-2xl text-white font-bold">Date and Time</div>
                            <div className='flex justify-center items-center gap-3 flex-col w-full'>
                                <Clock />
                                <Calendar className="bg-white" onChange={onChange} value={value} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='md:ml-[300px]'>
                <Suspense fallback={<div>Component is loading please wait...</div>}><Footer /></Suspense>
            </div>
        </div>
    )
}
