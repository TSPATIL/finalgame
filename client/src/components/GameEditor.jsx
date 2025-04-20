import React, { useEffect, useRef, useState } from 'react'
import EditorInput from './EditorInput'
import { AiOutlineMenu } from "react-icons/ai"
import { MdFullscreen } from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useStopwatch } from 'react-timer-hook';
import Confetti from 'react-confetti';
import LoginModal from './LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLogin } from '../Redux/features/Authentication/AuthenticationSlice';
import { useParams } from 'react-router-dom';
import { showAlert } from '../Redux/features/Alerts/AlertSlice';
import ExitModal from './ExitModal';

function MyStopwatch() {
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: true });

    return (
        <div>
            <div>
                <span>{minutes}</span>:<span>{seconds}</span>
            </div>
            {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}
            <button id='start' className='hidden' onClick={start}>Start</button>
            <button id='pause' className='hidden' onClick={pause}>Pause</button>
            <button id='reset' className='hidden' onClick={reset}>Reset</button>
        </div>
    );
}

function FullScreenModal({enterFullScreen}) {
    return (
        <div className='FullScreenModal'>
            <div className='fixed top-0 h-screen w-screen bg-white opacity-20'></div>
            <div className='login-modal'>
                <div className='h-[300px] md:w-[600px] w-11/12 fixed top-0 bottom-0 left-0 right-0 m-auto rounded-xl shadow-lg shadow-slate-800 bg-white flex justify-center items-center'>
                    <div className='flex justify-center items-center flex-col gap-8'>
                        <p className='text-2xl'>Your are not In-full-screen Mode</p>
                        <li className='list-none text-xl hover:scale-105 hover:shadow-lg hover:shadow-black transition duration-300'><button onClick={enterFullScreen} className='px-10 py-3 bg-black text-white rounded-md' >Full-Screen</button></li>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function GameEditor() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [challenge, setChallenge] = useState({ challengeNo: 0, title: '', previousStory: '', preImage: '', postStory: '', postImage: '', question: '', answer: '', difficulty: '', constraints: '', keywords: '', example: [{ question: '', answer: '', explanation: '' }], teachings: { topic: '', explanation: '' } });
    const [codeExecutionHistory, setCodeExecutionHistory] = useState([]);
    const [attempts, setAttempts] = useState(0);
    const [showPostStory, setShowPostStory] = useState(false);
    const [isTestEnd, setIsTestEnd] = useState(false);
    useEffect(() => {
        const fetchCurrentChallenge = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/api/test/get-current-challenge/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
                const result = await response.json();
                if (result.status) {
                    if (result.message === "You have successfully completed the test.") {
                        setIsConfettiVisible(true);
                        setTimeout(() => setIsConfettiVisible(false), 5000);
                        dispatch(showAlert({ message: result.message, type: "success" }))
                        setIsTestEnd(true);
                        return;
                    }
                    setChallenge({
                        challengeNo: result.data.challengeNo,
                        title: result.data.title || '',
                        previousStory: result.data.previousStory.story || '',
                        preImage: result.data.previousStory.image,
                        postStory: result.data.postStory.story || '',
                        postImage: result.data.postStory.image,
                        question: result.data.question || '',
                        answer: '',
                        difficulty: result.data.difficulty || '',
                        constraints: result.data.constraints || '',
                        keywords: result.data.keywords || '',
                        teachings: {
                            topic: result.data.teachings.topic || '',
                            explanation: result.data.teachings.explanation || ''
                        },
                        example: result.data.example?.map((ex) => {
                            return {
                                question: ex.question || '',
                                answer: ex.answer || '',
                                explanation: ex.explanation || ''
                            }
                        }) || []
                    });
                    setCodeExecutionHistory(result.data.codeExecutionHistory);
                    setAttempts(result.data.attempts || 0);
                    setShowPostStory(false);
                    dispatch(showAlert({ message: result.message, type: "success" }))
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
        fetchCurrentChallenge();
    }, [challenge.challengeNo]);

    // var elem = document.getElementById('GameWditor');

    const appRef = useRef(null);

    const [fullScreen, setFullScreen] = useState(false);

    const enterFullScreen = () => {
        if (appRef.current) {
            if (appRef.current.requestFullscreen) {
                appRef.current.requestFullscreen();
            } else if (appRef.current.mozRequestFullScreen) { // Firefox
                appRef.current.mozRequestFullScreen();
            } else if (appRef.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
                appRef.current.webkitRequestFullscreen();
            } else if (appRef.current.msRequestFullscreen) { // IE/Edge
                appRef.current.msRequestFullscreen();
            }
            setFullScreen(true);
        }
    };

    const exitFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
        setFullScreen(false);
    };


    const startTime = () => {
        document.getElementById('start').click();
    }
    const pauseTime = () => {
        document.getElementById('pause').click();
    }
    const resetTime = () => {
        document.getElementById('reset').click();
    }

    const [menu, setMenu] = useState(false);

    const handleMenu = () => {
        setMenu(!menu);
    }

    const [isConfettiVisible, setIsConfettiVisible] = useState(false);
    const handleSubmit = async (e) => {
        if (confirm('Are you sure to submit the code')) {
            try {
                const response = await fetch(`${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/api/test/submit-challenge/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ question: challenge.question, answer: challenge.answer, difficulty: challenge.difficulty, constraints: challenge.constraints, keywords: challenge.keywords }),
                    credentials: "include"
                })
                const result = await response.json();
                if (result.status) {
                    if (result.error) {
                        console.log(result.error)
                        dispatch(showAlert({ message: result.message, type: "error" }))
                    }
                    else {
                        dispatch(showAlert({ message: result.message, type: "success" }))
                        setShowPostStory(true);
                        setIsConfettiVisible(true);
                        setTimeout(() => setIsConfettiVisible(false), 5000);
                    }
                }
                else {
                    console.log(result.error)
                    dispatch(showAlert({ message: "Error occured while test details fetched", type: "error" }))
                }
            } catch (error) {
                console.log(error)
                dispatch(showAlert({ message: "Error occured while test details fetched", type: "error" }))
            }
        }
    }

    const codeViewRef = useRef();
    useEffect(() => {
        if (codeViewRef.current) {
            codeViewRef.current.scrollTop = codeViewRef.current.scrollHeight;
        }
    }, [codeExecutionHistory]);

    const handleOnChange = (value) => {
        setChallenge({ ...challenge, ['answer']: value });
    }

    const handleOnClickNextChallenge = () => {
        setChallenge({ ...challenge, ['challengeNo']: challenge.challengeNo + 1 });
    }

    const [btn, setBtn] = useState(0);

    const isLogin = useSelector(selectIsLogin)
    return (
        <div className='GameEditor'>
            <div ref={appRef} id='GameEditor' className='GameEditor bg-gray-900 overflow-hidden'>
                {isConfettiVisible && <Confetti className='w-full' numberOfPieces={500} />}
                <div className='menu h-[80px] w-full flex justify-between items-center px-6'>
                    <div className='flex justify-center items-center w-fit'>
                        <div className="bg-gradient-to-b from-yellow-400 to-yellow-700 bg-clip-text text-transparent w-fit drop-shadow-2xl font-medium text-gray-300 text-[27px] sm:text-[40px] tracking-[0] leading-[normal] whitespace-nowrap shadow-drop-shadow-100">
                            Qᵘᵉʳʸ ᶜʳᵃᶠᵗ
                        </div>
                        <div className="w-[150px] relative -left-16 top-4 sm:-left-28 sm:top-5 bg-gradient-to-b from-yellow-300 to-yellow-700 bg-clip-text text-transparent text-[8px] sm:text-[12px] font-bold tracking-[0] leading-[normal]">
                            The Hogwarts Enigma
                        </div>
                    </div>
                    <div className='absolute cursor-pointer left-0 right-0 mx-auto lg:flex hidden justify-center items-center gap-2 top-5 w-fit h-fit text-4xl text-black py-1 px-2 rounded-lg'>
                        <div className='cursor-pointer flex justify-center items-center top-5 w-fit h-fit text-4xl text-black bg-white py-1 px-2 rounded-lg'>
                            <div className='text-lg -top-3 mr-2'>Time:</div>
                            <MyStopwatch />
                        </div>
                        <div className='cursor-pointer flex justify-center items-center top-5 w-fit h-fit text-4xl text-black bg-white py-1 px-2 rounded-lg'>
                            <div className='text-lg -top-3 mr-2'>Attempts Taken:</div>
                            <div>{attempts}</div>
                        </div>
                    </div>
                    <div className='w-fit flex justify-end items-center gap-1'>
                        <div>
                            {
                                !menu
                                    ?
                                    <AiOutlineMenu onClick={handleMenu} className='cursor-pointer w-fit text-3xl sm:text-4xl text-gold bg-white p-1 rounded-md font-bold' />
                                    :
                                    <IoMdClose onClick={handleMenu} className='cursor-pointer w-fit text-3xl sm:text-4xl text-gold bg-white p-1 rounded-md font-bold' />
                            }
                        </div>
                        <div>
                            {
                                !fullScreen
                                    ?
                                    <MdFullscreen onClick={enterFullScreen} id='onfullscreen' className={`cursor-pointer w-fit text-3xl sm:text-4xl text-gold bg-white p-1 rounded-md font-bold`} />
                                    :
                                    <MdFullscreenExit onClick={exitFullScreen} id='offfullscreen' className={`cursor-pointer w-fit text-3xl sm:text-4xl text-gold bg-white p-1 rounded-md font-bold`} />
                            }
                        </div>
                    </div>
                </div>
                <div className='lg:flex w-full h-full lg:h-[90vh] justify-center items-center'>
                    <div className='w-full lg:w-1/2 h-full flex justify-center items-center flex-col'>
                        <div className='w-full h-[400px] lg:h-3/5 flex justify-center items-center px-2 p-1'>
                            <img loading='lazy' className='w-full h-full border-[1px] rounder-md border-white' src={`${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/api/test/image/${!showPostStory ? challenge.preImage : challenge.postImage}`} title="YouTube video player" autoPlay frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></img>
                        </div>
                        <div className='w-full min-h-[200px] lg:h-2/5 flex justify-center items-center px-2 py-1'>
                            <div className='flex justify-between items-center flex-col w-full h-full border-[1px] border-white rounded-lg'>
                                <div className='options h-1/6 w-full flex justify-start items-center font-bold rounded-tr-lg rounded-tl-lg bg-gray-800 text-white border-b-[1px] border-white text-lg'>
                                    <div onClick={() => { setBtn(0) }} className='px-3 py-2 h-full bg-blue-700 rounded-tl-lg hover:bg-blue-800 cursor-pointer flex justify-center items-center'>Challenge</div>
                                    <div onClick={() => { setBtn(1) }} className='px-3 py-2 h-full bg-blue-700 hover:bg-blue-800 cursor-pointer flex justify-center items-center'>Recommendation</div>
                                    <div onClick={() => { setBtn(2) }} className='px-3 py-2 h-full bg-blue-700 hover:bg-blue-800 cursor-pointer flex justify-center items-center'>Teachings</div>
                                </div>
                                <div className='h-5/6 w-full bg-gray-800 text-gray-300  rounded-bl-lg rounded-br-lg'>
                                    {
                                        btn === 0 ?
                                            (
                                                <div className='h-full w-full p-2 overflow-y-auto space-y-1 text-justify text-[gold]'>
                                                    <p className='text-xl font-bold'>Challenge No: <span className='text-lg text-white font-normal'>{challenge.challengeNo + 1}</span></p>
                                                    <p className='text-xl font-bold'>Title: <span className='text-lg text-white font-normal'>{challenge.title}</span></p>
                                                    {
                                                        !showPostStory
                                                            ?
                                                            <div>
                                                                <p className='text-xl font-bold'>Description:</p>
                                                                <p className='text-lg text-white font-normal'>{challenge.previousStory}</p>
                                                                <p className='text-xl font-bold'>Scenario:</p>
                                                                <p className='text-lg text-white font-normal'>{challenge.question}</p>
                                                                <div className='text-xl font-bold'>
                                                                    <p>Constraints:</p>
                                                                    {
                                                                        challenge.constraints
                                                                            ?
                                                                            challenge.constraints.split(", ").map((constraint, index) => {
                                                                                return (
                                                                                    <p className='text-lg text-white font-normal'>{index + ". " + constraint}</p>
                                                                                )
                                                                            })
                                                                            :
                                                                            <span className='text-lg text-white font-normal'>'None'</span>
                                                                    }
                                                                </div>
                                                            </div>
                                                            :
                                                            <div>
                                                                <p className='text-xl font-bold'>Description:</p>
                                                                <p className='text-lg text-white font-normal'>{challenge.postStory}</p>
                                                            </div>
                                                    }
                                                </div>
                                            )
                                            :
                                            (
                                                btn === 1 ?
                                                    (<div className='h-full w-full p-2 overflow-y-auto space-y-1 text-justify text-[gold]'>
                                                        <div className='text-xl font-bold'>
                                                            <p>Concepts:</p>
                                                            {
                                                                challenge.keywords
                                                                    ?
                                                                    challenge.keywords.split(", ").map((keyword, index) => {
                                                                        return (
                                                                            <p key={index + " " + keyword} className='text-lg text-white font-normal'>{(index + 1) + ". " + keyword.toLowerCase()}</p>
                                                                        )
                                                                    })
                                                                    :
                                                                    <span className='text-lg text-white font-normal'>'None'</span>
                                                            }
                                                        </div>
                                                        <p className="text-lg text-white font bold">We recommend you to solve the problem with above concepts.</p>
                                                    </div>)
                                                    :
                                                    (<div className='h-full w-full p-2 overflow-y-auto space-y-1 text-justify text-[gold]'>
                                                        <p className='text-xl font-bold'>Topic:</p>
                                                        <p className='text-lg text-white font-normal'>{challenge.teachings.topic}</p>
                                                        <p className='text-xl font-bold'>Explanation:</p>
                                                        <p className='text-lg text-white font-normal'>{challenge.teachings.explanation}</p>
                                                    </div>
                                                    )
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full lg:w-1/2 h-full flex justify-center items-center flex-col'>
                        <div className='w-full h-[400px] lg:h-3/5 flex justify-center items-center px-2 py-1'>
                            <div className='w-full h-full bg-gray-800 overflow-auto border-[1px] rounded-lg border-white p-2'>
                                <div ref={codeViewRef} className='text-lg'>
                                    {codeExecutionHistory.map((obj, index) => {
                                        return (
                                            <div key={obj + " " + index} className={`flex flex-col text-justify justify-center items-start border-b-2 border-white ${obj.executor === 'user' ? 'pl-20 text-green-400' : 'pr-20 text-yellow-400'}`}>
                                                <p>code: </p>
                                                <div>{obj.code}</div>
                                                <p>output:</p>
                                                <div>
                                                    {
                                                        obj?.output && Array.isArray(JSON.parse(obj?.output)) && obj?.output.length > 0
                                                            ?
                                                            <table className='mb-3 border-2 border-white text-center'>
                                                                <thead>
                                                                    <tr>
                                                                        {
                                                                            Object.keys(JSON.parse(obj?.output)[0] || {}).map(key => {
                                                                                return <td key={key} className='border-r-2 border-white p-1'>{key}</td>
                                                                            })
                                                                        }
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {JSON.parse(obj.output).map((row, ind) => {
                                                                        return (
                                                                            <tr key={row + " " + ind} className='border-2 border-white'>
                                                                                {
                                                                                    Object.keys(row).map(key => {
                                                                                        return <td key={key} className='border-r-2 border-white p-1'>{row[key] || 'null'}</td>;
                                                                                    })
                                                                                }
                                                                            </tr>
                                                                        )
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                            :
                                                            <div>{obj.output}</div>
                                                    }
                                                </div>
                                                <div>message: {obj.message}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-[100px] lg:h-1/5 lg:hidden flex justify-center items-center gap-2 px-2 py-1'>
                            <div className='cursor-pointer flex justify-center items-center top-5 w-fit h-fit text-4xl text-black bg-white py-1 px-2 rounded-lg'>
                                <div className='text-lg -top-3 mr-2'>Time:</div>
                                <MyStopwatch />
                            </div>
                            <div className='cursor-pointer flex justify-center items-center top-5 w-fit h-fit text-4xl text-black bg-white py-1 px-2 rounded-lg'>
                                <div className='text-lg -top-3 mr-2'>Attempts Taken:</div>
                                <div>{attempts}</div>
                            </div>
                        </div>
                        <div className='w-full h-2/5 flex justify-center items-center px-2 py-1'>
                            <EditorInput handleSubmit={handleSubmit} startTime={startTime} answer={challenge.answer} handleOnChange={handleOnChange} pauseTime={pauseTime} resetTime={resetTime} setAttempts={setAttempts} attempts={attempts} showPostStory={showPostStory} handleOnClickNextChallenge={handleOnClickNextChallenge} />
                        </div>
                    </div>
                </div>
                <div className={`${!menu ? 'hidden' : 'flex'} h-full w-full absolute top-0 left-0 overflow-hidden`}>
                    <div className='relative w-full h-full opacity-50 bg-black left-0 right-0 z-10'>

                    </div>
                    <div className='absolute w-full sm:w-[300px] bg-white h-full opacity-100 top-0 right-0 z-20 p-3'>
                        <div className='flex justify-between items-center px-3'>
                            <p className='text-xl'>Menu</p>
                            <IoMdClose onClick={handleMenu} className='cursor-pointer w-fit text-3xl sm:text-4xl text-gold bg-black text-white p-1 rounded-md font-bold mb-2' />
                        </div>
                        <div className='p-3 border-t-2 border-gray-900'>
                            <ul className='text-xl space-y-2 '>
                                <li><a href="/">Home</a></li>
                                <li><a href="/">Resume/Pause</a></li>
                                <li><a href="/">Settings</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {!isLogin && <LoginModal />}
            {isTestEnd && <ExitModal />}
            {!fullScreen && <FullScreenModal enterFullScreen={enterFullScreen}/>}
        </div>
    )
}
