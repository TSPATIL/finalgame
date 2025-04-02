import React, { lazy, Suspense, useState } from 'react'
import AdminNavbar from './AdminNavbar';
import { useDispatch } from 'react-redux';
import { addTestAsync } from '../Redux/features/Tests/TestsSlice';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../Redux/features/Alerts/AlertSlice';
const ChallengeEditor = lazy(()=>import("./ChallengeEditor"))


export default function CreateQuiz() {
    const [test, setTest] = useState({ title: '', description: '', topic: 'sql', challenge: [], access: 'private', dueDate: '', type: 'Story-Based-Test' });
    const [challenges, setChallenges] = useState([{ title: '', codeExecute: '', preStory: '', preImage: null, postStory: '', postImage: null, questions: [{ question: '', answer: '', difficulty: 'easy', constraints: '', keywords: '', examples: [{ egQuestion: '', egAnswer: '', egExplanation: '' }] }], teaching: { teachingTopic: '', teachingExplanation: '' } }])
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleTestInfoChange = (e) => {
        setTest({ ...test, [e.target.name]: e.target.value });
    }
    
    const isValidDateFormat = (dateString) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(dateString);
    };

    const checkDate = (date) => {
        if (date) {
            if (isValidDateFormat(date)) {
                return date;
            }
            else {
                return date.split('T')[0];
            }
        }
        return date;
    }

    const handleStorySubmit = async (e) => {
        try {
            e.preventDefault();
            const c = confirm('Are you sure to submit the test details? Check the details before submitting.')
            if (c) {
                const formData = new FormData();
                formData.append('title', test.title);
                formData.append('description', test.description);
                formData.append('topic', test.topic);
                formData.append('type', test.type);
                formData.append('visibility', test.access);
                formData.append('testDueDate', test.dueDate);
                challenges.forEach((challenge, cNo) => {
                    formData.append(`challenges[${cNo}][title]`, challenge.title);
                    formData.append(`challenges[${cNo}][codeExecution]`, challenge.codeExecute);
                    formData.append(`challenges[${cNo}][previousStory][image]`, challenge.preImage);
                    formData.append(`challenges[${cNo}][previousStory][story]`, challenge.preStory);
                    formData.append(`challenges[${cNo}][postStory][image]`, challenge.postImage);
                    formData.append(`challenges[${cNo}][postStory][story]`, challenge.postStory);
                    formData.append(`challenges[${cNo}][teachings][topic]`, challenge.teaching.teachingTopic);
                    formData.append(`challenges[${cNo}][teachings][explanation]`, challenge.teaching.teachingExplanation);
                    challenge.questions.forEach((question, qNo) => {
                        formData.append(`challenges[${cNo}][questions][${qNo}][difficulty]`, question.difficulty);
                        formData.append(`challenges[${cNo}][questions][${qNo}][question]`, question.question);
                        formData.append(`challenges[${cNo}][questions][${qNo}][answer]`, question.answer);
                        question.examples.forEach((example, eNo) => {
                            formData.append(`challenges[${cNo}][questions][${qNo}][examples][${eNo}][question]`, example.egQuestion);
                            formData.append(`challenges[${cNo}][questions][${qNo}][examples][${eNo}][answer]`, example.egAnswer);
                            formData.append(`challenges[${cNo}][questions][${qNo}][examples][${eNo}][explanation]`, example.egExplanation);
                        });
                        // question.constraints.split(',').forEach((constraint, conNo) => {
                            formData.append(`challenges[${cNo}][questions][${qNo}][constraints]`, question.constraints.trim());
                        // });
                        // question.keywords.split(',').forEach((keyword, keyNo) => {
                            formData.append(`challenges[${cNo}][questions][${qNo}][keywords]`, question.keywords.trim());
                        // });
                    });
                })
                // for (let [key, value] of formData.entries()) {
                //     console.log(key, value);
                // }
                const response = await dispatch(addTestAsync(formData));
                const result = response.payload;
                if (result.status) {
                    dispatch(showAlert({ message: "Test created successfully", type: "success" }));
                    navigate('/admin/admin-dashboard');
                } else {
                    dispatch(showAlert({ message: "Test creation failed", type: "error" }));
                }
            }
        } catch (error) {
            dispatch(showAlert({ message: "Error occured", type: "error" }));
        }
    }

    return (
        <div className='CreateQuiz'>
            <AdminNavbar/>
            <div className="bg-gray-800 w-full min-h-screen flex items-center justify-center pt-28 pb-10 md:pt-16 md:pb-16">
                <div className="w-full min-h-full z-10 relative top-0 md:left-0 md:ml-[300px] flex justify-center items-center flex-col">
                    <div className='w-5/6 h-full flex justify-start items-start flex-col'>
                        <p className='text-3xl font-bold text-white'>Create Test</p>
                        <div className="w-full text-black mt-5">
                            <div className='w-full h-full flex flex-col'>
                                <label htmlFor="title" className='font-semibold leading-none text-gray-300'>Title</label>
                                <input type="text" name="title" id="title" required placeholder='Title' value={test.title} onChange={handleTestInfoChange} className='leading-none text-gray-50 p-3 outline-none border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                            </div>
                        </div>
                        <div className="w-full text-black mt-5">
                            <div className='w-full h-full flex flex-col'>
                                <label htmlFor="description" className='font-semibold leading-none text-gray-300'>Description</label>
                                <textarea type="text" name="description" id="description" placeholder='Description' value={test.description} onChange={handleTestInfoChange} className='leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                            </div>
                        </div>
                        <div className="w-full text-black mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div className='w-full h-full flex flex-col'>
                                <label htmlFor="topic" required className='font-semibold leading-none text-gray-300'>Topic</label>
                                <select id='topic' name='topic' value={test.topic} onChange={handleTestInfoChange} className='leading-none text-gray-50 p-3 mt-3 outline-none bg-gray-800 rounded border-[gold] border-2 border-solid'>
                                    <option value="sql">SQL</option>
                                    <option value="java">Java</option>
                                    <option value="python">Python</option>
                                </select>
                            </div>
                            <div className='w-full h-full flex flex-col'>
                                <label htmlFor="type" className='font-semibold leading-none text-gray-300'>Test Type</label>
                                <select id='type' name='type' required value={test.type} onChange={handleTestInfoChange} className='leading-none text-gray-50 p-3 mt-3 outline-none bg-gray-800 rounded border-[gold] border-2 border-solid'>
                                    <option value="Story-Based-Test">Story based learning</option>
                                    <option value="multiple_choice">Multiple Choices</option>
                                </select>
                            </div>
                            <div className='w-full h-full flex flex-col'>
                                <label htmlFor="access" className='font-semibold leading-none text-gray-300'>Visibility Access</label>
                                <select id='access' name='access' required value={test.access} onChange={handleTestInfoChange} className='leading-none text-gray-50 p-3 mt-3 outline-none bg-gray-800 rounded border-[gold] border-2 border-solid'>
                                    <option value="private">Private</option>
                                    <option value="public">Public</option>
                                </select>
                            </div>
                            <div className='w-full h-full flex flex-col'>
                                <label htmlFor="dueDate" className='font-semibold leading-none text-gray-300'>Due Date</label>
                                <input type="date" name="dueDate" required id="dueDate" placeholder='dueDate' value={checkDate(test.dueDate)} onChange={handleTestInfoChange} className='leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                            </div>
                        </div>
                    </div>
                    <hr className='bg-[white] h-[1px] w-5/6 mt-10 mb-7 mx-auto' />
                    <Suspense fallback={<div>Component is loading please wait...</div>}><ChallengeEditor challenges={challenges} setChallenges={setChallenges} handleSubmit={handleStorySubmit} /></Suspense>
                </div>
            </div>
        </div>
    )
}
