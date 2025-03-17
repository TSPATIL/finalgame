import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import ChallengeEditor from './ChallengeEditor'
import { useDispatch } from 'react-redux';
import { updateTestDetailsAsync } from '../Redux/features/Tests/TestsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { showAlert } from '../Redux/features/Alerts/AlertSlice';
import {Buffer} from 'buffer'

export default function UpdateQuiz() {
  const [test, setTest] = useState({ title: '', description: '', topic: 'sql', challenge: [], access: 'private', dueDate: '', type: 'story_learning' });
  const [challenges, setChallenges] = useState([{ title: '', codeExecute: '', preStory: '', preImage: null, postStory: '', postImage: null, questions: [{ question: '', answer: '', difficulty: 'easy', constraints: '', keywords: '', examples: [{ egQuestion: '', egAnswer: '', egExplanation: '' }] }], teaching: { teachingTopic: '', teachingExplanation: '' } }])

  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  function isBase64(str) {
    if(str === null) return false;
    const base64Regex = /^(data:image\/[a-zA-Z]+;base64,)?[A-Za-z0-9+/=]+$/;
    return base64Regex.test(str);
  }

  // const checkImageBufferOrBase64 = (image) => {
  //   if (!image) return null;

  //   if (image.type === "Buffer") {
  //     const buffer = Buffer.from(image.data);
  //     return `data:image/png;base64,${buffer.toString('base64')}`;
  //   }
  //   else if (typeof image === 'string' && isBase64(image)) {
  //     return `data:image/png;base64,${image}`;
  //   }

  //   return null;
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
          setChallenges(result.data.challenges.map((challenge) => {
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
              teaching: { teachingTopic: challenge.teachings?.topic || '', teachingExplanation: challenge.teachings?.explanation || '' }
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
    fetchTestDetails();
  }, []);

  // const base64ToFile = (base64, fileName, mimeType = "image/png") => {
  //   const byteCharacters = atob(base64.split(',')[1]); // Remove metadata
  //   const byteNumbers = new Array(byteCharacters.length);
    
  //   for (let i = 0; i < byteCharacters.length; i++) {
  //     byteNumbers[i] = byteCharacters.charCodeAt(i);
  //   }
    
  //   const byteArray = new Uint8Array(byteNumbers);
  //   const file = new File([byteArray], fileName, { type: mimeType });
  //   return file;
  // };

  const handleStoryUpdate = async (e) => {
    try {
      e.preventDefault();
      const c = confirm('Are you sure to submit the test details? Check the details before submitting.')
      if (c) {
        const formData = new FormData();
        if (test.title !== '') formData.append('test', test.title);
        if (test.description !== '') formData.append('description', test.description);
        if (test.topic !== '') formData.append('topic', test.topic);
        if (test.type !== '') formData.append('type', test.type);
        if (test.access !== '') formData.append('visibility', test.access);
        if (test.dueDate !== '') formData.append('testDueDate', test.dueDate);
        challenges.forEach((challenge, cNo) => {
          if (challenge.title !== '') formData.append(`challenges[${cNo}][title]`, challenge.title);
          if (challenge.codeExecute !== '') formData.append(`challenges[${cNo}][codeExecution]`, challenge.codeExecute);
          // if (challenge.preImage !== '') formData.append(`challenges[${cNo}][previousStory][image]`, isBase64(challenge.preImage) ? base64ToFile(challenge.preImage): challenge.preImage);
          if (challenge.preImage !== '') formData.append(`challenges[${cNo}][previousStory][image]`, challenge.preImage || null);
          if (challenge.preStory !== '') formData.append(`challenges[${cNo}][previousStory][story]`, challenge.preStory);
          // if (challenge.postImage !== '') formData.append(`challenges[${cNo}][postStory][image]`, isBase64(challenge.postImage) ? base64ToFile(challenge.postImage): challenge.postImage);
          if (challenge.postImage !== '') formData.append(`challenges[${cNo}][postStory][image]`, challenge.postImage || null);
          if (challenge.postStory !== '') formData.append(`challenges[${cNo}][postStory][story]`, challenge.postStory);
          if (challenge.teaching.teachingTopic !== '') formData.append(`challenges[${cNo}][teachings][topic]`, challenge.teaching.teachingTopic);
          if (challenge.teaching.teachingExplanation !== '') formData.append(`challenges[${cNo}][teachings][explanation]`, challenge.teaching.teachingExplanation);
          challenge.questions.forEach((question, qNo) => {
            if (question.difficulty !== '') formData.append(`challenges[${cNo}][questions][${qNo}][difficulty]`, question.difficulty);
            if (question.question !== '') formData.append(`challenges[${cNo}][questions][${qNo}][question]`, question.question);
            if (question.answer !== '') formData.append(`challenges[${cNo}][questions][${qNo}][answer]`, question.answer);
            question.examples.forEach((example, eNo) => {
              if (example.egQuestion !== '') formData.append(`challenges[${cNo}][questions][${qNo}][examples][${eNo}][question]`, example.egQuestion);
              if (example.egAnswer !== '') formData.append(`challenges[${cNo}][questions][${qNo}][examples][${eNo}][answer]`, example.egAnswer);
              if (example.egExplanation !== '') formData.append(`challenges[${cNo}][questions][${qNo}][examples][${eNo}][explanation]`, example.egExplanation);
            });
              if (question.constraints.trim() !== '') formData.append(`challenges[${cNo}][questions][${qNo}][constraints]`, question.constraints.trim());
              if (question.keywords.trim() !== '') formData.append(`challenges[${cNo}][questions][${qNo}][keywords]`, question.keywords.trim());
          });
        })
        // for (let [key, value] of formData.entries()) {
        //   console.log(key, value);
        // }
        const response = await dispatch(updateTestDetailsAsync({testID: id, testType:type, testDetails: formData}));
        const result = response.payload;
        console.log(result)
        if (result.status) {
          dispatch(showAlert({ message: "Test updated successfully", type: "success" }));
          navigate('/admin/admin-dashboard')
        } else {
          dispatch(showAlert({ message: "Test Update Failed", type: "error" }));
        }
      }
    } catch (error) {
      console.error(error)
      dispatch(showAlert({ message: "Error occured", type: "error" }));
    }
  }
  return (
    <div className='UpdateQuiz'>
      <AdminNavbar />
      <div className="bg-gray-800 w-full min-h-screen flex items-center justify-center pt-28 pb-10 md:pt-16 md:pb-16">
        <div className="w-full min-h-full z-10 relative top-0 md:left-0 md:ml-[300px] flex justify-center items-center flex-col">
          <div className='w-5/6 h-full flex justify-start items-start flex-col'>
            <p className='text-3xl font-bold text-white'>Edit Test</p>
            <div className="w-full text-black mt-5">
              <div className='w-full h-full flex flex-col'>
                <label htmlFor="title" className='font-semibold leading-none text-gray-300'>Title</label>
                <input type="text" name="title" id="title" placeholder='Title' value={test.title} onChange={handleTestInfoChange} className='leading-none text-gray-50 p-3 outline-none border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
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
                <label htmlFor="topic" className='font-semibold leading-none text-gray-300'>Topic</label>
                <select id='topic' disabled={true} name='topic' value={test.topic} onChange={handleTestInfoChange} className='leading-none text-gray-50 p-3 mt-3 outline-none bg-gray-800 rounded border-[gold] border-2 border-solid'>
                  <option value="sql">SQL</option>
                  <option value="java">Java</option>
                  <option value="python">Python</option>
                </select>
              </div>
              <div className='w-full h-full flex flex-col'>
                <label htmlFor="type" className='font-semibold leading-none text-gray-300'>Test Type</label>
                <select id='type' name='type' disabled={true} value={test.type} onChange={handleTestInfoChange} className='leading-none text-gray-50 p-3 mt-3 outline-none bg-gray-800 rounded border-[gold] border-2 border-solid'>
                  <option value="Story-Based-Test">Story based learning</option>
                  <option value="multiple_choice">Multiple Choices</option>
                </select>
              </div>
              <div className='w-full h-full flex flex-col'>
                <label htmlFor="access" className='font-semibold leading-none text-gray-300'>Visibility Access</label>
                <select id='access' name='access' value={test.access} onChange={handleTestInfoChange} className='leading-none text-gray-50 p-3 mt-3 outline-none bg-gray-800 rounded border-[gold] border-2 border-solid'>
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </select>
              </div>
              <div className='w-full h-full flex flex-col'>
                <label htmlFor="dueDate" className='font-semibold leading-none text-gray-300'>Due Date</label>
                <input type="date" name="dueDate" id="dueDate" placeholder='dueDate' value={checkDate(test.dueDate)} onChange={handleTestInfoChange} className='leading-none outline-none text-gray-50 p-3 border-[gold] border-2 border-solid mt-3 bg-gray-800 rounded-md' />
              </div>
            </div>
          </div>
          <hr className='bg-[white] h-[1px] w-5/6 mt-10 mb-7 mx-auto' />
          <ChallengeEditor type='Edit' challenges={challenges} setChallenges={setChallenges} handleSubmit={handleStoryUpdate} />
        </div>
      </div>
    </div>
  )
}
