import React, { useState } from 'react'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { GrView } from "react-icons/gr";
import { useLocation } from 'react-router-dom';

export default function CreateChallenge({ challenges, setChallenges, type = 'Create', handleSubmit }) {
    // const [challenges, setChallenges] = useState([{ title: '', codeExecute: '', preStory: '', preImage: null, postStory: '', postImage: null, questions: [{ question: '', answer: '', difficulty: 'easy', constraints: '', keywords: '', examples: [{ egQuestion: '', egAnswer: '', egExplanation: '' }] }], teaching: { teachingTopic: '', teachingExplanation: '' } }])
    const [challengeCount, setChallengeCount] = useState(0);
    const [questionCount, setQuestionCount] = useState(0);
    const [exampleCount, setExampleCount] = useState(0);

    const handleInputOnChange = (cIndex, field, value) => {
        const newChallenges = [...challenges];
        newChallenges[cIndex][field] = value;
        setChallenges(newChallenges);
        console.log(challenges);
    }

    const handleOnImageDelete = (cIndex, field, value) => {
        const newChallenges = [...challenges];
        newChallenges[cIndex][field] = value;
        setChallenges(newChallenges);
        console.log(challenges);
    }

    const handleQuestionInputOnChange = (cIndex, qIndex, field, value) => {
        const newChallenges = [...challenges];
        newChallenges[cIndex].questions[qIndex][field] = value;
        setChallenges(newChallenges);
        console.log(challenges);
    }

    const handleExampleInputOnChange = (cIndex, qIndex, egIndex, field, value) => {
        const newChallenges = [...challenges];
        newChallenges[cIndex].questions[qIndex].examples[egIndex][field] = value;
        setChallenges(newChallenges);
        console.log(challenges);
    }

    const handleTeachingInputOnChange = (cIndex, field, value) => {
        const newChallenges = [...challenges];
        newChallenges[cIndex].teaching[field] = value;
        setChallenges(newChallenges);
        console.log(challenges);
    }

    const handleAddChallenge = () => {
        setChallenges([...challenges, { title: '', codeExecute: '', preStory: [''], preImage: null, postStory: [''], postImage: null, questions: [{ question: '', answer: '', difficulty: 'easy', constraints: '', keywords: '', examples: [{ egQuestion: '', egAnswer: '', egExplanation: '' }] }], teaching: { teachingTopic: '', teachingExplanation: '' } }])
    }

    const handleRemoveChallenge = (index) => {
        const updatedChallenge = challenges.filter((_, i) => i !== index);
        setChallengeCount(0)
        setChallenges(updatedChallenge)
    }

    const handleAddQuestion = (cIndex) => {
        let newChallenges = [...challenges];
        if(newChallenges[cIndex].questions.length === 0) newChallenges[cIndex].questions.push({ question: '', answer: '', difficulty: 'easy', constraints: '', keywords: '', examples: [{ egQuestion: '', egAnswer: '', egExplanation: '' }] });
        else if(newChallenges[cIndex].questions.length === 1) newChallenges[cIndex].questions.push({ question: '', answer: '', difficulty: 'medium', constraints: '', keywords: '', examples: [{ egQuestion: '', egAnswer: '', egExplanation: '' }] });
        else newChallenges[cIndex].questions.push({ question: '', answer: '', difficulty: 'hard', constraints: '', keywords: '', examples: [{ egQuestion: '', egAnswer: '', egExplanation: '' }] });
        setChallenges(newChallenges);
    }

    const handleRemoveQuestion = (cIndex, qIndex) => {
        let newChallenges = [...challenges];
        newChallenges[cIndex].questions = newChallenges[cIndex].questions.filter((_, i) => i !== qIndex);
        setQuestionCount(0);
        setChallenges(newChallenges);
    }

    const handleAddExample = (cIndex, qIndex) => {
        let newChallenges = [...challenges];
        newChallenges[cIndex].questions[qIndex].examples.push({ egQuestion: '', egAnswer: '', egExplanation: '' });
        setChallenges(newChallenges);
    }

    const handleRemoveExample = (cIndex, qIndex, eIndex) => {
        let newChallenges = [...challenges];
        newChallenges[cIndex].questions[qIndex].examples = newChallenges[cIndex].questions[qIndex].examples.filter((_, i) => i !== eIndex);
        console.log(newChallenges)
        setExampleCount(0);
        setChallenges(newChallenges);
    }

    function isBase64(str) {
        const base64Regex = /^(data:image\/[a-zA-Z]+;base64,)?[A-Za-z0-9+/=]+$/;
        return base64Regex.test(str);
    }

    const checkImage = (image) => {
        if (image) {
            if (isBase64(image)) {
                return image;
            }
            else {
                return URL.createObjectURL(image);
            }
        }
        return null;
    }

    const location = useLocation();

    return (
        <div className='CreateChallenge w-5/6 h-full flex justify-start items-start flex-col'>
            <p className='text-3xl font-bold text-white'>{type} Challenges</p>
            {
                challenges.map((challenge, i) => {
                    if (challengeCount === i)
                        return (
                            <div key={challenge + i} className='w-full h-full flex justify-center items-center flex-col my-5'>
                                <p className='text-2xl font-bold text-white'>Challenge {i + 1}</p>
                                <div className="w-full text-black mt-5">
                                    <div className='w-full h-full flex flex-col'>
                                        <label htmlFor="title" className='font-semibold leading-none text-gray-300'>Title</label>
                                        <input type="text" name="title" id="title" required placeholder='Title' value={challenge.title} onChange={(e) => handleInputOnChange(i, e.target.name, e.target.value)} className='leading-none text-gray-50 p-3 outline-none border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                    </div>
                                </div>
                                <div className="w-full text-black mt-5">
                                    <div className='w-full h-full flex flex-col'>
                                        <label htmlFor="codeExecute" className='font-semibold leading-none text-gray-300'>Code to be executed at start of the challenge</label>
                                        <textarea type="text" name="codeExecute" id="codeExecute" placeholder='Write the code' value={challenge.codeExecute} onChange={(e) => handleInputOnChange(i, e.target.name, e.target.value)} className='leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                    </div>
                                </div>
                                <hr className='bg-gray-300 h-[1px] w-full mt-5 mx-auto' />
                                <div className="w-full text-black mt-5 space-y-5">
                                    <p className='text-xl font-bold text-white'>Pre-Scenario Details</p>
                                    <div className='w-full h-full flex flex-col'>
                                        <label htmlFor="preStory" className='font-semibold leading-none text-gray-300'>Pre-Scenario Story</label>
                                        <textarea type="text" name="preStory" id="preStory" placeholder='Write your story here' value={challenge.preStory} onChange={(e) => handleInputOnChange(i, e.target.name, e.target.value)} className='leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                    </div>
                                    <div className='w-full h-full flex flex-col'>
                                        <label htmlFor="preImage" className='font-semibold leading-none text-gray-300'>Pre-Scenario Image</label>
                                        {
                                            !challenge.preImage
                                                ?
                                                <input type="file" id="preImage" name="preImage" accept='image/*' onChange={(e) => handleInputOnChange(i, e.target.name, e.target.files[0])} className='leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                                :
                                                <div className='leading-none outline-none text-gray-50 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md flex justify-center items-center'>
                                                    <a href={checkImage(challenge.preImage)} target='_blank' rel='noopener noreferrer' className='w-[60%] md:w-[80%] text-white py-3 text-lg no-underline px-5 flex items-center justify-start gap-5'><GrView /> {challenge.preImage.name || 'Previous-Story.png'}</a>
                                                    <hr className='rotate-90 bg-white w-[30px]' />
                                                    <button className='text-lg text-orange-500 w-[40%] md:w-[20%] h-full py-2 px-5 outline-none' onClick={()=>handleOnImageDelete(i, 'preImage', null)}>Cancel</button>
                                                </div>
                                        }
                                    </div>
                                </div>
                                <hr className='bg-gray-300 h-[1px] w-full mt-5 mx-auto' />
                                <div className="w-full text-black mt-5 space-y-5">
                                    <p className='text-xl font-bold text-white'>Post-Scenario Details</p>
                                    <div className='w-full h-full flex flex-col'>
                                        <label htmlFor="postStory" className='font-semibold leading-none text-gray-300'>Post-Scenario Story</label>
                                        <textarea type="text" name="postStory" id="postStory" placeholder='Write your story here' value={challenge.postStory} onChange={(e) => handleInputOnChange(i, e.target.name, e.target.value)} className='leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                    </div>
                                    <div className='w-full h-full flex flex-col'>
                                        <label htmlFor="postImage" className='font-semibold leading-none text-gray-300'>Post-Scenario Image</label>
                                        {
                                            !challenge.postImage
                                                ?
                                                <input type="file" id="postImage" name="postImage" accept='image/*' onChange={(e) => handleInputOnChange(i, e.target.name, e.target.files[0])} className='leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                                :
                                                <div className='leading-none outline-none text-gray-50 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md flex justify-center items-center'>
                                                    <a href={checkImage(challenge.postImage)} target='_blank' rel='noopener noreferrer' className='w-[60%] md:w-[80%] text-white py-3 text-lg no-underline px-5 flex items-center justify-start gap-5'><GrView /> {challenge.postImage.name || 'Post-Story.png'}</a>
                                                    <hr className='rotate-90 bg-white w-[30px]' />
                                                    <button className='text-lg text-orange-500 w-[40%] md:w-[20%] h-full py-2 px-5 outline-none' onClick={()=>handleOnImageDelete(i, 'postImage', null)}>Cancel</button>
                                                </div>
                                        }
                                    </div>
                                </div>
                                <hr className='bg-gray-300 h-[1px] w-full mt-5 mx-auto' />
                                <div className="w-full text-black mt-5 space-y-5">
                                    <p className='text-xl font-bold text-white'>Teaching</p>
                                    <div className='w-full h-full flex flex-col'>
                                        <label htmlFor="teachingTopic" className='font-semibold leading-none text-gray-300'>Topic</label>
                                        <textarea type="text" name="teachingTopic" id="teachingTopic" value={challenge.teaching.teachingTopic} onChange={(e) => handleTeachingInputOnChange(i, e.target.name, e.target.value)} placeholder='Topic' className='leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                    </div>
                                    <div className='w-full h-full flex flex-col'>
                                        <label htmlFor="teachingExplanation" className='font-semibold leading-none text-gray-300'>Explanation</label>
                                        <textarea type="text" name="teachingExplanation" id="teachingExplanation" value={challenge.teaching.teachingExplanation} onChange={(e) => handleTeachingInputOnChange(i, e.target.name, e.target.value)} placeholder='Explanation' className='leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                    </div>
                                </div>
                                <hr className='bg-gray-300 h-[1px] w-full mt-5 mx-auto' />
                                <div className="w-full text-black mt-5 grid grid-cols-1 gap-5">
                                    <p className='text-xl font-bold text-white'>Questions</p>
                                    {
                                        challenge.questions.map((question, qNo) => {
                                            if (questionCount === qNo)
                                                return (
                                                    <div className='grid grid-cols-1 gap-5' key={challenge + question + qNo}>
                                                        <div className='w-full h-full flex flex-col'>
                                                            <label htmlFor="question" className='font-semibold leading-none text-gray-300'>Question {qNo + 1}</label>
                                                            <textarea type="text" name="question" id="question" placeholder='Question' value={question.question} onChange={(e) => handleQuestionInputOnChange(i, qNo, e.target.name, e.target.value)} className='leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                                        </div>
                                                        <div className='w-full h-full flex flex-col'>
                                                            <label htmlFor="answer" className='font-semibold leading-none text-gray-300'>Answer</label>
                                                            <textarea type="text" name="answer" id="answer" placeholder='Answer' value={question.answer} onChange={(e) => handleQuestionInputOnChange(i, qNo, e.target.name, e.target.value)} className='leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                                        </div>
                                                        <div className='w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-5'>
                                                            <div className="w-full h-full flex flex-col">
                                                                <label htmlFor="difficulty" className='font-semibold leading-none text-gray-300'>Difficulty</label>
                                                                <select id='difficulty' name='difficulty' value={question.difficulty} onChange={(e) => handleQuestionInputOnChange(i, qNo, e.target.name, e.target.value)} className='h-16 leading-none text-gray-50 p-3 mt-3 outline-none bg-gray-800 rounded border-[gold] border-2 border-solid'>
                                                                    {qNo === 0 ? <option value="easy">Easy</option> : null}
                                                                    {qNo === 1 ? <option value="medium">Medium</option>: null}
                                                                    {qNo === 2 ? <option value="hard">Hard</option> : null}
                                                                </select>
                                                            </div>
                                                            <div className="w-full h-full flex flex-col">
                                                                <label htmlFor="constraints" className='font-semibold leading-none text-gray-300'>Constraints</label>
                                                                <textarea type="text" name="constraints" id="constraints" placeholder='Contraints' value={question.constraints} onChange={(e) => handleQuestionInputOnChange(i, qNo, e.target.name, e.target.value)} className='h-16 max-h-16 leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                                            </div>
                                                            <div className="w-full h-full flex flex-col">
                                                                <label htmlFor="keywords" className='font-semibold leading-none text-gray-300'>Keywords</label>
                                                                <textarea type="text" name="keywords" id="keywords" placeholder='Keywords' value={question.keywords} onChange={(e) => handleQuestionInputOnChange(i, qNo, e.target.name, e.target.value)} className='h-16 max-h-16 leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                                            </div>
                                                        </div>
                                                        <div className='w-full h-full grid grid-cols-1 gap-5'>
                                                            {
                                                                question.examples?.map((example, egNo) => {
                                                                    if (exampleCount === egNo)
                                                                        return (
                                                                            <div className='grid grid-cols-1 gap-5 w-full h-full' key={challenge + question + example + egNo}>
                                                                                <p className='text-xl font-bold text-white'>Examples</p>
                                                                                <div className="w-full h-full flex flex-col">
                                                                                    <label htmlFor="egQuestion" className='font-semibold leading-none text-gray-300'>Question</label>
                                                                                    <textarea type="text" name="egQuestion" id="egQuestion" value={example.egQuestion} onChange={(e) => handleExampleInputOnChange(i, qNo, egNo, e.target.name, e.target.value)} placeholder='Question' className='leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                                                                </div>
                                                                                <div className="w-full h-full flex flex-col">
                                                                                    <label htmlFor="egAnswer" className='font-semibold leading-none text-gray-300'>Answer</label>
                                                                                    <textarea type="text" name="egAnswer" id="egAnswer" value={example.egAnswer} onChange={(e) => handleExampleInputOnChange(i, qNo, egNo, e.target.name, e.target.value)} placeholder='Answer' className='leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                                                                </div>
                                                                                <div className="w-full h-full flex flex-col">
                                                                                    <label htmlFor="egExplanation" className='font-semibold leading-none text-gray-300'>Explanation</label>
                                                                                    <textarea type="text" name="egExplanation" id="egExplanation" value={example.egExplanation} onChange={(e) => handleExampleInputOnChange(i, qNo, egNo, e.target.name, e.target.value)} placeholder='Explanation' className='leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
                                                                                </div>
                                                                                <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 justify-between gap-5'>
                                                                                    <div className='w-full h-full text-xl font-bold text-white flex items-center justify-center md:justify-start'>
                                                                                        <div className='w-fit h-full flex justify-center items-center gap-3'>
                                                                                            <button disabled={exampleCount === 0 ? true : false} onClick={() => setExampleCount(exampleCount - 1)}><FaAngleLeft className={`cursor-pointer`} /></button>
                                                                                            <span>Example {egNo + 1} of {question.examples.length}</span>
                                                                                            <button disabled={exampleCount === question.examples.length - 1 ? true : false} onClick={() => setExampleCount(exampleCount + 1)}><FaAngleRight className={`cursor-pointer`} /></button>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='space-x-5 w-full h-full flex justify-center items-center md:justify-end md:items-center'>
                                                                                        <button className='text-white text-xl font-bold px-10 py-3 md:px-8 md:py-2 border-2 border-[gold] border-solid bg-gradient-to-r from-green-700 to-green-900 hover:gradient-to-l w-full lg:w-fit h-fit transition duration-700 hover:scale-[0.98] lg:hover:scale-105 hover:shadow-xl rounded' onClick={(e) => handleAddExample(i, qNo)}>Create</button>
                                                                                        <button disabled={question.examples.length === 1 ? true : false} className='text-white text-xl w-full lg:w-fit h-fit font-bold px-10 py-3 md:px-8 md:py-2 border-2 border-[gold] border-solid rounded bg-gradient-to-r from-red-700 to-red-900 hover:bg-gradient-to-l transition duration-700 hover:scale-[0.98] lg:hover:scale-105 hover:shadow-xl' onClick={(e) => handleRemoveExample(i, qNo, egNo)}>Remove</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                })
                                                            }
                                                        </div>
                                                        <hr className='bg-gray-300 h-[1px] w-full mx-auto' />
                                                        <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 justify-between gap-5'>
                                                            <div className='w-full h-full text-xl font-bold text-white flex items-center justify-center md:justify-start'>
                                                                <div className='w-fit h-full flex justify-center items-center gap-3'>
                                                                    <button disabled={questionCount === 0 ? true : false} onClick={() => { setQuestionCount(questionCount - 1); setExampleCount(0); }}><FaAngleLeft className={`cursor-pointer`} /></button>
                                                                    <span>Question {qNo + 1} of {challenge.questions.length}</span>
                                                                    <button disabled={questionCount === challenge.questions.length - 1 ? true : false} onClick={() => { setQuestionCount(questionCount + 1); setExampleCount(0); }}><FaAngleRight className={`cursor-pointer`} /></button>
                                                                </div>
                                                            </div>
                                                            <div className='space-x-5 w-full h-full flex justify-center items-center md:justify-end md:items-center'>
                                                                <button disabled={challenge.questions.length === 3} className='text-white text-xl font-bold px-10 py-3 md:px-8 md:py-2 border-2 border-[gold] border-solid bg-gradient-to-r from-green-700 to-green-900 hover:gradient-to-l w-full lg:w-fit h-fit transition duration-700 hover:scale-[0.98] lg:hover:scale-105 hover:shadow-xl rounded' onClick={(e) => handleAddQuestion(i)}>Create</button>
                                                                <button disabled={challenge.questions.length === 1 ? true : false} className='text-white text-xl w-full lg:w-fit h-fit font-bold px-10 py-3 md:px-8 md:py-2 border-2 border-[gold] border-solid rounded bg-gradient-to-r from-red-700 to-red-900 hover:bg-gradient-to-l transition duration-700 hover:scale-[0.98] lg:hover:scale-105 hover:shadow-xl' onClick={(e) => handleRemoveQuestion(i, qNo)}>Remove</button>
                                                            </div>
                                                        </div>
                                                    </div>)
                                        })
                                    }
                                </div>
                                <hr className='bg-gray-300 h-[1px] w-full mt-5 mx-auto' />
                                <div className="w-full text-black mt-7 space-y-5">
                                    <div className='w-full h-full text-xl font-bold text-white flex items-center justify-center'>
                                        <div className='w-fit h-full flex justify-center items-center gap-3'>
                                            <button disabled={challengeCount === 0 ? true : false} onClick={() => { setChallengeCount(challengeCount - 1); setQuestionCount(0); setExampleCount(0); }}><FaAngleLeft className={`cursor-pointer`} /></button>
                                            <span>Challenge {i + 1} of {challenges.length}</span>
                                            <button disabled={challengeCount === challenges.length - 1 ? true : false} onClick={() => { setChallengeCount(challengeCount + 1); setQuestionCount(0); setExampleCount(0); }}><FaAngleRight className={`cursor-pointer`} /></button>
                                        </div>
                                    </div>
                                    <div className='w-full h-full flex md:justify-center md:items-center space-x-5'>
                                        <button className='text-white text-xl font-bold px-10 py-3 border-2 border-[gold] border-solid bg-gradient-to-r from-green-700 to-green-900 hover:gradient-to-l w-full lg:w-fit h-fit transition duration-700 hover:scale-[0.98] lg:hover:scale-105 hover:shadow-xl rounded' onClick={handleAddChallenge}>Create</button>
                                        <button disabled={challenges.length === 1 ? true : false} className='text-white text-xl w-full lg:w-fit h-fit font-bold px-10 py-3 border-2 border-[gold] border-solid rounded bg-gradient-to-r from-red-700 to-red-900 hover:bg-gradient-to-l transition duration-700 hover:scale-[0.98] lg:hover:scale-105 hover:shadow-xl' onClick={() => handleRemoveChallenge(i)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        )
                })
            }
            <div className={`w-full text-black mt-7 ${location.pathname.includes("/admin/view-quiz-details") ? 'hidden' : ''}`}>
                <div className='w-full h-full flex md:justify-center md:items-center space-x-5'>
                    <button onClick={handleSubmit} className="bg-gradient-to-b from-blue-900 to-blue-700 hover:bg-gradient-to-t px-10 py-3 w-full lg:w-fit h-fit rounded transition duration-700 hover:scale-[0.98] lg:hover:scale-105 text-xl font-bold text-white border-2 border-solid border-[gold] hover:shadow-xl">Submit Test</button>
                </div>
            </div>
        </div>
    )
}
