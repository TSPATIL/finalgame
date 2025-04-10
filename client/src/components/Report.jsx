import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { showAlert } from '../Redux/features/Alerts/AlertSlice';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FaHome } from 'react-icons/fa';
import FeedbackModal from './FeedbackModal';
import { selectIsLogin } from '../Redux/features/Authentication/AuthenticationSlice';
import LoginModal from './LoginModal';
const Footer = lazy(()=>import("./Footer"));

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default function Report() {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [timeTaken, setTimeTaken] = useState([]);
    const [attemptsTaken, setAttemptsTaken] = useState([]);
    const [difficulty, setDifficulty] = useState([]);
    const [labels, setLabels] = useState([]);

    const dispatch = useDispatch();
    
      const isLogin = useSelector(selectIsLogin);

      const [feedbackModal,setFeedbackModal] = useState(false)
    useEffect(() => {
        async function fetchReport() {
            try {
                let response = await fetch(`http://localhost:5000/api/feedback/get-feedback-by-resultId/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                let result = await response.json();
                console.log(result)
                if(!result.status){
                    setFeedbackModal(true)
                }
                response = await fetch(`http://localhost:5000/api/report/get-report/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                result = await response.json();
                if (result.status) {
                    setReport(result.data);
                    dispatch(showAlert({ message: result.message, type: "success" }));
                    console.log(result.data)
                    const challenges = result?.data?.challengesProgress || [];
                    setAttemptsTaken(challenges.map(challenge => challenge.attempts));
                    setDifficulty(challenges.map(challenge => challenge.difficulty));
                    setLabels(challenges.map((_, index) => `Q${index + 1}`));
                    setTimeTaken(challenges.map(challenge => challenge.timeTaken / 1000));
                } else {
                    dispatch(showAlert({ message: result.message, type: "error" }))
                }
            } catch (error) {
                console.error(error);
                dispatch(showAlert({ message: "Error occured", type: "error" }))
            }
        }
        if(isLogin)
            fetchReport();
    }, [id, dispatch]);

    
    if(!isLogin){
        return <LoginModal/>
      }
    if(feedbackModal){
        return <FeedbackModal setFeedbackModal={setFeedbackModal} resultId = {id}/>
      }

    return (
        <div className='Report'>
            <div className='w-full bg-gray-800 flex justify-end items-center pt-20 pb-5 px-28'>
                <Link to="/" className='w-fit border-2 border-solid border-[gold] px-5 md:px-7 py-3 text-md md:text-xl font-bold rounded-full flex justify-center items-center gap-3 text-white'>
                    <FaHome />
                    <span>Home</span>
                </Link>
            </div>
            <div className="bg-gray-800 text-white w-full min-h-screen flex items-around justify-start flex-col py-10 px-10 md:px-28">
                <h1 className='text-5xl font-bold text-center'>View Result</h1>
                <div className='w-full mt-5'>
                    <div className='details mt-5 text-xl'>
                        <p className='text-2xl sm:text-3xl md:text-6xl text-left md:text-center'>{report?.name}</p>
                        <div className='grid grid-cols-1 xl:grid-cols-4 justify-items-start xl:justify-items-center gap-5 mt-7 md:mt-10 md:text-xl'>
                            <p>Title: {report?.title}</p>
                            <p>Topic: {report?.topic.toUpperCase()}</p>
                            <p>Test Type: {report?.type}</p>
                            <p>Test status: {report?.status}</p>
                        </div>
                        <div className='grid grid-cols-1 justify-items-start xl:justify-items-center xl:grid-cols-2 gap-5 md:text-xl mt-5'>
                            <p>Start Date of test: {new Date(report?.start_time).toLocaleString()}</p>
                            <p>End Date of test: {new Date(report?.end_time).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                <div className='my-10 flex justify-center items-center flex-col lg:flex-row w-full gap-10'>
                    <div className='w-full lg:w-1/2 space-y-5'>
                        <p className='text-2xl text-center'>Times Taken per question</p>
                        <Bar
                            className='bg-white'
                            style={{ width: '600px', height: '300px' }}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: 'Time Taken per question',
                                    },
                                },
                            }}
                            data={{
                                labels,
                                datasets: [{
                                    label: 'Time Taken',
                                    data: timeTaken,
                                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                }]
                            }}
                        />
                    </div>
                    <div className="w-full lg:w-1/2 space-y-5">
                        <p className='text-2xl text-center'>Attempts per question</p>
                        <Bar
                            className='bg-white'
                            style={{ width: '600px' }}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: 'Attempts per questtion',
                                    },
                                },
                            }}
                            data={{
                                labels,
                                datasets: [{
                                    label: 'Attempts Taken',
                                    data: attemptsTaken,
                                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                }]
                            }}
                        />
                    </div>
                </div>
                <div className='my-5 text-2xl'>
                    <p>User Performance Overview:</p>
                    <p className='text-xl text-gray-300 text-justify'>{report?.performance || 'No overview'}</p>
                </div>
                <div className='my-5 text-2xl'>
                    <p>Areas of Improvement:</p>
                    <p className='text-xl text-gray-300 text-justify'>{report?.improvement || 'No improvements'}</p>
                </div>
                <div className='w-full flex justify-center items-center gap-5'>
                    <a href={`http://localhost:5000/api/report/get-reportfile/${report?.file}`} download className='bg-gradient-to-b w-full flex justify-center items-center md:w-fit hover:bg-gradient-to-t px-10 py-3 text-xl from-blue-700 to-blue-800 rounded-md hover:scale-105 transition-all duration-200'>Download Report</a>
                    <a href={`http://localhost:5000/api/report/get-certificatefile/${report?.certificate}`} download className='bg-gradient-to-b w-full flex justify-center items-center md:w-fit hover:bg-gradient-to-t px-10 py-3 text-xl from-blue-700 to-blue-800 rounded-md hover:scale-105 transition-all duration-200'>Download Certificate</a>
                </div>
            </div>
            <Suspense  fallback={<div>Component is loading please wait...</div>}><Footer/></Suspense>
        </div>
    )
}
