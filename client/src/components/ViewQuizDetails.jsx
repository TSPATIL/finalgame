import React, { useEffect, useState } from 'react'
import ChallengeEditor from './ChallengeEditor';
import AdminNavbar from './AdminNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../Redux/features/Alerts/AlertSlice';
import { useParams } from 'react-router-dom';
import {Buffer} from 'buffer'
import { selectIsLogin } from '../Redux/features/Authentication/AuthenticationSlice';
import LoginModal from './LoginModal';

export default function ViewQuizDetails() {
    const [test, setTest] = useState({ title: '', description: '', topic: 'sql', challenge: [], access: 'private', dueDate: '', type: 'Story-Based-Test' });
    const [challenges, setChallenges] = useState([{ title: '', codeExecute: '', preStory: '', preImage: null, postStory: '', postImage: null, questions: [{ question: '', answer: '', difficulty: 'easy', constraints: '', keywords: '', examples: [{ egQuestion: '', egAnswer: '', egExplanation: '' }] }], teaching: { teachingTopic: '', teachingExplanation: '' } }])
    const dispatch = useDispatch();
    const { id, type } = useParams();

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

    // function isBase64(str) {
    //     const base64Regex = /^(data:image\/[a-zA-Z]+;base64,)?[A-Za-z0-9+/=]+$/;
    //     return base64Regex.test(str);
    // }

    // const checkImageBufferOrBase64 = (image) => {
    //     if (!image) return null;
    
    //     if (image.type === "Buffer") {
    //         const buffer = Buffer.from(image.data);
    //         return `data:image/png;base64,${buffer.toString('base64')}`;
    //     }
    //     else if (typeof image === 'string' && isBase64(image)) {
    //         return `data:image/png;base64,${image}`;
    //     }
    
    //     return null;
    // }

    useEffect(() => {
        const fetchTestDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/test/get-test/${id}/${type}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
                const result = await response.json();
                if (result.status) {
                    console.log(result.data);
                    setTest({ title: result.data.title, topic: result.data.topic, type: result.data.type, description: result.data.description, access: result.data.visibility, dueDate: result.data.testDueDate, })
                    setChallenges(result.data.challenges.map((challenge)=>{ 
                        // checkImageBufferOrBase64(challenge.previousStory.image);
                        return {
                            title: challenge.title, 
                            codeExecute: challenge.codeExecution || '', 
                            preStory: challenge.previousStory?.story || '', 
                            // preImage: checkImageBufferOrBase64(challenge.previousStory?.image) || null,
                            preImage: challenge.previousStory?.image || null,
                            postStory: challenge.postStory?.story || '',
                            // postImage: checkImageBufferOrBase64(challenge.postStory?.image) || null,
                            postImage: challenge.postStory?.image || null,
                            questions: challenge.questions.map((question) => {
                                return {
                                    question: question.question,
                                    answer: question.answer,
                                    difficulty: question.difficulty,
                                    constraints: question.constraints || '',
                                    keywords: question.keywords || '',
                                    examples: question.examples?.map((example) => {
                                        return {
                                            egQuestion: example?.question || '',
                                            egAnswer: example?.answer || '',
                                            egExplanation: example?.explanation || ''
                                        }
                                    }) || [{ egQuestion: '', egAnswer: '', egExplanation: '' }]
                                }
                            }),
                            teaching: { teachingTopic: challenge.teachings?.topic || '', teachingExplanation: challenge.teachings?.explanation || ''}
                        }
                    }));
                    dispatch(showAlert({ message: "Test Fetched Successfully", type: "success" }))
                }
                else {
                    console.log(result.error)
                    dispatch(showAlert({ message: "Error occured while test details fetched", type: "error" }))
                }
            } catch (error) {
                console.log(error)
                dispatch(showAlert({ message: "Error Occured", type: "error" }))
            }
        }
        if(isLogin)
            fetchTestDetails();
    }, [])

    
      const isLogin = useSelector(selectIsLogin);
            if(!isLogin){
              return <LoginModal/>
            }

    return (
        <div className='ViewQuizDetails'>
            <AdminNavbar />
            <div className="bg-gray-800 w-full min-h-screen flex items-center justify-center pt-28 pb-10 md:pt-16 md:pb-16">
                <div className="w-full min-h-full z-10 relative top-0 md:left-0 md:ml-[300px] flex justify-center items-center flex-col">
                    <div className='w-5/6 h-full flex justify-start items-start flex-col'>
                        <p className='text-3xl font-bold text-white'>View Test</p>
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
                    <ChallengeEditor type='View' challenges={challenges} setChallenges={setChallenges} />
                </div>
            </div>
        </div>
    )
}
