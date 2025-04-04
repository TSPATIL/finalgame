const mongoose = require("mongoose");
const { exec } = require("child_process");
const resultModel = require("../models/Result");

// async function getNextDifficulty(attempts, timeTaken) {
//     const response = await fetch("http://127.0.0.1:5000/predict", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ attempts, time_taken_ms: timeTaken }),
//     });
  
//     const data = await response.json();
//     return data.next_difficulty;
//   }
  
//   // Example Usage
//   // getNextDifficulty(15, 1200000).then((difficulty) => console.log(difficulty));


// //pip install numpy hmmlearn -> install next time

const predictDifficulty = () => {
    const timeTaken = 100000;
    let difficulty = 'medium'
    difficulty = difficulty === 'easy' ? 0 : difficulty === 'medium' ? 1 : 2;
    const attempts = 2;

    let n = 8;

    if(timeTaken <= 120000){
      if(attempts <= 2){
        n = 0;
      }
      else if(attempts <= 5){
        n = 1;
      }
      else{
        n = 2;
      }
    }
    else if(timeTaken <= 240000){
      if(attempts <= 2){
        n = 3;
      }
      else if(attempts <= 5){
        n = 4;
      }
      else{
        n = 5;
      }
    }
    else{
      if(attempts <= 2){
        n = 6;
      }
      else if(attempts <= 5){
        n = 7;
      }
      else{
        n = 8;
      }
    }

    transitionMatrix = [
      ['hard', 'hard', 'medium', 'medium', 'easy', 'easy', 'easy', 'easy'],
    ['hard', 'hard', 'hard', 'medium', 'medium', 'medium', 'easy', 'easy', 'easy'],
    ['hard', 'hard', 'hard', 'hard', 'hard', 'medium', 'medium', 'medium', 'easy']
  ]
  return transitionMatrix[difficulty][n];
}

console.log(predictDifficulty());

module.exports = {predictDifficulty}
