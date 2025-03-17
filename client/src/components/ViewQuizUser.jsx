import React from 'react'
import { FaGooglePlay } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

import {
    Link
} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showAlert } from '../Redux/features/Alerts/AlertSlice';

export default function ViewQuizUser() {
    const [tests, setTests] = useState([]);
    const [filteredTests, setFilteredTests] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchTests() {
            try {
                const response = await fetch("http://localhost:5000/api/test/get-all-test", {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                });
                const result = await response.json();
                if (result.status) {
                    setTests(result.data);
                    setFilteredTests(result.data);
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
    }, [])


    const handleSearch = async (e) => {
        e.preventDefault();
        setFilteredTests(tests.filter(test =>
            test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.visibility.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.testDueDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
            test.type.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    }
    return (
        <div className='ViewQuizUser'>
            <div className="bg-gray-800 w-full min-h-screen flex items-center justify-center flex-col pt-28 pb-10 md:pt-16 md:pb-16">
                <div className='w-5/6 flex justify-end items-center'>
                    <Link to="/" className='w-fit border-2 border-solid border-[gold] px-7 py-3 text-xl font-bold rounded-full flex justify-center items-center gap-3 text-white'>
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
                        <div className='w-full h-full grid grid-cols-1 mt-5'>
                            <p className='text-2xl text-white font-bold'>Results</p>
                            <div className="w-full text-black mt-5 grid grid-cols-1 gap-7">
                                {
                                    filteredTests.length !== 0
                                        ?
                                        filteredTests.map((test, testNo) => {
                                            return (
                                                <div key={test + "" + testNo} className='w-full group h-full text-white flex items-center justify-center flex-col border-2 border-solid border-[gold] p-3 gap-3 text-lg'>
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
                                                            <div>Access: {test.visibility}</div>
                                                        </div>
                                                        <div className=''>
                                                            <div>Due Date: {test.testDueDate}</div>
                                                        </div>
                                                    </div>
                                                    <hr className='w-full bg-white hidden group-hover:block' />
                                                    <div className='hidden group-hover:flex justify-center items-center flex-col gap-5'>
                                                        <div className='text-center hidden md:block'>
                                                            <div className='text-xl font-bold'>Description</div>
                                                            <div>{test.description}</div>
                                                        </div>
                                                        <Link to={`/user/editor/${test._id}`} className='px-5 py-2 bg-gradient-to-b from-blue-700 to-blue-900 rounded-md hover:bg-gradient-to-t text-white font-bold flex justify-center items-center gap-2'><FaGooglePlay className='text-xl' /><p className='hidden sm:block'>Give Test</p></Link>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        :
                                        <div className='text-xl text-white'>No tests created</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
