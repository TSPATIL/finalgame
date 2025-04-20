import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLogin } from '../Redux/features/Authentication/AuthenticationSlice';
import LoginModal from './LoginModal';
import { showAlert } from '../Redux/features/Alerts/AlertSlice';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar'
import { FaEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

export default function ViewUsers() {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const isLogin = useSelector(selectIsLogin);
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(`${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/api/user/getallusers`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                });
                const result = await response.json();
                console.log(result)
                if (result.status) {
                    setUsers(result.users);
                    setFilteredUsers(result.users);
                    dispatch(showAlert({ message: result.message, type: "success" }));
                }
                else {
                    dispatch(showAlert({ message: result.message, type: "error" }));
                }
            } catch (error) {
                console.log(error)
                dispatch(showAlert({ message: "Error Occurred", type: "error" }));
            }
        }
        if (isLogin)
            fetchUsers();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setFilteredUsers(users.filter(user =>{}
            // feedback.ratings.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            // feedback.createdAt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            // feedback.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
            // feedback.id.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    }

    const deleteUser = async (id, userNo) => {
        const c = confirm("Are you sure to delete this record?");
        if (c) {
            try {
                const response = await fetch(`${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/api/user/delete-user/${id}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                });
                const result = await response.json();
                console.log(result);
                if (result.status) {
                    const newUsers = users.filter((user, index) => {
                        return index !== userNo;
                    })
                    setFeedbacks(newUsers);
                    setFilteredFeedbacks(newUsers);
                    dispatch(showAlert({ message: "Feedback Deleted Successfully", type: "success" }))
                }
                else {
                    dispatch(showAlert({ message: result.message, type: "error" }))
                }
            } catch (error) {
                console.log(error)
                dispatch(showAlert({ message: "Error Occured", type: "error" }))
            }
        }
    }

    if (!isLogin) {
        return <LoginModal />
    }
    return (
        <div className='ViewUsers'>
            <AdminNavbar />
            <div className="bg-gray-800 z-20 w-full min-h-screen flex items-center justify-center pt-28 pb-10 md:pt-16 md:pb-16">
                <div className="w-full min-h-full z-10 relative top-0 md:left-0 md:ml-[300px] flex justify-center items-center flex-col">
                    <div className='w-5/6 h-full flex justify-start items-start flex-col'>
                        <h1 className="text-3xl font-bold mb-5 text-white">View Users</h1>
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
                                <div className="w-full text-black mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                                    {
                                        filteredUsers.length !== 0
                                            ?
                                            filteredUsers.map((user, index) => {
                                                return (
                                                    <div key={user + "" + index} className='w-full rounded-md group h-full bg-white text-black flex items-center justify-center flex-col border-2 border-solid border-[gold] p-3 gap-3 text-lg'>
                                                        <div className='grid gap-3 lg:gap-2 grid-cols-1 justify-items-start w-full h-full'>
                                                            <div className=''>
                                                                <div><span className='text-xl font-bold'>Sr. No.:</span> {index + 1}</div>
                                                            </div>
                                                            <div className=''>
                                                                <div><span className='text-xl font-bold'>User id:</span> {user._id}</div>
                                                            </div>
                                                            <div className=''>
                                                                <div><span className='text-xl font-bold'>Type:</span> {user.userType}</div>
                                                            </div>
                                                            <div className=''>
                                                                <div><span className='text-xl font-bold'>Name:</span> {user.profile.firstName + " " + user.profile.middleName + " " + user.profile.lastName}</div>
                                                            </div>
                                                            <div className=''>
                                                                <div><span className='text-xl font-bold'>Email:</span> {user.email}</div>
                                                            </div>
                                                            <div className=''>
                                                                <div><span className='text-xl font-bold'>Firebase Id:</span> {user.firebaseId}</div>
                                                            </div>
                                                            <div className=''>
                                                                <div><span className='text-xl font-bold'>Created At:</span> {user.createdAt}</div>
                                                            </div>
                                                        </div>
                                                        <hr className='w-full h-[2px] bg-black hidden group-hover:block' />
                                                        <div className='hidden group-hover:flex justify-center items-center gap-5'>
                                                            <Link to={`/admin/view-users-profile/${user._id}`} className='px-5 py-2 bg-gradient-to-b from-blue-700 to-blue-900 rounded-md hover:bg-gradient-to-t text-white font-bold flex justify-center items-center gap-2'><FaEye className='text-xl' /><p className='hidden sm:block'>View</p></Link>
                                                            <button onClick={() => deleteUser(user._id, index)} className='px-5 py-2 bg-gradient-to-b from-blue-700 to-blue-900 rounded-md hover:bg-gradient-to-t text-white font-bold flex justify-center items-center gap-2'><MdDelete className='text-xl' /><p className='hidden sm:block'>Delete</p></button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            :
                                            <div className='text-xl text-white'>No Feedbacks created</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
