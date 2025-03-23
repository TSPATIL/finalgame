import React from 'react'
import { FaGooglePlay } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

import {
    Link,
    useNavigate
} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showAlert } from '../Redux/features/Alerts/AlertSlice';

const ProgressBar = ({ width }) => {
    return (
        <div className='w-full h-4 bg-gray-300 shadow-inner'>
            <div className="bg-black h-full text-xs text-white leading-4 transition-all duration-300 flex justify-center items-center" style={{ width: `${width}%` }}>{`${width}%`}</div>
        </div>
    )
}

export default function ViewQuizUser() {
    const [availableTests, setAvailableTests] = useState([]);
    const [ongoingTests, setOngoingTests] = useState([]);
    const [completeTests, setCompleteTests] = useState([]);
    const [filteredAvailableTests, setFilteredAvailableTests] = useState([]);
    const [filteredOngoingTests, setFilteredOngoingTests] = useState([]);
    const [filteredCompleteTests, setFilteredCompleteTests] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('avail')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTests() {
            try {
                const response = await fetch(`http://localhost:5000/api/test/get-test-result`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                });
                const result = await response.json();
                console.log(result);
                if (result.status) {
                    setAvailableTests(result.data.tests);
                    setFilteredAvailableTests(result.data.tests);
                    setOngoingTests(result.data.results || []);
                    setFilteredOngoingTests(result.data.results || []);
                    setCompleteTests(result.data.results || []);
                    setFilteredCompleteTests(result.data.results || []);
                    // const date = new Date();
                    // setOngoingTests([{ _id: '67d08620f382a36fe2631e10', testId: '67d08620f382a36fe2631e10', title: 'SQL Story Game', topic: 'SQL', type: 'Story-Based-Test', currentChallengeNo: 5, totalActualChallenges: 20, status: 'In-Progress', start_time: date.toISOString(), end_time: date.toISOString() }, { _id: '67d08620f382a36fe2631e10', testId: '67d08620f382a36fe2631e10', title: 'SQL Story Game', topic: 'SQL', type: 'Story-Based-Test', currentChallengeNo: 5, totalActualChallenges: 20, status: 'In-Progress', start_time: Date.now(), end_time: Date.now() }, { _id: '67d08620f382a36fe2631e10', testId: '67d08620f382a36fe2631e10', title: 'SQL Story Game', topic: 'SQL', type: 'Story-Based-Test', currentChallengeNo: 5, totalActualChallenges: 20, status: 'In-Progress', start_time: Date.now(), end_time: Date.now() }, { _id: '67d08620f382a36fe2631e10', testId: '67d08620f382a36fe2631e10', title: 'SQL Story Game', topic: 'SQL', type: 'Story-Based-Test', currentChallengeNo: 5, totalActualChallenges: 20, status: 'In-Progress', start_time: Date.now(), end_time: Date.now() }]);
                    // setFilteredOngoingTests([{ _id: '67d08620f382a36fe2631e10', testId: '67d08620f382a36fe2631e10', title: 'SQL Story Game', topic: 'SQL', type: 'Story-Based-Test', currentChallengeNo: 5, totalActualChallenges: 20, status: 'In-Progress', start_time: date.toISOString(), end_time: date.toISOString() }, { _id: '67d08620f382a36fe2631e10', testId: '67d08620f382a36fe2631e10', title: 'SQL Story Game', topic: 'SQL', type: 'Story-Based-Test', currentChallengeNo: 5, totalActualChallenges: 20, status: 'In-Progress', start_time: Date.now(), end_time: Date.now() }, { _id: '67d08620f382a36fe2631e10', testId: '67d08620f382a36fe2631e10', title: 'SQL Story Game', topic: 'SQL', type: 'Story-Based-Test', currentChallengeNo: 5, totalActualChallenges: 20, status: 'In-Progress', start_time: Date.now(), end_time: Date.now() }, { _id: '67d08620f382a36fe2631e10', testId: '67d08620f382a36fe2631e10', title: 'SQL Story Game', topic: 'SQL', type: 'Story-Based-Test', currentChallengeNo: 5, totalActualChallenges: 20, status: 'In-Progress', start_time: Date.now(), end_time: Date.now() }]);
                    // setCompleteTests([{ _id: '67d08620f382a36fe2631e10', testId: '67d08620f382a36fe2631e10', title: 'SQL Story Game', topic: 'SQL', type: 'Story-Based-Test', currentChallengeNo: 5, totalActualChallenges: 20, status: 'In-Progress', start_time: date.toISOString(), end_time: date.toISOString() }, { _id: '67d08620f382a36fe2631e10', testId: '67d08620f382a36fe2631e10', title: 'SQL Story Game', topic: 'SQL', type: 'Story-Based-Test', currentChallengeNo: 5, totalActualChallenges: 20, status: 'In-Progress', start_time: Date.now(), end_time: Date.now() }, { _id: '67d08620f382a36fe2631e10', testId: '67d08620f382a36fe2631e10', title: 'SQL Story Game', topic: 'SQL', type: 'Story-Based-Test', currentChallengeNo: 5, totalActualChallenges: 20, status: 'In-Progress', start_time: Date.now(), end_time: Date.now() }, { _id: '67d08620f382a36fe2631e10', testId: '67d08620f382a36fe2631e10', title: 'SQL Story Game', topic: 'SQL', type: 'Story-Based-Test', currentChallengeNo: 5, totalActualChallenges: 20, status: 'In-Progress', start_time: Date.now(), end_time: Date.now() }]);
                    // setFilteredCompleteTests([{ _id: '67d08620f382a36fe2631e10', testId: '67d08620f382a36fe2631e10', title: 'SQL Story Game', topic: 'SQL', type: 'Story-Based-Test', currentChallengeNo: 5, totalActualChallenges: 20, status: 'Passed', start_time: date.toISOString(), end_time: date.toISOString() }, { _id: '67d08620f382a36fe2631e10', testId: '67d08620f382a36fe2631e10', title: 'SQL Story Game', topic: 'SQL', type: 'Story-Based-Test', currentChallengeNo: 5, totalActualChallenges: 20, status: 'Failed', start_time: Date.now(), end_time: Date.now() }, { _id: '67d08620f382a36fe2631e10', testId: '67d08620f382a36fe2631e10', title: 'SQL Story Game', topic: 'SQL', type: 'Story-Based-Test', currentChallengeNo: 5, totalActualChallenges: 20, status: 'Passed', start_time: Date.now(), end_time: Date.now() }, { _id: '67d08620f382a36fe2631e10', testId: '67d08620f382a36fe2631e10', title: 'SQL Story Game', topic: 'SQL', type: 'Story-Based-Test', currentChallengeNo: 5, totalActualChallenges: 20, status: 'Passed', start_time: Date.now(), end_time: Date.now() }]);
                    dispatch(showAlert({ message: "Tests Fetched Successfully", type: "success" }))
                }
                else {
                    console.error(result.error)
                    dispatch(showAlert({ message: "Tests unabled to fetched", type: "error" }))
                }
            } catch (error) {
                dispatch(showAlert({ message: "Error Occured", type: "error" }))
            }
        }
        fetchTests();
    }, []);


    const handleSearch = async (e) => {
        e.preventDefault();
        setFilteredAvailableTests(tests.filter(test =>
            test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.visibility.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.testDueDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.type.toLowerCase().includes(searchQuery.toLowerCase())
        ));
        setFilteredCompleteTests(completeTests.filter(test =>
            test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.testId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.start_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.end_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.type.toLowerCase().includes(searchQuery.toLowerCase())
        ))
        setFilteredOngoingTests(ongoingTests.filter(test =>
            test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.testId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.start_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.end_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.type.toLowerCase().includes(searchQuery.toLowerCase())
        ))
    }

    const startTestOnClick = async (type, testId) => {
        const c = confirm('Before starting note that "Story-Based-Test" have time bound of 24 hours. Make sure you complete the test within 24 hours');
        if (c) {
            const response = await fetch(`http://localhost:5000/api/test/create-result/${testId}/${type}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })
            const result = await response.json();
            if(result.status){
                dispatch(showAlert({ message: result.message, type: "success" }))
                navigate(`/user/editor/${result.resultId}`)
            }
            else{
                dispatch(showAlert({ message: result.message, type: "error" }))
            }
        }
    }

    return (
        <div className='ViewQuizUser'>
            <div className="bg-gray-800 w-full min-h-screen flex items-center justify-center flex-col pt-28 pb-10 md:pt-16 md:pb-16">
                <div className='w-5/6 flex justify-end items-center'>
                    <Link to="/" className='w-fit border-2 border-solid border-[gold] px-5 md:px-7 py-3 text-md md:text-xl font-bold rounded-full flex justify-center items-center gap-3 text-white'>
                        <FaHome />
                        <span>Home</span>
                    </Link>
                </div>
                <div className='w-5/6 h-full flex justify-start items-start flex-col'>
                    <h1 className="text-3xl font-bold mb-5 text-white">View Tests</h1>
                    <div className="w-full h-full">
                        <form onSubmit={handleSearch} className='w-full h-full flex flex-col'>
                            <label htmlFor="title" className='font-semibold leading-none text-gray-300'>Search</label>
                            <div className='flex justify-center items-center flex-col sm:flex-row w-full gap-5 mt-3'>
                                <input type="text" name="title" id="title" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} placeholder='Search' className='w-full h-full leading-none text-gray-50 p-3 outline-none border-[gold] border-2 border-solid bg-gray-800 rounded-md' />
                                <button type='submit' className='w-full sm:w-fit h-full px-10 py-2 text-xl bg-white text-black hover:bg-gray-400 transition duration-500 rounded-md flex justify-center items-center outline-none font-bold border-solid border-2 border-[gold]'>Search</button>
                            </div>
                        </form>
                        <div className='w-full h-full grid grid-cols-1 mt-10'>
                            <div className='w-full h-full flex justify-center items-center gap-5'>
                                <button onClick={() => { setActiveTab('avail') }} className={`px-3 md:px-7 py-4 text-sm md:text-xl border-2 border-solid border-[gold] ${activeTab === 'avail' ? 'text-black' : 'text-white'} font-bold rounded-xl transition hover:scale-105 bg-gradient-to-r hover:bg-gradient-to-l from-blue-600 to-blue-800`}>Available Tests</button>
                                <button onClick={() => { setActiveTab('ongoing') }} className={`px-3 md:px-7 py-4 text-sm md:text-xl border-2 border-solid border-[gold] ${activeTab === 'ongoing' ? 'text-black' : 'text-white'} font-bold rounded-xl transition hover:scale-105 bg-gradient-to-r hover:bg-gradient-to-l from-red-600 to-red-800`}>Ongoing Tests</button>
                                <button onClick={() => { setActiveTab('complete') }} className={`px-3 md:px-7 py-4 text-sm md:text-xl border-2 border-solid border-[gold] ${activeTab === 'complete' ? 'text-black' : 'text-white'} font-bold rounded-xl transition hover:scale-105 bg-gradient-to-r hover:bg-gradient-to-l from-yellow-600 to-yellow-800`}>Completed Tests</button>
                            </div>
                            <p className='text-2xl text-white font-bold mt-5'>Results</p>
                            {
                                activeTab === 'avail' &&
                                <div className="w-full text-black mt-5 grid grid-cols-1 gap-7">
                                    {
                                        filteredAvailableTests.length !== 0
                                            ?
                                            filteredAvailableTests.map((test, testNo) => {
                                                return (
                                                    <div key={test + "" + testNo} data-aos="fade-up" className='w-full group h-full bg-white text-black flex items-center justify-center flex-col border-2 border-solid p-3 gap-3 text-lg rounded-2xl'>
                                                        <div className='grid gap-3 lg:gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-start w-full h-full'>
                                                            <div className=''>
                                                                <div>Sr. No.: {testNo + 1}</div>
                                                            </div>
                                                            <div className=''>
                                                                <div>Test id: {test._id}</div>
                                                            </div>
                                                            <div className=''>
                                                                <div>Title : {test.title}</div>
                                                            </div>
                                                            <div className=''>
                                                                <div>Type: {test.type}</div>
                                                            </div>
                                                            <div className=''>
                                                                <div>Topic: {test.topic.toUpperCase()}</div>
                                                            </div>
                                                            <div className=''>
                                                                <div>Due Date: {test.testDueDate}</div>
                                                            </div>
                                                        </div>
                                                        <hr className='w-full bg-black hidden group-hover:block h-1' />
                                                        <div className='hidden group-hover:flex justify-center items-center flex-col gap-5'>
                                                            <div className='text-center hidden md:block'>
                                                                <div className='text-xl font-bold'>Description</div>
                                                                <div>{test.description}</div>
                                                            </div>
                                                            <button onClick={() => { startTestOnClick(test.type, test._id) }} className='px-5 py-2 bg-gradient-to-b from-green-600 to-green-800 rounded-md hover:bg-gradient-to-t text-white font-bold flex justify-center items-center gap-2'><FaGooglePlay className='text-xl' /><p className='hidden sm:block'>Start Test</p></button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            :
                                            <div className='text-xl text-white'>No tests created</div>
                                    }
                                </div>
                            }
                            {
                                activeTab === 'ongoing' &&
                                <div className="w-full text-black mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                                    {
                                        filteredOngoingTests.length !== 0
                                            ?
                                            filteredOngoingTests.map((result, resultNo) => {
                                                if (result.status === 'In-Progress')
                                                    return (
                                                        <div key={result + " " + resultNo} className='card w-full bg-white h-full p-4 rounded-lg flex flex-col justify-center items-start gap-3 transition-all duration-500 hover:scale-105 cursor-pointer' title={`result_id: ${result._id}\ntest_id: ${result.testId}`}>
                                                            <p className='text-3xl font-bold'>{result.title}</p>
                                                            <p className='text-lg'>Topic: {result.topic}</p>
                                                            <p className='text-lg'>Type: {result.type}</p>
                                                            <p className='text-md text-red-600'>Due Date: {result.end_time}</p>
                                                            <ProgressBar width={(result.currentChallengeNo) / result.totalActualChallenges * 100} />
                                                            <Link to={`/user/editor/${result._id}`} className='w-full p-2 flex justify-center items-center text-[gold] bg-black font-bold rounded-lg'>Resume</Link>
                                                        </div>
                                                    )
                                            })
                                            :
                                            <div className='text-xl text-white'>No tests created</div>
                                    }
                                </div>
                            }
                            {
                                activeTab === 'complete' &&
                                <div className="w-full text-black mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                                    {
                                        filteredCompleteTests.length !== 0
                                            ?
                                            filteredCompleteTests.map((result, resultNo) => {
                                                if (result.status !== 'In-Progress')
                                                    return (
                                                        <div key={result + " " + resultNo} className={`card w-full  ${result.status === 'Passed' ? 'bg-green-600' : 'bg-red-600'} h-full p-4 rounded-lg flex flex-col justify-center items-start gap-3 transition-all duration-500 hover:scale-105 cursor-pointer`} title={`result_id: ${result._id}\ntest_id: ${result.testId}`}>
                                                            <p className='text-3xl font-bold'>{result.title}</p>
                                                            <p className='text-lg'>Topic: {result.topic}</p>
                                                            <p className='text-lg'>Type: {result.type}</p>
                                                            <Link to={`/user/editor/${result._id}`} className={`w-full p-2 flex justify-center items-center text-[gold] bg-black font-bold rounded-lg`}>View Result</Link>
                                                        </div>
                                                    )
                                            })
                                            :
                                            <div className='text-xl text-white'>No tests created</div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
