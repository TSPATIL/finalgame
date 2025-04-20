import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";
import { showAlert } from '../Redux/features/Alerts/AlertSlice';
import { useDispatch } from 'react-redux';

export default function FeedbackModal({ setFeedbackModal, resultId }) {
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/api/feedback/add-feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ feedback, resultId }),
                credentials: 'include'
            });
            const result = await response.json();
            if (result.status) {
                dispatch(showAlert({ message: result.message, type: "success" }));
                setFeedbackModal(false);
            }
            else {
                dispatch(showAlert({ message: result.message, type: "error" }));
                setFeedbackModal(true);
            }
        } catch (error) {
            console.error(error);
            dispatch(showAlert({ message: "Error occured", type: "error" }));
            setFeedbackModal(true);
        }
    }

    const [feedback, setFeedback] = useState([
        {
            section: 'Quality of Game (Usability)',
            type: 'array',
            Questions: [
                {
                    question: 'The game design is attractive (interface, graphics, cards, boards, etc.).',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'The text font and colors are well blended and consistent.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'I needed to learn a few things before I could play the game.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'Learning to play this game was easy for me.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'I think that most people would learn to play this game very quickly.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'I think that the game is easy to play.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'The game rules are clear and easy to understand.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'The fonts (size and style) used in the game are easy to read.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'The colors used in the game are meaningful.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'The game allows customizing the appearance (font and/or color) according to my preferences.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'When I make a mistake, it is easy to recover from it quickly.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'When I first looked at the game, I had the impression that it would be easy for me.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'The contents and structure helped me to become confident that I would learn with this game.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'This game is appropriately challenging for me.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'The game provides new challenges (offers new obstacles, situations or variations) at an appropriate pace.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'The game does not become monotonous as it progresses (repetitive or boring tasks).',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'Completing the game tasks gave me a satisfying feeling of accomplishment.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'It is due to my personal effort that I managed to advance in the game.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'I feel satisfied with the things that I learned from the game.',
                    type: 'rate',
                    ratings: 1
                }
            ]
        },
        {
            section: 'Quality of Game (Player Experience)',
            type: 'array',
            Questions: [
                {
                    question: 'I would recommend this game to my colleagues.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'I was able to interact with other players during the game.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'The game promotes cooperation and/or competition among the players.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'I felt good interacting with other players during the game.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'I had fun with the game.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'Something happened during the game (game elements, competition, etc.) which made me smile.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'There was something interesting at the beginning of the game that captured my attention.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'I was so involved in my gaming task that I lost track of time.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'I forgot about my immediate surroundings while playing this game.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'The game contents are relevant to my interests.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'It is clear to me how the contents of the game are related to the course.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'This game is an adequate teaching method for this course.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'I prefer learning with this game to learning through other ways (e.g. other teaching methods).',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'The game contributed to my learning in this course.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'The game allowed for efficient learning compared with other activities in the course.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'The game helped me comprehend new SQL statements.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'The game helped me to comprehend better SQL statements that I already knew.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'While playing I devoted time reading the extra information.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'The game provided a more efficient way of learning in comparison with other activities regarding this topic.',
                    type: 'rate',
                    ratings: 1
                },
                {
                    question: 'I would like such type of assignments in programming courses.',
                    type: 'rate',
                    ratings: 1
                }
            ]
        },
        {
            section: 'I would like to reattempt the game',
            type: 'bool',
            answer: 'yes'
        },
        {
            section: 'Any Suggestion',
            type: 'text',
            answer: ''
        }
    ]);

    const handleRatingChange = (e, sIndex, qIndex)=>{
        const newFeedback = [...feedback];
        newFeedback[sIndex].Questions[qIndex].ratings = e.target.value;
        setFeedback(newFeedback)
    }
    
    const handleAnswerChange = (e, sIndex)=>{
        const newFeedback = [...feedback];
        newFeedback[sIndex].answer = e.target.value;
        setFeedback(newFeedback)
    }

    return (
        <div className='FeedbackModal flex justify-center w-full h-full items-center md:p-40 p-5 bg-gray-300'>
            <div className='bg-white p-7 md:p-10 w-11/12 md:w-fit h-full text-xl text-black shadow-lg rounded-md flex justify-center items-center'>
                <form onSubmit={handleSubmit} className='flex flex-col justify-start items-start gap-3 w-full h-full'>
                    <h1 className='text-3xl font-bold mb-5'>Feedback!</h1>
                    {
                        feedback.map((section, sIndex) => {
                            return (
                                <div key={section + " " + sIndex} className='w-full'>
                                    <p className='mb-5 font-semibold text-2xl'>{(sIndex + 1) + ". " + section.section}</p>
                                    <div className='space-y-5 w-full'>
                                        {
                                            section.type === 'array' &&
                                            section.Questions.map((question, qIndex) => {
                                                return (
                                                    <div key={question + " " + qIndex}  className='flex justify-between items-center gap-5 text-justify'>
                                                        <p title={`Rating\n1. Strongly Disagree\n2. Disagree\n3. Neutral\n4. Agree\n5. Strongly Agree`}>{(qIndex + 1) + ". " + question.question}</p>
                                                        <select value={question.ratings} onChange={(e)=>handleRatingChange(e, sIndex, qIndex)} className='px-3 py-1 bg-gray-300' name="ratings" id="ratings" required title={`Rating\n1. Strongly Disagree\n2. Disagree\n3. Neutral\n4. Agree\n5. Strongly Agree`}>
                                                            <option value={1}>1</option>
                                                            <option value={2}>2</option>
                                                            <option value={3}>3</option>
                                                            <option value={4}>4</option>
                                                            <option value={5}>5</option>
                                                        </select>
                                                    </div>
                                                )
                                            })
                                        }
                                        {
                                            section.type === 'bool' &&
                                            <div className='flex justify-start items-center gap-5'>
                                                <select value={section.answer} onChange={(e)=>handleAnswerChange(e, sIndex)} name="bool" id="bool" className='px-10 py-2 bg-gray-300' required>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </div>
                                        }
                                        {
                                            section.type === 'text' &&
                                            <div className='w-full'>
                                                <textarea required={true} value={section.answer} onChange={(e)=>handleAnswerChange(e, sIndex)} className='w-full border-2 border-solid border-black rounded-md px-3 py-1 min-h-40 max-h-80' name="text" id="text" placeholder='Enter your suggestions here...'></textarea>
                                            </div>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    <button type='submit' className='px-5 py-3 text-white text-center bg-black rounded-md w-full hover:bg-gray-700'>Submit Feedback</button>
                </form>
            </div>
        </div>
    )
}
