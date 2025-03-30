const mongoose = require("mongoose");
const { exec } = require("child_process");
const resultModel = require("../models/Result");

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
