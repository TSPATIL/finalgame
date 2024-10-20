import React from "react";
import Signup from "./Signup";
// import effects1 from "./effects1.png";
// import rechtsScaled from "./rechts-scaled.png";
// import wizardFront from "./wizard-front.png";

export const WelcomeNotice1 = () => {
  return (
    <>
    <div className="bg-[#99daf8] flex flex-row justify-center w-full">
      <div className="bg-[#99daf8] w-screen h-fit">
        <div className="relative h-screen bg-[url(/links-scaled.png)] bg-cover bg-[50%_50%]">
          <img
            className="absolute w-[1250px] h-fit bottom-0 left-[61px] object-cover"
            alt="Wizard front"
            src="./wizard-front.png"
          />
          <img
            className="absolute w-[950px] h-fit bottom-0 right-0 object-contain z-10"
            alt="Rechts scaled"
            src="./rechts-scaled.png"
          />
          <img
            className="absolute w-fit h-[350px] bottom-0 right-48 object-cover z-0"
            alt="Effects"
            src="./effects1.png"
          />
          <p className="absolute w-[1200px] top-[45px] left-0 right-0 mx-auto font-bold font-serif text-black text-3xl text-center tracking-[0] leading-[normal]">
            Welcome to your magical adventure where SQL and wizardry unite! Immerse yourself in a world where your love
            for magic and SQL takes center stage. Your journey begins here, with the opportunity to explore enchanted
            locations, solve mystical puzzles, and unlock secrets with the power of database queries.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};
