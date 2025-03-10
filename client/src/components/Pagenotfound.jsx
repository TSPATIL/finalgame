import React from 'react'
import {Link} from 'react-router-dom'
export default function Pagenotfound() {

    return (
        <div className={`Pagenotfound h-screen`}>
            <div className="min-h-screen flex flex-grow items-center justify-center">
                <div className="text-center fixed z-10">
                    <h1 className="text-9xl text-[gold] font-bold">404</h1>
                    <p className="text-white text-5xl font-bold">Oops! Page Not Found.</p>
                    <Link to="/" className="mt-8 text-2xl inline-block rounded shadow-inner bg-gradient-to-b from-orange-600 to-orange-700 px-4 py-2 hover:scale-95 hover:shadow-2xl transition duration-300 font-semibold text-white"> Go back to Home </Link>
                </div>
            </div>
            <img src="./pagenotfound.avif" alt="page-not-found" className='w-screen h-screen fixed top-0 z-0 opacity-95'/>
        </div >
    )
}
