const mongoose = require("mongoose");
const { exec } = require("child_process");
const resultModel = require("../models/Result");

async function getNextDifficulty(attempts, timeTaken) {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ attempts, time_taken_ms: timeTaken }),
    });
  
    const data = await response.json();
    return data.next_difficulty;
  }
  
  // Example Usage
  // getNextDifficulty(15, 1200000).then((difficulty) => console.log(difficulty));


//pip install numpy hmmlearn -> install next time

const predictDifficulty = async (req, res) => {
    const result = await resultModel.findById(req.params.resultId).select("challengesProgress");
    const difficultyHistory = [];
    const timeTaken = [];
    const attempts = [];
    challengesProgress.forEach((challenge)=>{
        difficultyHistory.push(challenge.difficulty);
        timeTaken.push(challenge.timeTaken);
        attempts.push(challenge.attempts);
    })
    
}

module.exports = {predictDifficulty}
