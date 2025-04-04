import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";
import { showAlert } from '../Redux/features/Alerts/AlertSlice';
import { useDispatch } from 'react-redux';

export default function FeedbackModal({setFeedbackModal, resultId}) {
    const [starArray, setStarArray] = useState(new Array(5).fill(''));
    const [ratings, setRatings] = useState(0);
    const [message, setMessage] = useState('');

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert(ratings)
        try {
            const response = await fetch('http://localhost:5000/api/feedback/add-feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({message, ratings, resultId}),
                credentials: 'include'
            });
            const result = await response.json();
            if (result.status) {
                dispatch(showAlert({ message: result.message, type: "success" }))
                setFeedbackModal(false);
            }
            else {
                dispatch(showAlert({ message: result.message, type: "error" }))
                setFeedbackModal(true)
            }
        } catch (error) {
            console.error(error);
            dispatch(showAlert({ message: "Error occured", type: "error" }))
            setFeedbackModal(true);
        }
    }

    return (
        <div className='FeedbackModal absolute top-0 left-0 z-10 flex justify-center w-full min-h-screen items-center'>
            <div className='bg-gray-500 relative opacity-70 w-screen h-screen'></div>
            <div className='bg-white absolute z-20 p-10 w-11/12 md:w-fit h-fit text-xl text-black shadow-lg rounded-md flex justify-center items-center'>
                <form onSubmit={handleSubmit} className='flex flex-col justify-start items-start gap-3 w-full h-full'>
                    <h1 className='text-3xl font-bold'>Feedback!</h1>
                    <div>
                        <label className='text-2xl' htmlFor='ratings'>Ratings:</label>
                        <div id='ratings' className='w-full h-full flex justify-start items-center gap-5 mt-2'>
                            {
                                starArray.map((star, index) => {
                                    return (
                                        <FaStar key={index + " " + index} onClick={() => setRatings(index + 1)} className={`text-3xl md:text-4xl ${index < ratings ? 'text-[gold]' : 'text-black'}`} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <label className='text-2xl' htmlFor='comment'>Comments:</label>
                        <textarea required={true} value={message} onChange={(e)=>setMessage(e.target.value)} className='w-full border-2 border-solid border-black rounded-md px-3 py-1 min-h-80 max-h-80' name="comment" id="comment" placeholder='Comment'></textarea>
                    </div>
                    <button type='submit' className='px-5 py-3 text-white text-center bg-black rounded-md w-full hover:bg-gray-700'>Submit Feedback</button>
                </form>
            </div>
        </div>
    )
}
