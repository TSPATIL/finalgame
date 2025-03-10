import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginModal() {
    return (
        <div className='LoginModal'>
            <div className='fixed top-0 h-screen w-screen bg-white opacity-20'></div>
            <div className='login-modal'>
                <div className='h-[300px] w-[600px] fixed top-0 bottom-0 left-0 right-0 m-auto rounded-xl shadow-lg shadow-slate-800 bg-white flex justify-center items-center'>
                    <div className='flex justify-center items-center flex-col gap-8'>
                        <p className='text-2xl'>Your are not login. Login to continue.</p>
                        <li className='list-none text-xl hover:scale-105 hover:shadow-lg hover:shadow-black transition duration-300'><Link className='px-10 py-3 bg-black text-white rounded-md' to="/login">Login</Link></li>
                    </div>
                </div>
            </div>
        </div>
    )
}
