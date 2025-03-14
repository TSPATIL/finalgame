import React, { useState, useEffect } from 'react'
import { IoIosAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { getUserDetailsAsync, selectIsLogin, selectLoading, updateUserDetailsAsync } from '../Redux/features/Authentication/AuthenticationSlice';
import { showAlert } from "../Redux/features/Alerts/AlertSlice";
import { useDispatch, useSelector } from 'react-redux';
import LoginModal from './LoginModal';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

export default function Profile() {
    const [details, setDetails] = useState({ fname: '', mname: '', lname: '', email: '', phone: '', portfolio: '', date: '', gender: 'Male', image: null, bio: '', street: '', city: '', country: '', state: '', pincode: '', skills: [], links: [{ name: '', address: '' }], education: [{ degree: '', institute: '', startDate: '', endDate: '', status: 'pursuing' }] });
    const handleOnChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
        console.log(e.target.value);
    }

    const handleOnSkillChange = (e) => {
        const selectedSkills = Array.from(e.target.selectedOptions, option => option.value);
        setDetails({ ...details, [e.target.name]: selectedSkills });
    }

    const handleImageChange = (e) => {
        if (e.target.files.length !== 0)
            setDetails({ ...details, [e.target.name]: e.target.files[0] })
        else
            setDetails({ ...details, [e.target.name]: null })
    }

    const handleAddLink = () => {
        setDetails({ ...details, links: [...details.links, { name: '', address: '' }] })
    }

    const handleRemoveLink = (index) => {
        const updatedLinks = details.links.filter((_, i) => i !== index);
        setDetails({ ...details, links: updatedLinks })
    }

    const handleLinkOnChange = (e, index) => {
        const updateLinks = [...details.links];
        const updateLinkItem = { ...updateLinks[index] };
        updateLinkItem[e.target.name] = e.target.value;
        updateLinks[index] = updateLinkItem;
        setDetails({ ...details, links: updateLinks });
    }

    const handleAddDegree = () => {
        setDetails({ ...details, education: [...details.education, { degree: '', institute: '', startDate: '', endDate: '', status: '' }] })
    }

    const handleRemoveDegree = (index) => {
        const updateEducationDetails = details.education.filter((_, i) => i !== index);
        setDetails({ ...details, education: updateEducationDetails });
    }

    const handleEducationOnChange = (e, index) => {
        const updateEducationDetails = [...details.education];
        const updatedEducationItem = { ...updateEducationDetails[index] };
        updatedEducationItem[e.target.name] = e.target.value;
        updateEducationDetails[index] = updatedEducationItem;
        setDetails({ ...details, education: updateEducationDetails });
    }

    const dispatch = useDispatch();

    const stateOptions = [
        'Andaman and Nicobar Islands',
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chandigarh',
        'Chhattisgarh',
        'Dadra and Nagar Haveli and Daman and Diu',
        'Delhi',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jammu and Kashmir',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Ladakh',
        'Lakshadweep',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Puducherry',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal'
    ]

    const skillOptions = [
        'Python',
        'Java',
        'JavaScript',
        'C++',
        'C#',
        'Ruby',
        'Swift',
        'Go',
        'PHP',
        'HTML',
        'CSS',
        'Kotlin',
        'React',
        'Angular',
        'Vue.js',
        'Node.js',
        'Statistical Analysis',
        'SQL',
        'R',
        'Excel',
        'Tableau',
        'Power BI',
        'MATLAB',
        'SAS',
        'Database Management',
        'Machine Learning Algorithms',
        'Deep Learning Architecture',
        'Natural Language Processing',
        'OpenCV',
        'TensorFlow',
        'PyTorch',
        'OpenAI Gym',
        'Stable Baselines',
        'RLlib',
        'Amazon Web Services',
        'Microsoft Azure',
        'Google Cloud Platform',
        'IBM Cloud',
        'Cloud Infrastructure',
        'Containerization',
        'Docker',
        'Kubernetes',
        'Serverless Computing',
        'AWS Lambda',
        'Azure Functions',
        'Network Security',
        'Network protocols',
        'Firewalls',
        'Intrusion detection systems and Intrusion prevention systems',
        'Virtual private networks',
        'Vulnerability Assessment',
        'Penetration Testing',
        'Incident Response',
        'Digital Forensics',
        'Project Planning and Scheduling',
        'Project Budgeting',
        'Cost Management',
        'Risk Management',
        'Project Documentation',
        'Project charters',
        'Stakeholder communication plans',
        'Change Management',
        'Project Closure and Evaluation',
        'Search Engine Optimization',
        'Search Engine Marketing',
        'Google Ads',
        'Social Media Marketing',
        'Content Marketing',
        'Blog writing',
        'A / B Testing',
        'Marketing Automation',
        'Conversion Rate Optimization',
        'User Experience Optimization',
        'Influencer Marketing',
        'Adobe Creative Suite',
        'Typography',
        'Layout Design',
        'Color Theory',
        'Visual brand identities',
        'Illustration',
        'Custom graphics',
        'Image Editing and Retouching',
        'Print Design',
        'User Interface Design',
        'Web Design',
        'User Interviews',
        'Surveys and Questionnaires',
        'Usability Testing',
        'Information Design',
        'Wireframing',
        'Interaction Design',
        'Prototyping',
        'Adobe XD',
        'Sketch',
        'Figma',
        'InVision',
        'Typography and Layout',
        'Heatmaps: Microsoft Clarity, Hotjar, Crazy Egg',
        'Data Analysis',
        'Google Analytics',
        'Mixpanel',
        'Responsive Design',
        'Accessibility Design',
        'Financial Statement Analysis',
        'Financial Ratio Analysis',
        'Financial Modeling',
        'Valuation Techniques',
        'Risk Analysis',
        'Capital Budgeting',
        'Cost Analysis',
        'Financial Forecasting',
        'Investment Analysis',
        'Corporate Finance',
        'Financial modeling software',
        'Statistical analysis software',
        'Data visualization tools',
        'Grammar',
        'Syntax',
        'Vocabulary Building',
        'Writing Skills',
        'Translation',
        'Language Teaching',
        'Language Technology Tools',
        'Niche Language Knowledge',
        'Interpersonal Communication',
        'Active listening',
        'Verbal communication',
        'Nonverbal communication',
        'Written communication',
        'Empathy',
        'Emotional intelligence',
        'Interpersonal skills',
        'Collaboration',
        'Conflict resolution',
        'Building positive relationships',
        'Stakeholder management',
        'Presentation',
        'Negotiation',
        'Adaptability',
        'Clarity',
        'Respectful communication',
        'Constructive feedback',
        'Handling criticism',
        'Conflict resolution',
        'Cultural awareness',
        'Teamwork',
        'Communication',
        'Problem - solving',
        'Flexibility',
        'Respect',
        'Trust building',
        'Leadership',
        'Time management',
        'Decision - making',
        'Networking',
        'Accountability',
        'Mediation',
        'Relationship building',
        'Diplomacy',
        'Active engagement',
        'Delegation',
        'Critical thinking:',
        'Analytical skills',
        'Data assessment',
        'Evaluation',
        'Creativity',
        'Decision - making',
        'Problem analysis',
        'Research',
        'Open - minded',
        'Persistence',
        'Collaboration',
        'Communication',
        'Task prioritization',
        'Managing resources',
        'Resourcefulness',
        'Agility',
        'Systematic thinking',
        'Identifying patterns',
        'Problem - solving',
        'Reasoning',
        'Logical and rational thinking processes',
        'Data - based decision - making',
        'Reflection',
        'Self - reflection',
        'Curiosity',
        'Information evaluation',
        'Identifying the root cause of the problem',
        'Critical reading',
        'Evidence - based reasoning',
        'Objectivity',
        'Creative thinking',
        'Effective Communication',
        'Resilience',
        'Proactivity',
        'Flexibility',
        'Ability to adjust',
        'Open - mindedness',
        'Problem - solving',
        'Learning agility',
        'Initiative',
        'Self - motivation',
        'Versatility',
        'Accommodating change',
        'Collaboration',
        'Thriving in diverse environments',
        'Self - confidence',
        'Decision - making',
        'Communication',
        'Inspiration',
        'Navigating challenges and change',
        'Understanding different perspectives',
        'Empathy',
        'Compassion',
        'Vision',
        'Taking responsibility',
        'Coaching',
        'Mentoring',
        'Providing feedback',
        'Conflict resolution',
        'Accountability',
        'Promoting teamwork',
        'Integrity',
        'Honesty',
        'Transparency',
        'Work ethics',
        'Influence',
        'Resilience',
        'Empowerment',
        'Personal and professional development',
        'Fostering a culture of growth',
        'Time management',
        'Strategizing',
        'Prioritization',
        'Attention to detail',
        'Multitasking',
        'Task delegation',
        'Workflow optimization',
        'Documentation',
        'Record - keeping',
        'Goal setting',
        'Adaptability',
        'Systematic thinking',
        'Developing effective solutions',
        'Conveying information',
        'Teamwork',
        'Critical analysis',
        'Evaluating risks',
        'Adaptation to technology',
        'Active listening',
        'Understanding',
        'Interpersonal communication',
        'Persuasion',
        'Influence',
        'Empathy',
        'Compassion',
        'Exploring alternative solutions',
        'Finding win - win outcomes',
        'Adapting negotiation strategies',
        'Emotional intelligence',
        'Assertiveness',
        'Cooperation',
        'Patience',
        'Brainstorming',
        'Evaluating potential outcomes',
        'Preparation',
        'Managing conflict',
        'Compromise',
        'Confidence',
        'Relationship building',
        'Creativity',
        'Unconventional thinking',
        'Finding innovative solutions',
        'Open to new ideas',
        'Embracing diverse viewpoints',
        'Strong desire to explore',
        'Critical thinking',
        'Flexibility',
        'Teamwork',
        'Articulating ideas',
        'Perseverance',
        'Taking calculated risks',
        'Stepping out of comfort zone',
        'Entrepreneurial mindset',
        'Seeking opportunities for growth',
        'Emotional intelligence',
        'Growth mindset',
        'Effective communication',
        'Mutual understanding',
        'Empathy',
        'Constructively addressing conflicts',
        'Cooperation',
        'Valuing diverse perspectives',
        'Respect',
        'Adjusting behavior to establish rapport',
        'Empowerment',
        'Fostering a sense of ownership and confidence',
        'Assertiveness',
        'Cultural sensitivity',
        'Networking',
        'Trustworthiness',
        'Honesty',
        'Reliability',
        'Integrity',
        'Fostering credibility',
        'Diplomacy',
        'Sharing responsibilities',
        'Valuing contributions',
        'Clear communication',
        'Public speaking',
        'Confidence',
        'Strong stage presence',
        'Audience engagement',
        'Clarity',
        'Organization',
        'Storytelling',
        'Visual design',
        'Slide decks',
        'Maintaining composure',
        'Handling challenges',
        'Adapting in real - time to audience needs',
        'Time management',
        'Influence',
        'Preparation',
        'Research',
        'Visual and verbal communication alignment',
    ]

    const navigate = useNavigate();

    const loading = useSelector(selectLoading);
    const isLogin = useSelector(selectIsLogin);

    useEffect(() => {
        const fetchUser = async () => {
            if (isLogin) {
                try {
                    const response = await dispatch(getUserDetailsAsync());
                    const data = response.payload;
                    console.log(data.error)
                    if (data.error === "Unauthorized: No auth token found" || data.error === 'Session expired. Please log in again.') {
                        dispatch(logout());
                        const result = await signOutUser();
                        if (result.status) {
                            dispatch(showAlert({ message: "Session expired. Please log in again", type: "info" }));
                            navigate('/')
                        } else {
                            dispatch(showAlert({ message: "User logged out failed", type: "error" }));
                        }
                    }
                    else if (data.status === false) {
                        dispatch(showAlert({ message: data.error, type: "error" }));
                    }
                    else {
                        const user = data.user;
                        const temp = {
                            fname: user.profile.firstName || '',
                            mname: user.profile.middleName || '',
                            lname: user.profile.lastName || '',
                            email: user.email || '',
                            phone: user.profile.contact.phone || '',
                            date: user.profile.dateOfBirth || '',
                            gender: user.profile.gender || 'Male',
                            image: `data:image/png;base64,${user.profile?.image}` || null,
                            bio: user.profile?.bio || '',
                            street: user.profile.address?.street || '',
                            city: user.profile.address?.city || '',
                            country: user.profile.address?.country || '',
                            state: user.profile.address?.state || '',
                            pincode: user.profile.address?.zip || '',
                            skills: user.profile.skills || [],
                            links: user.profile.contact.links.length !== 0 ? user.profile.contact.links : [{ name: '', address: '' }],
                            education: user.profile.education.length !== 0 ? user.profile.education : [{ degree: '', institute: '', startDate: '', endDate: '', status: 'pursuing' }]
                        }
                        setDetails(temp);
                    }
                } catch (error) {
                    console.log(error)
                    dispatch(showAlert({ message: error.message, type: "error" }));
                }
            }
        }
        fetchUser();
    }, [isLogin])

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         if (isLogin) {
    //             const response = await dispatch(getUserDetailsAsync());
    //             const data = response.payload;
    //             if (data.status) {
    //                 const user = data.user;
    //                 const temp = {
    //                     fname: user.profile.firstName || '',
    //                     mname: user.profile.middleName || '',
    //                     lname: user.profile.lastName || '',
    //                     email: user.email || '',
    //                     phone: user.profile.contact.phone || '',
    //                     date: user.profile.dateOfBirth || '',
    //                     gender: user.profile.gender || 'Male',
    //                     image: `data:image/png;base64,${user.profile?.image}` || null,
    //                     bio: user.profile?.bio || '',
    //                     street: user.profile.address?.street || '',
    //                     city: user.profile.address?.city || '',
    //                     country: user.profile.address?.country || '',
    //                     state: user.profile.address?.state || '',
    //                     pincode: user.profile.address?.zip || '',
    //                     skills: user.profile.skills || [],
    //                     links: user.profile.contact.links.length !== 0 ? user.profile.contact.links : [{ name: '', address: '' }],
    //                     education: user.profile.education.length !== 0 ? user.profile.education : [{ degree: '', institute: '', startDate: '', endDate: '', status: 'pursuing' }]
    //                 }
    //                 setDetails(temp);
    //             }
    //         }
    //     }
    //     fetchUser();
    // }, [isLogin])

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const c = confirm('Are you sure to submit your details? Check them once before submitting.')
        if (c) {
            const formData = new FormData();
            if (details.email !== '') formData.append('email', details.email);
            if (details.fname !== '') formData.append('profile[firstName]', details.fname);
            if (details.mname !== '') formData.append('profile[middleName]', details.mname);
            if (details.lname !== '') formData.append('profile[lastName]', details.lname);
            if (details.gender !== '') formData.append('profile[gender]', details.gender);
            if (details.phone !== '') formData.append('profile[contact][phone]', details.phone);
            if (details.portfolio !== '') formData.append('profile[contact][portfolio]', details.portfolio);
            details.links.forEach((link, index) => {
                if (link.name !== undefined && link.address !== undefined) {
                    if (link.name !== '') formData.append(`profile[contact][links][${index}][name]`, link.name);
                    if (link.address !== '') formData.append(`profile[contact][links][${index}][address]`, link.address);
                }
            });
            if (details.date !== '') formData.append('profile[dateOfBirth]', details.date);
            if (details.image !== null) formData.append('profile[image]', isBase64(details.image) ? details.image.replace('data:image/png;base64,', '') : details.image);
            if (details.bio !== '') formData.append('profile[bio]', details.bio);
            if (details.street !== '') formData.append('profile[address][street]', details.street);
            if (details.city !== '') formData.append('profile[address][city]', details.city);
            if (details.state !== '') formData.append('profile[address][state]', details.state);
            if (details.country !== '') formData.append('profile[address][country]', details.country);
            if (details.pincode !== '') formData.append('profile[address][zip]', details.pincode);
            details.skills.forEach((skill, index) => {
                if (skill !== '') formData.append(`profile[skills][${index}]`, skill);
            })
            details.education.forEach((education, index) => {
                if (education.degree !== undefined && education.institute !== undefined && education.startDate !== undefined && education.startDate !== null && education.endDate !== undefined && education.endDate !== null) {
                    formData.append(`profile[education][${index}][degree]`, education.degree);
                    formData.append(`profile[education][${index}][institute]`, education.institute);
                    formData.append(`profile[education][${index}][startDate]`, education.startDate);
                    formData.append(`profile[education][${index}][endDate]`, education.endDate);
                    formData.append(`profile[education][${index}][status]`, education.status);
                }
            })

            const response = await dispatch(updateUserDetailsAsync(formData));
            const result = response.payload;
            if (result.status) {
                dispatch(showAlert({ message: "Profile Details updated", type: "success" }));
            } else {
                dispatch(showAlert({ message: "Error occured", type: "error" }));
            }
        }
    }

    return (
        <div>
            {
                !loading
                    ?
                    <div>
                        <div className='Profile bg-gray-900 text-white flex justify-center items-center py-10'>
                            <button onClick={() => { navigate('/') }} className='absolute top-20 text-white px-3 py-2 md:px-5 md:py-3 bg-blue-700 text-lg rounded-md left-[11%]' > Go Back</button>
                            <button className='absolute top-20 text-white px-3 py-2 md:px-5 md:py-3 bg-blue-700 text-lg rounded-md right-[11%]'>Edit Details</button>
                            <form className='w-4/5' onSubmit={handleSubmit}>
                                <div className='flex justify-center items-center'>
                                    <img src={checkImage(details.image)} alt="image" className='w-36 h-36 rounded-full flex justify-center items-center border-4 border-yellow-500' />
                                    <MdEdit onClick={() => { document.getElementById('image').click() }} className='cursor-pointer relative text-4xl top-10 -left-10 p-2 rounded-full text-white bg-slate-500' />
                                </div>
                                <div className='w-full mt-5'>
                                    <p className='text-2xl'>Personal Information</p>
                                    <div className="md:flex mt-4 md:gap-5 justify-center items-center">
                                        <div className="w-full md:w-1/3 flex flex-col md:mt-0 mt-3">
                                            <label className="font-semibold leading-none text-gray-300" htmlFor='fname'>First Name</label>
                                            <input type="text" id='fname' name='fname' maxLength={3} placeholder='First name' required value={details.fname} onChange={handleOnChange} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                        </div>
                                        <div className="w-full md:w-1/3 flex flex-col md:mt-0 mt-3">
                                            <label className="font-semibold leading-none text-gray-300" htmlFor='mname'>Middle Name</label>
                                            <input type="text" id='mname' name='mname' minLength={3} placeholder='Middle name' required value={details.mname} onChange={handleOnChange} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                        </div>
                                        <div className="w-full md:w-1/3 flex flex-col md:mt-0 mt-3">
                                            <label className="font-semibold leading-none text-gray-300" htmlFor='lname'>Last Name</label>
                                            <input type="text" id='lname' name='lname' minLength={3} placeholder='Last name' required value={details.lname} onChange={handleOnChange} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                        </div>
                                    </div>
                                    <div className='md:flex mt-3 md:mt-5 md:gap-5 justify-center items-center'>
                                        <div className="w-full md:w-1/3 flex flex-col md:mt-0 mt-3">
                                            <label className="font-semibold leading-none text-gray-300" htmlFor='email'>Email</label>
                                            <input type="email" id='email' name='email' placeholder='Email' required disabled value={details.email} onChange={handleOnChange} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                        </div>
                                        <div className="w-full md:w-1/3 flex flex-col md:mt-0 mt-3">
                                            <label className="font-semibold leading-none text-gray-300" htmlFor='phone'>Phone</label>
                                            <input type="tel" id='phone' name='phone' placeholder='Phone no.' required value={details.phone} onChange={handleOnChange} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                        </div>
                                        <div className="w-full md:w-1/3 flex flex-col md:mt-0 mt-3">
                                            <label className="font-semibold leading-none text-gray-300" htmlFor='portfolio'>Portfolio Address</label>
                                            <input type="url" id='portfolio' name='portfolio' placeholder='Portfolio Address' value={details.portfolio} onChange={handleOnChange} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                        </div>
                                    </div>
                                    <div className='md:flex mt-3 md:mt-5 md:gap-5 justify-center items-center'>
                                        <div className="w-full md:w-1/3 flex flex-col md:mt-0 mt-3">
                                            <label className="font-semibold leading-none text-gray-300" htmlFor='date'>Date of Birth</label>
                                            <input type="date" id='date' name='date' value={checkDate(details.date)} onChange={handleOnChange} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                        </div>
                                        <div className="w-full md:w-1/3 flex flex-col md:mt-0 mt-3">
                                            <label className="font-semibold leading-none text-gray-300" htmlFor='gender'>Gender</label>
                                            <select value={details.gender} name='gender' id='gender' required onChange={handleOnChange} className='leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded'>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="others">Others</option>
                                            </select>
                                        </div>
                                        <div className="w-full md:w-1/3 flex flex-col md:mt-0 mt-3">
                                            <label className="font-semibold leading-none text-gray-300" htmlFor='image'>Profile Image</label>
                                            <input type="file" id='image' name='image' accept="image/*" onChange={handleImageChange} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                        </div>
                                    </div>
                                    <div className='md:flex mt-3 md:mt-5 md:gap-5 justify-center items-center'>
                                        <div className="w-full flex flex-col md:mt-0 mt-3">
                                            <label className="font-semibold leading-none text-gray-300" htmlFor='bio'>Description</label>
                                            <textarea placeholder='Describe yourself' id='bio' name='bio' value={details.bio} onChange={handleOnChange} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                        </div>
                                    </div>
                                    <p className='text-2xl mt-8'>Address</p>
                                    <div className='md:flex mt-4 md:mt-5 md:gap-5 justify-center items-center'>
                                        <div className="w-full md:w-full flex flex-col md:mt-0 mt-3">
                                            <label className="font-semibold leading-none text-gray-300" htmlFor='street'>Street Address</label>
                                            <input type="text" id='street' name='street' placeholder='Street address' value={details.street} onChange={handleOnChange} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                        </div>
                                    </div>
                                    <div className="md:flex mt-3 md:mt-5 md:gap-5 justify-center items-center">
                                        <div className="w-full md:w-1/4 flex flex-col md:mt-0 mt-3">
                                            <label className="font-semibold leading-none text-gray-300" htmlFor='country'>Country</label>
                                            <select value={details.country} id='country' name='country' onChange={handleOnChange} className='leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded'>
                                                <option value="India">India</option>
                                            </select>
                                        </div>
                                        <div className="w-full md:w-1/4 flex flex-col md:mt-0 mt-3">
                                            <label className="font-semibold leading-none text-gray-300" htmlFor='state'>State</label>
                                            <select value={details.state} name='state' id='state' onChange={handleOnChange} className='leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded'>
                                                {
                                                    stateOptions.map((state) => {
                                                        return (
                                                            <option key={state} value={state}>{state}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="w-full md:w-1/4 flex flex-col md:mt-0 mt-3">
                                            <label className="font-semibold leading-none text-gray-300" htmlFor='city'>City</label>
                                            <input type="text" id='city' name='city' placeholder='City' value={details.city} onChange={handleOnChange} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                        </div>
                                        <div className="w-full md:w-1/4 flex flex-col md:mt-0 mt-3">
                                            <label className="font-semibold leading-none text-gray-300" htmlFor='pincode'>Pincode</label>
                                            <input type="text" id='pincode' name='pincode' placeholder='Pincode' value={details.pincode} onChange={handleOnChange} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                        </div>
                                    </div>
                                    <p className='text-2xl mt-8'>Skills</p>
                                    <div className='md:flex mt-3 md:mt-4 md:gap-5 justify-center items-center'>
                                        <div className="w-full md:w-full flex flex-col md:mt-0 mt-3">
                                            <div className='md:flex justify-between items-center'>
                                                <label className="font-semibold leading-none text-gray-300 text-lg w-fit" htmlFor='skills'>Skills:</label>
                                                <div className='flex justify-start items-center flex-wrap w-full'>
                                                    {
                                                        details.skills.length === 0
                                                            ?
                                                            <div className='font-semibold leading-none text-gray-300 text-md md:text-lg my-3 mx-0 md:mx-2'>Press 'Ctrl' to select multiple skills</div>
                                                            :
                                                            details.skills.map((skill, i) => {
                                                                return (
                                                                    <div key={skill + " " + i}>
                                                                        <div className='bg-blue-700 text-white px-3 py-2 mr-2 my-2 md:m-2 text-sm font-bold'>{skill}</div>
                                                                    </div>
                                                                )
                                                            })
                                                    }
                                                </div>
                                                <button disabled={details.skills.length === 0 ? true : false} className='cursor-pointer text-end rounded-md bg-red-700 text-white px-4 py-2 font-bold' onClick={() => {
                                                    const c = confirm('Are you sure to clear skills?');
                                                    setDetails({ ...details, skills: [] })
                                                }}>Clear</button>
                                            </div>
                                            <select multiple value={details.skills} name='skills' id='skills' onChange={handleOnSkillChange} className='leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded'>
                                                {
                                                    skillOptions.map((skill, i) => {
                                                        return (
                                                            <option key={skill + " " + i} value={skill}>{skill}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className='mt-8 flex justify-between items-center'>
                                        <p className='text-2xl'>Social Links</p>
                                        <div className='cursor-pointer text-lg font-bold flex justify-between items-center bg-green-700 px-2 py-1 rounded-md' onClick={handleAddLink}><IoIosAdd /> Add Link</div>
                                    </div>
                                    <div className='md:flex mt-3 md:mt-4 md:gap-5 justify-center items-center'>
                                        <div className="w-full md:w-full flex flex-col md:mt-0 mt-3">
                                            {
                                                details.links.map((link, i) => {
                                                    return (
                                                        <div key={link + " " + i} className='md:flex justify-between items-center gap-3 mb-3'>
                                                            <label className="font-semibold leading-none text-lg text-gray-300 mt-3" htmlFor='street'>Link</label>
                                                            <input type="text" id='name' name='name' placeholder='Name' value={link.name} onChange={(e) => handleLinkOnChange(e, i)} className="w-full leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                                            <input type="text" id='address' name='address' placeholder='URL' value={link.address} onChange={(e) => handleLinkOnChange(e, i)} className="w-full leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                                            <div className='cursor-pointer py-2 px-3 rounded-md text-lg font-bold bg-red-700 w-fit h-fit mt-3' onClick={(e) => handleRemoveLink(i)}>Remove</div>
                                                        </div>
                                                    )
                                                })

                                            }
                                        </div>
                                    </div>
                                    <div className='mt-8 flex justify-between items-center'>
                                        <p className='text-2xl'>Education Details</p>
                                        <div className='cursor-pointer text-lg font-bold flex justify-between items-center bg-green-700 px-2 py-1 rounded-md' onClick={handleAddDegree}><IoIosAdd /> Add More</div>
                                    </div>
                                    <div className='md:flex mt-3 md:mt-4 md:gap-5 justify-center items-center'>
                                        <div className="w-full md:w-full flex flex-col md:mt-0 mt-3">
                                            {
                                                details.education.map((ed, i) => {
                                                    return (
                                                        <div key={ed + " " + i} className='mb-3'>
                                                            <label className="font-semibold leading-none text-lg text-gray-300 mt-3" htmlFor='street'>Degree</label>
                                                            <div className='md:flex justify-center items-center gap-3'>
                                                                <input type="text" name="degree" id="degree" placeholder='Degree Name' value={ed.degree} onChange={(e) => handleEducationOnChange(e, i)} className='w-full leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded' />
                                                                <input type="text" name="institute" id="institute" placeholder='Institute Name' value={ed.institute} onChange={(e) => handleEducationOnChange(e, i)} className='w-full leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded' />
                                                            </div>
                                                            <div className='md:flex justify-center items-center gap-3'>
                                                                <input type="date" name="startDate" id="startDate" placeholder='Start Date' value={checkDate(ed.startDate)} onChange={(e) => handleEducationOnChange(e, i)} className='w-full leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded' />
                                                                <input type="date" name="endDate" id="endDate" placeholder='End Date' value={checkDate(ed.endDate)} onChange={(e) => handleEducationOnChange(e, i)} className='w-full leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded' />
                                                                <select name="status" id="status" value={ed.status} onChange={(e) => handleEducationOnChange(e, i)} className='w-full leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded'>
                                                                    <option value="pursuing">Pursuing</option>
                                                                    <option value="completed">Completed</option>
                                                                </select>
                                                            </div>
                                                            <div className='cursor-pointer py-2 px-3 rounded-md text-lg font-bold bg-red-700 w-fit h-fit mt-3' onClick={(e) => handleRemoveDegree(i)}>Remove</div>
                                                        </div>
                                                    )
                                                })

                                            }
                                        </div>
                                    </div>
                                    <div className='mt-8 flex justify-center items-center'>
                                        <button type='submit' className="w-full md:w-fit font-semibold leading-none flex justify-center items-center text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none">
                                            <p>Save Details</p>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {
                            !isLogin
                            &&
                            <LoginModal />
                        }
                    </div>
                    :
                    // <div className='text-black text-5xl'>Loading...</div>
                    <div className="flex justify-center items-center h-screen w-screen">
                        <Spinner
                            fontSize="60px"
                        />
                    </div>
            }
        </div>
    )
}
