import React, { useState } from 'react'
import {
    Link
} from 'react-router-dom'

export default function CreateQuiz() {
    const [challenges, setChallenge] = useState([{ ctitle: '', question: [''], correctAnswer: [''], points: 0, timeLimit: 0, storyPreviousImage: null, storyNextImage: null }]);
    const [test, setTest] = useState({ title: '', description: '', topic: '', challenge: [], visibility: [], dueDate: '' });

    const handleAddChallenge = () => {
        setChallenge([...challenges, { ctitle: '', question: [''], correctAnswer: [''], points: 0, timeLimit: 0, storyPreviousImage: null, storyNextImage: null }])
    }

    const handleRemoveChallenge = (index) => {
        const updatedChallenge = challenges.filter((_, i) => i !== index);
        setChallenge({ updatedChallenge })
    }

    const handleAddQuestion = () => {
        setChallenge({ ...details, links: [...details.links, { name: '', address: '' }] })
    }

    const handleRemoveQuestion = (index) => {
        const updatedChallenge = challenges.filter((_, i) => i !== index);
        setChallenge({ ...challenges, links: updatedChallenge })
    }

    const handleChallengeOnChange = (e, index) => {
        const updateLinks = [...details.links];
        updateLinks[index][e.target.name] = e.target.value;
        setDetails({ ...details, links: updateLinks });
    }

    return (
        <div>
            <div className='CreateQuiz'>
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
                                <Link to="/admin/create-quiz" class="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 bg-gray-200 focus:shadow-outline">
                                    <span class="text-gray-600">
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
                                <Link to="/user/profile" class="group flex items-center space-x-3 text-white hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
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
                                <Link to="/admin/admin-login" class="flex items-center space-x-3 text-white hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                                    <span class="text-[gold]">
                                        <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                    </span>
                                    <span>Login</span>
                                </Link>
                                <Link to="/admin/admin-signup" class="hidden group-hover:flex items-center space-x-3 text-white hover:text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                                    <span class="text-gray-600">
                                        <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                    </span>
                                    <span>Signup</span>
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

                    <div class="w-full h-full z-10">
                        <div class="overflow-auto w-full h-full flex justify-center items-center py-7">
                            <div className='w-5/6 h-full'>
                                <form className='w-full h-full flex justify-start items-start flex-col'>
                                    <p className='text-3xl font-bold text-white'>Create a Test</p>
                                    <div className="w-full text-black mt-5">
                                        <div className='w-full h-full flex flex-col'>
                                            <label htmlFor="title" className='font-semibold leading-none text-gray-300'>Title</label>
                                            <input type="text" name="title" id="title" placeholder='Title' className='leading-none text-gray-50 p-3 outline-none border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                        </div>
                                    </div>
                                    <div className="w-full text-black mt-5">
                                        <div className='w-full h-full flex flex-col'>
                                            <label htmlFor="description" className='font-semibold leading-none text-gray-300'>Description</label>
                                            <textarea type="text" name="description" id="description" placeholder='Description' className='leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                        </div>
                                    </div>
                                    <div className="w-full text-black mt-5 flex justify-between items-center gap-3">
                                        <div className='w-full h-full flex flex-col'>
                                            <label htmlFor="topic" className='font-semibold leading-none text-gray-300'>Topic</label>
                                            <input type="text" name="topic" id="topic" placeholder='Topic' className='leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                        </div>
                                        <div className='w-full h-full flex flex-col'>
                                            <label htmlFor="access" className='font-semibold leading-none text-gray-300'>Visibility Access</label>
                                            <select id='access' name='access' className='leading-none text-gray-50 p-3 mt-3 outline-none bg-gray-800 rounded border-[gold] border-2 border-solid'>
                                                <option value="private">Private</option>
                                                <option value="public">Public</option>
                                            </select>
                                        </div>
                                        <div className='w-full h-full flex flex-col'>
                                            <label htmlFor="date" className='font-semibold leading-none text-gray-300'>Due Date</label>
                                            <input type="date" name="date" id="date" placeholder='date' className='leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                        </div>
                                    </div>
                                    <p className="text-2xl mt-5 font-bold text-white">Challenges</p>
                                    {
                                        challenges.length === 0
                                            ?
                                            null
                                            :
                                            challenges.map((challenge, i) => {
                                                return (
                                                    <div key={challenge + " " + i} className="w-full">
                                                        <p className="text-xl mt-5 font-bold text-white">Challenge</p>
                                                        <div className="w-full text-black mt-5">
                                                            <div className='w-full h-full flex flex-col'>
                                                                <label htmlFor="ctitle" className='font-semibold leading-none text-gray-300'>Title</label>
                                                                <input type="text" name="ctitle" id="ctitle" placeholder='Title' className='leading-none text-gray-50 p-3 outline-none border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                                            </div>
                                                        </div>
                                                        {
                                                            challenge.question.length === 0
                                                                ?
                                                                null
                                                                :
                                                                challenge.question.map((question, j) => {
                                                                    return (
                                                                        <div key={question + " " + j} className="w-full">
                                                                            <div className="w-full text-black mt-5">
                                                                                <div className='w-full h-full flex flex-col'>
                                                                                    <label htmlFor="question" className='font-semibold leading-none text-gray-300'>Question</label>
                                                                                    <input type="text" name="question" id="question" placeholder='Question' className='leading-none text-gray-50 p-3 outline-none border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                                                                </div>
                                                                            </div>
                                                                            <div className="w-full text-black mt-5 flex justify-between gap-3 items center">
                                                                                <div className='w-full h-full flex flex-col'>
                                                                                    <label htmlFor="question" className='font-semibold leading-none text-gray-300'>Difficulty</label>
                                                                                    <input disabled type="text" name="difficulty" id="difficulty" placeholder='Difficulty' className='leading-none text-gray-50 p-3 outline-none border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                                                                </div>
                                                                                <div className='w-full h-full flex flex-col'>
                                                                                    <label htmlFor="points" className='font-semibold leading-none text-gray-300'>Points</label>
                                                                                    <input type="text" name="points" id="poins" placeholder="Points" className='leading-none text-gray-50 p-3 outline-none border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                                                                </div>
                                                                                <div className='w-full h-full flex flex-col'>
                                                                                    <label htmlFor="timelimit" className='font-semibold leading-none text-gray-300'>Time limit</label>
                                                                                    <input type="text" name="timelimit" id="timelimit" placeholder="Time Limit" className='leading-none text-gray-50 p-3 outline-none border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                                                                </div>
                                                                            </div>
                                                                            <div className="w-full text-black mt-5">
                                                                                <div className='w-full h-full flex flex-col'>
                                                                                    <label htmlFor="answer" className='font-semibold leading-none text-gray-300'>Answer</label>
                                                                                    <textarea type="text" name="answer" id="answer" placeholder='Answer' className='leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex sm:flex-row flex-col gap-3">
                                                                                <button className="px-5 py-3 w-full sm:w-fit bg-red-700 mt-5 text-white font-bold rounded-lg">Remove</button>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })

                                                        }
                                                        <div className="flex justify-center items-center">
                                                            <div onClick={()=>{handleRemoveChallenge(i)}} className="px-5 py-3 w-full sm:w-fit bg-green-700 my-5 text-white font-bold rounded-lg">Add Question</div>
                                                        </div>
                                                        <div className="w-full text-black mt-5 flex justify-between gap-3 items center">
                                                            <div className='w-full h-full flex flex-col'>
                                                                <label htmlFor="question" className='font-semibold leading-none text-gray-300'>Story Previous Image</label>
                                                                <input type="file" name="question" id="question" className='leading-none text-gray-50 p-3 outline-none border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                                            </div>
                                                            <div className='w-full h-full flex flex-col'>
                                                                <label htmlFor="question" className='font-semibold leading-none text-gray-300'>Story Next Image</label>
                                                                <input type="file" name="question" id="question" className='leading-none text-gray-50 p-3 outline-none border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                                            </div>
                                                        </div>
                                                        <div className="w-full text-black mt-5">
                                                            <div className='w-full h-full flex flex-col'>
                                                                <label htmlFor="storyp" className='font-semibold leading-none text-gray-300'>Story-Previous</label>
                                                                <textarea type="text" name="storyp" id="storyp" placeholder='Write story here' className='leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                                            </div>
                                                        </div>
                                                        <div className="w-full text-black mt-5">
                                                            <div className='w-full h-full flex flex-col'>
                                                                <label htmlFor="storyn" className='font-semibold leading-none text-gray-300'>Story-Next</label>
                                                                <textarea type="text" name="storyn" id="storyn" placeholder='Write story here' className='leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                                            </div>
                                                        </div>
                                                        <div className="w-full text-black mt-5">
                                                            <div className="flex sm:flex-row flex-col gap-3">
                                                                <div onClick={()=>{handleRemoveChallenge(i)}} className="px-5 py-3 w-full sm:w-fit bg-red-700 mt-5 text-white font-bold rounded-lg">Remove</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })

                                    }
                                    <div className="w-full mt-5">
                                        <div className="flex justify-center items-center">
                                            <div onClick={handleAddChallenge} className="px-5 py-3 w-full sm:w-fit bg-green-700 text-white font-bold rounded-lg">Add Challenge</div>
                                        </div>
                                    </div>
                                    <div className="w-full mt-5">
                                        <div className="flex justify-center items-center">
                                            <button className="px-5 py-3 w-full sm:w-fit bg-blue-700 mb-7 text-white font-bold rounded-lg">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
