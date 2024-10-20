import React from "react";

export const WelcomeNotice2 = () => {
    return (
        <div className="bg-[#99daf8] flex flex-row justify-center w-full">
            <div className="bg-[#99daf8] w-screen h-screen relative">
                <div className="absolute w-screen h-screen font-serif">
                    <img
                        className="absolute w-[200%] h-[100%] bottom-0 object-cover"
                        alt="Links scaled"
                        src="./links-scaled.png"
                    />
                    <img
                        className="absolute w-[1300px] h-fit bottom-0 right-0 object-cover"
                        alt="Rechts scaled"
                        src="./rechts-scaled.png"
                    />
                    <p className="absolute w-[1200px] top-[50px] left-0 right-0 mx-auto font-bold font-serif text-black text-3xl text-center tracking-[0] leading-[normal]">
                        <p className="font-serif">
                            Before you step into the magical realm, you need to establish your identity within the Wizarding World’s
                            central database. This crucial step ensures you have access to all the magical services and resources
                            you&#39;ll need. 
                            <br />
                            <br />
                            As you prepare to begin your adventure, you must create a user profile in the Wizarding World Database.
                            Input your name to set up your profile and gain entry to the magical services.
                            <br />
                        </p>
                        <span className="font-serif">
                            <br />
                            Your Magical Journey Begins
                        </span>
                    </p>
                </div>
                <div className="absolute top-[400px] left-0 right-0 mx-auto w-fit h-fit">
                    <button className="px-20 py-2 font-bold text-xl bg-gray-500 rounded-lg hover:shadow-lg hover:scale-[1.02] transition duration-200 active:bg-gray-600">Start</button>
                </div>
            </div>
        </div>
    )
};