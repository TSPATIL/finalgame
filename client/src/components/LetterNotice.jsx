import React from 'react'

export default function LetterNotice() {
    return (
        <div className='w-screen h-screen bg-black'>
            <div className='w-full h-full bg-[url(/harryhouse2.jpeg)] bg-cover bg-no-repeat'>
                <div className='top-20 w-fit h-fit absolute left-0 right-0 mx-auto z-10'>
                    <img className='w-[400px]' src="./letter.png" alt="" />
                </div>
                <div className='absolute w-fit h-fit top-24 left-[375px]'>
                    <img className='w-[300px]' src="./envelope.png" alt="" />
                </div>
                <div className='absolute w-fit h-fit top-24 left-0 right-0 mx-auto z-20'>
                    <img className='w-[100px]' src="./hogwartsymbol.png" alt="" />
                </div>
                <div className='absolute w-fit h-fit left-0 right-0 mx-auto top-44 z-30'>
                    <div className='text-justify w-[350px] text-sm space-y-2'>
                        <p>Dear [Player's Name],</p>
                        <p>We are delighted to inform you that you have been accepted to Hogwarts School of SQL.</p>
                        <p>Congratulations on your admission!
                        Before the commencement of the school term, you are required to procure the necessary items from Diagon Alley.</p>
                        <p>You may seek assistance from Hagrid, the Keeper of Keys and Grounds at Hogwarts, who will guide you through the process.</p>
                        <p>Please refer to the enclosed list for details on required textbooks and equipment. Should you require financial assistance, student loans are available to cover expenses.</p>
                        <p>Further information on loan applications can be found enclosed with this letter.We eagerly await your arrival at Platform 9¾ on September 1st. Please ensure you arrive promptly to catch the Hogwarts Express.</p>
                        <p>Best regards,</p>
                        <p>[Professor's Name]
                        Head of Hogwarts School of SQL</p>
                    </div>
                </div>
                <div className='w-fit h-fit absolute bottom-10 right-10'>
                    <button className='px-16 py-2 bg-black text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-gray-300 active:bg-gray-900'>Continue</button>
                </div>
            </div>
        </div>
    )
}
