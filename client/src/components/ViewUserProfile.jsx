import React, { useState, useEffect, lazy, Suspense } from 'react'
import { IoIosAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { getUserDetailsByParamAsync, selectIsLogin, selectLoading } from '../Redux/features/Authentication/AuthenticationSlice';
import { showAlert } from "../Redux/features/Alerts/AlertSlice";
import { useDispatch, useSelector } from 'react-redux';
import LoginModal from './LoginModal';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from './Spinner';
import { FaHome } from 'react-icons/fa';
const Footer = lazy(() => import("./Footer"));

export default function ViewUserProfile() {
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

    function isBase64(str) {
        const base64Regex = /^(data:image\/[a-zA-Z]+;base64,)?[A-Za-z0-9+/=]+$/;
        return base64Regex.test(str);
    }

    const checkImage = (image) => {
        console.log(image)
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

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { id } = useParams();

    const loading = useSelector(selectLoading);
    const isLogin = useSelector(selectIsLogin);

    useEffect(() => {
        const fetchUser = async () => {
            if (isLogin) {
                try {
                    const response = await dispatch(getUserDetailsByParamAsync(id));
                    const data = response.payload;
                    console.log(response.payload)
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
                        console.log(data)
                        console.log(data.user)
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
    return (
        <div className='ViewUserProfile'>
            <div>
                <div className='Profile bg-gray-900 text-white flex justify-center items-center py-10'>
                    {/* <button onClick={() => { navigate('/') }} className='absolute top-20 text-white px-3 py-2 md:px-5 md:py-3 bg-blue-700 text-lg rounded-md left-[11%]' > Go Back</button> */}
                    <Link to="/admin/view-users" className='absolute top-20 text-white px-3 py-2 md:px-5 md:py-3 bg-transparent text-lg rounded-md right-[11%] flex justify-center items-center gap-3 border-2 border-[gold]'><FaHome /> Go Home</Link>
                    <form className='w-4/5'>
                        <div className='flex justify-start md:justify-center items-center'>
                            <img src={checkImage(details.image)} alt="image" className='w-40 h-40 flex justify-center items-center border-4 border-yellow-500' />
                            <MdEdit onClick={() => { document.getElementById('image').click() }} className='cursor-pointer relative text-4xl top-20 -left-7 p-2 rounded-full text-black bg-[gold]' />
                        </div>
                        <div className='w-full mt-5'>
                            <p className='text-2xl'>Personal Information</p>
                            <div className="md:flex mt-4 md:gap-5 justify-center items-center">
                                <div className="w-full md:w-1/3 flex flex-col md:mt-0 mt-3">
                                    <label className="font-semibold leading-none text-gray-300" htmlFor='fname'>First Name</label>
                                    <input type="text" id='fname' name='fname' maxLength={3} placeholder='First name' required value={details.fname} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                </div>
                                <div className="w-full md:w-1/3 flex flex-col md:mt-0 mt-3">
                                    <label className="font-semibold leading-none text-gray-300" htmlFor='mname'>Middle Name</label>
                                    <input type="text" id='mname' name='mname' minLength={3} placeholder='Middle name' required value={details.mname} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                </div>
                                <div className="w-full md:w-1/3 flex flex-col md:mt-0 mt-3">
                                    <label className="font-semibold leading-none text-gray-300" htmlFor='lname'>Last Name</label>
                                    <input type="text" id='lname' name='lname' minLength={3} placeholder='Last name' required value={details.lname} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                </div>
                            </div>
                            <div className='md:flex mt-3 md:mt-5 md:gap-5 justify-center items-center'>
                                <div className="w-full md:w-1/3 flex flex-col md:mt-0 mt-3">
                                    <label className="font-semibold leading-none text-gray-300" htmlFor='email'>Email</label>
                                    <input type="email" id='email' name='email' placeholder='Email' required disabled value={details.email} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                </div>
                                <div className="w-full md:w-1/3 flex flex-col md:mt-0 mt-3">
                                    <label className="font-semibold leading-none text-gray-300" htmlFor='phone'>Phone</label>
                                    <input type="tel" id='phone' name='phone' placeholder='Phone no.' required value={details.phone} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                </div>
                                <div className="w-full md:w-1/3 flex flex-col md:mt-0 mt-3">
                                    <label className="font-semibold leading-none text-gray-300" htmlFor='portfolio'>Portfolio Address</label>
                                    <input type="url" id='portfolio' name='portfolio' placeholder='Portfolio Address' value={details.portfolio} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                </div>
                            </div>
                            <div className='md:flex mt-3 md:mt-5 md:gap-5 justify-center items-center'>
                                <div className="w-full md:w-1/3 flex flex-col md:mt-0 mt-3">
                                    <label className="font-semibold leading-none text-gray-300" htmlFor='date'>Date of Birth</label>
                                    <input type="date" id='date' name='date' value={checkDate(details.date)} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                </div>
                                <div className="w-full md:w-1/3 flex flex-col md:mt-0 mt-3">
                                    <label className="font-semibold leading-none text-gray-300" htmlFor='gender'>Gender</label>
                                    <input type="text"  value={details.gender} name='gender' id='gender' required className='leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded'/>
                                </div>
                                <div className="w-full md:w-1/3 flex flex-col md:mt-0 mt-3">
                                    <label className="font-semibold leading-none text-gray-300" htmlFor='image'>Profile Image</label>
                                    <input type="file" id='image' name='image' accept="image/*" className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                </div>
                            </div>
                            <div className='md:flex mt-3 md:mt-5 md:gap-5 justify-center items-center'>
                                <div className="w-full flex flex-col md:mt-0 mt-3">
                                    <label className="font-semibold leading-none text-gray-300" htmlFor='bio'>Description</label>
                                    <textarea placeholder='Describe yourself' id='bio' name='bio' value={details.bio} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                </div>
                            </div>
                            <p className='text-2xl mt-8'>Address</p>
                            <div className='md:flex mt-4 md:mt-5 md:gap-5 justify-center items-center'>
                                <div className="w-full md:w-full flex flex-col md:mt-0 mt-3">
                                    <label className="font-semibold leading-none text-gray-300" htmlFor='street'>Street Address</label>
                                    <input type="text" id='street' name='street' placeholder='Street address' value={details.street} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                </div>
                            </div>
                            <div className="md:flex mt-3 md:mt-5 md:gap-5 justify-center items-center">
                                <div className="w-full md:w-1/4 flex flex-col md:mt-0 mt-3">
                                    <label className="font-semibold leading-none text-gray-300" htmlFor='country'>Country</label>
                                    <input type="text" value={details.country} id='country' name='country' className='leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded' />
                                </div>
                                <div className="w-full md:w-1/4 flex flex-col md:mt-0 mt-3">
                                    <label className="font-semibold leading-none text-gray-300" htmlFor='state'>State</label>
                                    <input type="text" name='state' id='state' value={details.state} className='leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded' />
                                </div>
                                <div className="w-full md:w-1/4 flex flex-col md:mt-0 mt-3">
                                    <label className="font-semibold leading-none text-gray-300" htmlFor='city'>City</label>
                                    <input type="text" id='city' name='city' placeholder='City' value={details.city} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                </div>
                                <div className="w-full md:w-1/4 flex flex-col md:mt-0 mt-3">
                                    <label className="font-semibold leading-none text-gray-300" htmlFor='pincode'>Pincode</label>
                                    <input type="text" id='pincode' name='pincode' placeholder='Pincode' value={details.pincode} className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
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
                                                    <div className='font-semibold leading-none text-gray-300 text-md md:text-lg my-3 mx-0 md:mx-2'>No skills added</div>
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
                                    </div>
                                </div>
                            </div>
                            <div className='mt-8 flex justify-between items-center'>
                                <p className='text-2xl'>Social Links</p>
                            </div>
                            <div className='md:flex mt-3 md:mt-4 md:gap-5 justify-center items-center'>
                                <div className="w-full md:w-full flex flex-col md:mt-0 mt-3">
                                    {
                                        details.links.map((link, i) => {
                                            return (
                                                <div key={link + " " + i} className='md:flex justify-between items-center gap-3 mb-3'>
                                                    <label className="font-semibold leading-none text-lg text-gray-300 mt-3" htmlFor='street'>Link</label>
                                                    <input type="text" id='name' name='name' placeholder='Name' value={link.name} className="w-full leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                                    <input type="text" id='address' name='address' placeholder='URL' value={link.address} className="w-full leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded" />
                                                </div>
                                            )
                                        })

                                    }
                                </div>
                            </div>
                            <div className='mt-8 flex justify-between items-center'>
                                <p className='text-2xl'>Education Details</p>
                            </div>
                            <div className='md:flex mt-3 md:mt-4 md:gap-5 justify-center items-center'>
                                <div className="w-full md:w-full flex flex-col md:mt-0 mt-3">
                                    {
                                        details.education.map((ed, i) => {
                                            return (
                                                <div key={ed + " " + i} className='mb-3'>
                                                    <label className="font-semibold leading-none text-lg text-gray-300 mt-3" htmlFor='street'>Degree</label>
                                                    <div className='md:flex justify-center items-center gap-3'>
                                                        <input type="text" name="degree" id="degree" placeholder='Degree Name' value={ed.degree} className='w-full leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded' />
                                                        <input type="text" name="institute" id="institute" placeholder='Institute Name' value={ed.institute} className='w-full leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded' />
                                                    </div>
                                                    <div className='md:flex justify-center items-center gap-3'>
                                                        <input type="date" name="startDate" id="startDate" placeholder='Start Date' value={checkDate(ed.startDate)} className='w-full leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded' />
                                                        <input type="date" name="endDate" id="endDate" placeholder='End Date' value={checkDate(ed.endDate)} className='w-full leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded' />
                                                        <select name="status" id="status" value={ed.status} className='w-full leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-3 border-0 bg-gray-800 rounded'>
                                                            <option value="pursuing">Pursuing</option>
                                                            <option value="completed">Completed</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            )
                                        })

                                    }
                                </div>
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

        </div>
    )
}
