import React from "react";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="About">
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black flex items-center justify-center p-6 text-white text-justify">
        <div className="max-w-3xl bg-purple-800 bg-opacity-70 p-8 rounded-2xl shadow-2xl border border-yellow-400">
          <h1 className="text-5xl font-extrabold text-yellow-400 mb-4 text-center">About Us</h1>
          <p className="text-lg mb-4 leading-relaxed">
            Welcome to <span className="font-semibold text-yellow-300">QueryCraft</span>, the enchanted realm where knowledge meets magic!
            Step into a world of mystical quizzes and spellbinding challenges designed to test your wits and wisdom.
          </p>
          <p className="text-lg mb-4 leading-relaxed">
            At <span className="font-semibold text-yellow-300">QueryCraft</span>, we believe that learning should be as thrilling as a wizard’s duel.
            That’s why we’ve conjured a platform where you can cast spells of knowledge, brew potions of wisdom, and challenge
            fellow sorcerers to rise through the ranks of our magical leaderboard.
          </p>
          <p className="text-lg mb-4 leading-relaxed">
            Whether you seek the secrets of ancient history, the mysteries of science, or the legends of pop culture, our vast library
            of quizzes holds the keys to countless enchanted realms. With themed challenges, special events, and ever-evolving magic,
            the adventure never ends!
          </p>
          <p className="text-lg leading-relaxed text-center font-semibold text-yellow-300">
            Ready to embark on your magical journey? Join <span className="text-yellow-400">QueryCraft</span> and let the magic of learning begin!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;