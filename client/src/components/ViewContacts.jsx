import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../Redux/features/Alerts/AlertSlice';
import AdminNavbar from './AdminNavbar';
import { FaEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import LoginModal from './LoginModal';
import { selectIsLogin } from '../Redux/features/Authentication/AuthenticationSlice';

export default function ViewContacts() {
    const dispatch = useDispatch();
    const [contacts, setContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);

    useEffect(() => {
        async function fetchContacts() {
            try {
                const response = await fetch(`${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/api/contact/getAllContacts`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                });
                const result = await response.json();
                if (result.status) {
                    const contactData = result.contacts.map((contact) => {
                        return {
                            id: contact._id,
                            name: contact.name,
                            email: contact.email,
                            phone: contact.phone,
                            subject: contact.subject,
                            message: contact.message,
                            createdAt: new Date(contact.createdAt).toLocaleString()
                        }
                    })
                    setContacts(contactData);
                    setFilteredContacts(contactData);
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
        if(isLogin)
            fetchContacts();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setFilteredContacts(contacts.filter(contact =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.phone.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.createdAt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.id.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    }

    const deleteContact = async (id, contactNo)=>{
        const c = confirm("Are you sure to delete this record?");
        if(c){
            try {
              const response = await fetch(`${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/api/contact/delete-contact/${id}`, {
                method: 'DELETE',
                headers: {
                  "Content-Type": "application/json"
                },
                credentials: 'include'
              });
              const result = await response.json();
              console.log(result);
              const newContacts = contacts.filter((contact, index)=>{
                return index !== contactNo;
              })
              setContacts(newContacts);
              setFilteredContacts(newContacts);
              dispatch(showAlert({ message: "Test Deleted Successfully", type: "success" }))
            } catch (error) {
              console.log(error)
              dispatch(showAlert({ message: "Error Occured", type: "error" }))
            }
        }
      }

    const [contactModal, setContactModal] = useState(false)
    let [contactViewNo, setContactViewNo] = useState(-1);

    const ContactModal = ({contacts})=>{
        return (
        <div className='absolute z-30 top-0 left-0 min-w-screen min-h-screen flex justify-center bg-gray-800 items-center'>
            <div onClick={()=> setContactModal(false)} className='w-screen h-screen relative z-40 bg-gray-600 opacity-20'></div>
            <div className='bg-white absolute z-50 p-10 w-11/12 md:w-1/2 h-fit text-xl text-black shadow-lg rounded-md'>
                <p className='text-3xl text-black font-bold'>Contact Details</p>
                <p className='my-2 flex justify-start items-center gap-2'><p>Contact ID:</p> <p className='text-red-700'>{contacts[contactViewNo].id}</p></p>
                <p className='my-2 flex justify-start items-center gap-2'><p>Created At:</p> <p className='text-red-700'>{contacts[contactViewNo].createdAt}</p></p>
                <p className='my-2 flex justify-start items-center gap-2'><p>Name:</p> <p className='text-[purple]'>{contacts[contactViewNo].name}</p></p>
                <p className='my-2 flex justify-start items-center gap-2'><p>Email:</p> <p className='text-[purple]'>{contacts[contactViewNo].email}</p></p>
                <p className='my-2 flex justify-start items-center gap-2'><p>Phone no.:</p> <p className='text-[purple]'>{contacts[contactViewNo].phone}</p></p>
                <p className='my-2 flex justify-start items-center gap-2'><p>Subject:</p> <p className='text-green-700'>{contacts[contactViewNo].subject}</p></p>
                <p className='my-2 flex justify-start items-center gap-2'><p>Message:</p> <p className='text-blue-700'>{contacts[contactViewNo].message}</p></p>
            </div>
        </div>
        )
    }
    
      const isLogin = useSelector(selectIsLogin);
      if(!isLogin){
        return <LoginModal/>
      }

    return (
        <div className='ViewContacts'>
            {(!contactModal) ?
            <div>
            <AdminNavbar />
            <div className="bg-gray-800 z-20 w-full min-h-screen flex items-center justify-center pt-28 pb-10 md:pt-16 md:pb-16">
                <div className="w-full min-h-full z-10 relative top-0 md:left-0 md:ml-[300px] flex justify-center items-center flex-col">
                    <div className='w-5/6 h-full flex justify-start items-start flex-col'>
                        <h1 className="text-3xl font-bold mb-5 text-white">View Contacts</h1>
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
                                        filteredContacts.length !== 0
                                            ?
                                            filteredContacts.map((contact, index) => {
                                                return (
                                                    <div key={contact + "" + index} className='w-full rounded-md group h-full bg-white text-black flex items-center justify-center flex-col border-2 border-solid border-[gold] p-3 gap-3 text-lg'>
                                                        <div className='grid gap-3 lg:gap-2 grid-cols-1 justify-items-start w-full h-full'>
                                                            <div className=''>
                                                                <div><span className='text-xl font-bold'>Sr. No.:</span> {index + 1}</div>
                                                            </div>
                                                            <div className=''>
                                                                <div><span className='text-xl font-bold'>Contact id:</span> {contact.id}</div>
                                                            </div>
                                                            <div className=''>
                                                                <div><span className='text-xl font-bold'>Name:</span> {contact.name}</div>
                                                            </div>
                                                            <div className=''>
                                                                <div><span className='text-xl font-bold'>Email:</span> {contact.email}</div>
                                                            </div>
                                                            <div className=''>
                                                                <div><span className='text-xl font-bold'>Phone:</span> {contact.phone}</div>
                                                            </div>
                                                            <div className=''>
                                                                <div><span className='text-xl font-bold'>Created At:</span> {contact.createdAt}</div>
                                                            </div>
                                                        </div>
                                                        <hr className='w-full h-[2px] bg-black hidden group-hover:block' />
                                                        <div className='hidden group-hover:flex justify-center items-center gap-5'>
                                                            <button onClick={()=>{setContactModal(true); setContactViewNo(index)}} className='px-5 py-2 bg-gradient-to-b from-blue-700 to-blue-900 rounded-md hover:bg-gradient-to-t text-white font-bold flex justify-center items-center gap-2'><FaEye className='text-xl' /><p className='hidden sm:block'>View</p></button>
                                                            <button onClick={() => deleteContact(contact.id, index)} className='px-5 py-2 bg-gradient-to-b from-blue-700 to-blue-900 rounded-md hover:bg-gradient-to-t text-white font-bold flex justify-center items-center gap-2'><MdDelete className='text-xl' /><p className='hidden sm:block'>Delete</p></button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            :
                                            <div className='text-xl text-white'>No Contacts created</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            :
            <ContactModal contacts={filteredContacts}/>}
        </div>
    )
}
