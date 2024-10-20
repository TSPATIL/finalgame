import React from 'react'

export default function Loading() {
    return (
        <div>
            {/* <div className="w-screen h-screen overflow-hidden">
                <div className="">
                    <div className={`w-screen h-screen bg-[url(/rectangle-28.jpeg)] bg-cover`}>
                        <div className='bg-black px-10 py-10 relative top-[500px] left-0 right-0 mx-auto bg-opacity-80'>
                            <p className="font-normal text-white text-center text-2xl tracking-[0] leading-[normal] space-y-3">
                                <span className='block'>Days have flown by in a blur of SQL and magic.</span>
                                <span className='block'>You&#39;ve been honing your skills, mastering queries, and diving deep into the Wizarding World of data.</span>
                            </p>
                        </div>
                        <div>
                            <img className='w-[125px] h-[125px] relative top-[270px] left-0 right-0 mx-auto' src="./owl.png" alt="" />
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="w-screen h-screen overflow-hidden">
                <div className="">
                    <div className={`w-screen h-screen bg-[url(/gringotts.png)] bg-cover`}>
                        <div className='bg-black px-10 py-10 relative top-[500px] left-0 right-0 mx-auto bg-opacity-80'>
                            <p className="font-normal text-white text-center text-2xl tracking-[0] leading-[normal] space-y-3">
                                <span className='block'>You and Hagrid arrive at Gringotts Wizarding Bank. The grand lobby is bustling with witches and wizards handling their banking affairs. </span>
                                <span className='block'>Hagrid guides you to a magical terminal where you can apply for a student loan.
                                After loan application submitted you have to check for its status.</span>
                            </p>
                        </div>
                        <div>
                            <img className='w-[200px] h-[125px] relative top-[240px] left-0 right-0 mx-auto' src="./hogwartsymbol.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

