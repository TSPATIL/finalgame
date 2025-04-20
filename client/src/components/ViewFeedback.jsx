import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../Redux/features/Alerts/AlertSlice';
import AdminNavbar from './AdminNavbar';
import { FaEye, FaStar } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { selectIsLogin } from '../Redux/features/Authentication/AuthenticationSlice';
import LoginModal from './LoginModal';

export default function ViewFeedback() {
    const dispatch = useDispatch();
    const [feedbacks, setFeedbacks] = useState([]);
    const [searchQuery, setSearchQuery] = useState([]);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

    useEffect(() => {
        async function fetchFeedbacks() {
            try {
                const response = await fetch(`${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/api/feedback//get-all-feedback`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                });
                const result = await response.json();
                if (result.status) {
                    console.log(result)
                    setFeedbacks(result.feedbacks);
                    setFilteredFeedbacks(result.feedbacks);
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
        if (isLogin)
            fetchFeedbacks();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setFilteredFeedbacks(feedbacks.filter(feedback =>
            feedback.createdAt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            feedback.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            feedback._id.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    }

    const deleteFeedback = async (id, feedbackNo) => {
        const c = confirm("Are you sure to delete this record?");
        if (c) {
            try {
                const response = await fetch(`${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/api/feedback/delete-feedback/${id}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                });
                const result = await response.json();
                console.log(result);
                if (result.status) {
                    const newFeedbacks = feedbacks.filter((feedback, index) => {
                        return index !== feedbackNo;
                    })
                    setFeedbacks(newFeedbacks);
                    setFilteredFeedbacks(newFeedbacks);
                    dispatch(showAlert({ message: "Feedback Deleted Successfully", type: "success" }))
                }
                else {
                    dispatch(showAlert({ message: result.message, type: "error" }))
                }
            } catch (error) {
                console.log(error)
                dispatch(showAlert({ message: "Error Occured", type: "error" }))
            }
        }
    }

    const [feedbackModal, setFeedbackModal] = useState(false)
    let [feedbackViewNo, setFeedbackViewNo] = useState(-1);

    const FeedbackModal = () => {
        return (
            <div className='w-full h-full flex justify-center items-center p-10 bg-gray-900'>
                <div className='bg-white p-7 md:p-10 w-11/12 md:w-fit h-full text-xl text-black shadow-lg rounded-md flex justify-center items-center'>
                    <div className='relative z-50 top-0 left-0 flex flex-col justify-start items-start gap-3 w-full h-full'>
                        <h1 className='text-3xl font-bold mb-5'>Feedback Details</h1>
                        {
                            feedbacks[feedbackViewNo].feedback.map((section, sIndex) => {
                                return (
                                    <div key={section + " " + sIndex} className='w-full'>
                                        <p className='mb-5 font-semibold text-2xl'>{(sIndex + 1) + ". " + section.section}</p>
                                        <div className='space-y-5 w-full'>
                                            {
                                                section.type === 'array' &&
                                                section.Questions.map((question, qIndex) => {
                                                    return (
                                                        <div key={question + " " + qIndex} className='flex justify-between items-center gap-5 text-justify'>
                                                            <p title={`Rating\n1. Strongly Disagree\n2. Disagree\n3. Neutral\n4. Agree\n5. Strongly Agree`}>{(qIndex + 1) + ". " + question.question}</p>
                                                            <p className='px-3 py-1 bg-gray-300'>{question.ratings}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                            {
                                                section.type === 'bool' &&
                                                <div className='flex justify-start items-center gap-5'>
                                                    <p className='px-10 py-2 bg-gray-300'>{section.answer}</p>
                                                </div>
                                            }
                                            {
                                                section.type === 'text' &&
                                                <div className='w-full'>
                                                    <textarea required={true} value={section.answer} onChange={(e) => handleAnswerChange(e, sIndex)} className='w-full border-2 border-solid border-black rounded-md px-3 py-1 min-h-40 max-h-80' name="text" id="text" placeholder='Enter your suggestions here...'></textarea>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <button onClick={() => setFeedbackModal(false)} className='px-5 py-3 text-white text-center bg-black rounded-md w-full hover:bg-gray-700'>Close Feedback</button>
                    </div>
                </div>
            </div >
        )
    }

    const isLogin = useSelector(selectIsLogin);
    if (!isLogin) {
        return <LoginModal />
    }

    return (
        <div className='ViewFeedback'>
            {(!feedbackModal) ?
                <div>
                    <AdminNavbar />
                    <div className="bg-gray-800 z-20 w-full min-h-screen flex items-center justify-center pt-28 pb-10 md:pt-16 md:pb-16">
                        <div className="w-full min-h-full z-10 relative top-0 md:left-0 md:ml-[300px] flex justify-center items-center flex-col">
                            <div className='w-5/6 h-full flex justify-start items-start flex-col'>
                                <h1 className="text-3xl font-bold mb-5 text-white">View Feedbacks</h1>
                                <div className="w-full h-full">
                                    <form onSubmit={handleSearch} className='w-full h-full flex flex-col'>
                                        <label htmlFor="title" className='font-semibold leading-none text-gray-300'>Search</label>
                                        <div className='flex justify-center items-center flex-col sm:flex-row w-full gap-5 mt-3'>
                                            <input type="text" name="title" id="title" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} placeholder='Search' className='w-full h-full leading-none text-gray-50 p-3 outline-none border-[gold] border-2 border-solid bg-gray-800 rounded-md' />
                                            <button type='submit' className='w-full sm:w-fit h-full px-10 py-2 text-xl bg-white text-black hover:bg-gray-400 transition duration-500 rounded-md flex justify-center items-center outline-none font-bold border-solid border-2 border-[gold]'>Search</button>
                                        </div>
                                    </form>
                                    <div className='w-full h-full grid grid-cols-1 mt-5'>
                                        <p className='text-2xl text-white font-bold'>Results</p>
                                        <div className="w-full text-black mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                                            {
                                                filteredFeedbacks.length !== 0
                                                    ?
                                                    filteredFeedbacks.map((feedback, index) => {
                                                        return (
                                                            <div key={feedback + "" + index} className='w-full rounded-md group h-full bg-white text-black flex items-center justify-center flex-col border-2 border-solid border-[gold] p-3 gap-3 text-lg'>
                                                                <div className='grid gap-3 lg:gap-2 grid-cols-1 justify-items-start w-full h-full'>
                                                                    <div className=''>
                                                                        <div><span className='text-xl font-bold'>Sr. No.:</span> {index + 1}</div>
                                                                    </div>
                                                                    <div className=''>
                                                                        <div><span className='text-xl font-bold'>Feedback id:</span> {feedback._id}</div>
                                                                    </div>
                                                                    <div className=''>
                                                                        <div><span className='text-xl font-bold'>User id:</span> {feedback.userId}</div>
                                                                    </div>
                                                                    <div className=''>
                                                                        <div><span className='text-xl font-bold'>Created At:</span> {feedback.createdAt}</div>
                                                                    </div>
                                                                </div>
                                                                <hr className='w-full h-[2px] bg-black hidden group-hover:block' />
                                                                <div className='hidden group-hover:flex justify-center items-center gap-5'>
                                                                    <button onClick={() => { setFeedbackModal(true); setFeedbackViewNo(index) }} className='px-5 py-2 bg-gradient-to-b from-blue-700 to-blue-900 rounded-md hover:bg-gradient-to-t text-white font-bold flex justify-center items-center gap-2'><FaEye className='text-xl' /><p className='hidden sm:block'>View</p></button>
                                                                    <button onClick={() => deleteFeedback(feedback._id, index)} className='px-5 py-2 bg-gradient-to-b from-blue-700 to-blue-900 rounded-md hover:bg-gradient-to-t text-white font-bold flex justify-center items-center gap-2'><MdDelete className='text-xl' /><p className='hidden sm:block'>Delete</p></button>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                    :
                                                    <div className='text-xl text-white'>No Feedbacks created</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <FeedbackModal feedbacks={filteredFeedbacks} />}
        </div>
    )
}
