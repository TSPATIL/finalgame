import React, { useEffect, useRef, useState } from 'react'
import EditorInput from './EditorInput'
import { AiOutlineMenu } from "react-icons/ai"
import { MdFullscreen } from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useStopwatch } from 'react-timer-hook';
import Confetti from 'react-confetti';
import LoginModal from './LoginModal';
import { useSelector } from 'react-redux';
import { selectIsLogin } from '../Redux/features/Authentication/AuthenticationSlice';

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

export default function GameEditor() {

    // useEffect(() => {
    //     const confetti = confettiRef.current;
    //     const context = confetti.getContext('2d');
    // }, []);

    var elem = document.getElementById('GameWditor');

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

    const [attempts, setAttempts] = useState(3);

    const handleAttemptsZero = () => {
        setAttempts(0)
        alert('Attempts finished');
        pauseTime();
    }

    const [menu, setMenu] = useState(false);

    const handleMenu = () => {
        setMenu(!menu);
    }

    const [isConfettiVisible, setIsConfettiVisible] = useState(false);
    const handleSubmit = (e)=>{
        // const confetti = confettiRef.current;
        // const context = confetti.getContext('2d');
        setIsConfettiVisible(true);
        setTimeout(() => setIsConfettiVisible(false), 5000);
    }

    const [btn, setBtn] = useState(true);
    
    const isLogin = useSelector(selectIsLogin)
    return (
        <div>
        <div ref={appRef} id='GameEditor' className='GameEditor bg-gray-900 overflow-hidden'>
            {isConfettiVisible && <Confetti className='' numberOfPieces={500} />}
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
                        <div className='text-lg -top-3 mr-2'>Attempts Left:</div>
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
                                <MdFullscreen onClick={enterFullScreen} className={`cursor-pointer w-fit text-3xl sm:text-4xl text-gold bg-white p-1 rounded-md font-bold`} />
                                :
                                <MdFullscreenExit onClick={exitFullScreen} className={`cursor-pointer w-fit text-3xl sm:text-4xl text-gold bg-white p-1 rounded-md font-bold`} />
                        }
                    </div>
                </div>
            </div>
            <div className='lg:flex w-full h-full lg:h-[90vh] justify-center items-center'>
                <div className='w-full lg:w-1/2 h-full flex justify-center items-center flex-col'>
                    <div className='w-full h-[400px] lg:h-3/5 flex justify-center items-center px-2 p-1'>
                        <iframe className='w-full h-full border-[1px] rounder-md border-white' src="https://www.youtube.com/embed/NthGfn_ddRQ?autoplay=1&controls=0&loop=1" title="YouTube video player" autoPlay frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                    <div className='w-full min-h-[200px] lg:h-2/5 flex justify-center items-center px-2 py-1'>
                        <div className='flex justify-between items-center flex-col w-full h-full border-[1px] border-white rounded-lg'>
                            <div className='options h-1/6 w-full flex justify-start items-center font-bold px-3 rounded-tr-lg rounded-tl-lg bg-gray-800 text-white border-b-[1px] border-white'>
                                <div onClick={() => { setBtn(true) }} className='px-3 py-2 bg-blue-700 hover:bg-blue-800 cursor-pointer'>Challenge</div>
                                <div onClick={() => { setBtn(false) }} className='px-3 py-2 bg-blue-700 hover:bg-blue-800 cursor-pointer'>Recommendation</div>
                            </div>
                            <div className='h-5/6 w-full bg-gray-800 text-gray-300  rounded-bl-lg rounded-br-lg'>
                                {
                                    btn ?
                                        <div className='h-full w-full p-2 overflow-y-auto space-y-1 text-justify'>
                                            <p className='text-xl font-bold'>Challenge No: <span className='text-base text-gray-400'>1</span></p>
                                            <p className='text-xl font-bold'>Title: <span className='text-base text-gray-400'>Let's Begin</span></p>
                                            <p className='text-xl font-bold'>Description: <span className='text-base text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum reprehenderit ad itaque consequuntur cupiditate laborum quae tenetur ducimus suscipit possimus ratione maxime voluptate minima autem repellendus vitae provident, sint soluta obcaecati? Laborum eveniet commodi distinctio quod ea voluptatem tenetur accusamus.</span></p>
                                            <p className='text-xl font-bold'>Scenario: <span className='text-base text-gray-400'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam, necessitatibus autem expedita recusandae dignissimos eum tenetur excepturi dolor minus maiores?</span></p>
                                        </div>
                                        :
                                        <div className='h-full w-full p-2 overflow-y-auto space-y-1 text-justify'>
                                            <p className="text-xl font bold">Concepts: <span className="text-base text-gray-400">SQL JOIN, SELECT</span></p>
                                            <p className="text-base font bold">We recommend you to solve the problem with above concepts.</p>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full lg:w-1/2 h-full flex justify-center items-center flex-col'>
                    <div className='w-full h-[400px] lg:h-3/5 flex justify-center items-center px-2 py-1'>
                        <div className='w-full h-full bg-gray-800 overflow-auto border-[1px] rounded-lg border-white p-2'>
                            <div className='text-lg text-white'>
                                <p>Select * from Country;</p>
                                <table className='mb-3 border-2 border-white'>
                                    <tbody>
                                        <tr className='border-2 border-white'>
                                            <th  className='border-r-2 border-white'>Company</th>
                                            <th  className='border-r-2 border-white'>Contact</th>
                                            <th>Country</th>
                                        </tr>
                                        <tr className='border-2 border-white'>
                                            <td className='border-r-2 border-white'>Alfreds Futterkiste</td>
                                            <td className='border-r-2 border-white'>Maria Anders</td>
                                            <td>Germany</td>
                                        </tr>
                                        <tr  className='border-2 border-white'>
                                            <td className='border-r-2 border-white'>Centro comercial Moctezuma</td>
                                            <td className='border-r-2 border-white'>Francisco Chang</td>
                                            <td>Mexico</td>
                                        </tr>
                                    </tbody>
                                </table>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis sed iusto nesciunt ab architecto omnis accusamus earum asperiores deleniti accusantium veniam nulla repudiandae consectetur modi rem aut voluptatibus, minus dignissimos tenetur! Possimus repudiandae voluptates ex minima quisquam cupiditate aliquid ab ipsum quam dolor eum ducimus aliquam a iusto, at reiciendis quos illum repellat voluptatem necessitatibus incidunt veritatis numquam. Harum aliquid assumenda voluptate, maiores exercitationem quaerat temporibus dolorem libero ipsa molestias quos dignissimos magni est amet, quae quod? Saepe, ex libero.
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-[100px] lg:h-1/5 lg:hidden flex justify-center items-center gap-2 px-2 py-1'>
                        <div className='cursor-pointer flex justify-center items-center top-5 w-fit h-fit text-4xl text-black bg-white py-1 px-2 rounded-lg'>
                            <div className='text-lg -top-3 mr-2'>Time:</div>
                            <MyStopwatch />
                        </div>
                        <div className='cursor-pointer flex justify-center items-center top-5 w-fit h-fit text-4xl text-black bg-white py-1 px-2 rounded-lg'>
                            <div className='text-lg -top-3 mr-2'>Attempts Left:</div>
                            <div>2</div>
                        </div>
                    </div>
                    <div className='w-full h-2/5 flex justify-center items-center px-2 py-1'>
                        <EditorInput handleSubmit={handleSubmit} startTime={startTime} pauseTime={pauseTime} resetTime={resetTime} setAttempts={setAttempts} attempts={attempts} handleAttemptsZero={handleAttemptsZero} />
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
        {!isLogin && <LoginModal/>}
        </div>
    )
}
