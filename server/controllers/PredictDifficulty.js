const mongoose = require("mongoose");
const { exec } = require("child_process");
const resultModel = require("../models/Result");

//pip install numpy hmmlearn -> install next time

const predictDifficulty = async (challengesProgress) => {
    // const result = await resultModel.findById(req.params.resultId).select("challengesProgress");
    const difficultyHistory = [];
    const timeTaken = [];
    const attempts = [];
    challengesProgress.forEach((challenge)=>{
        difficultyHistory.push(challenge.difficulty);
        timeTaken.push(challenge.timeTaken);
        attempts.push(challenge.attempts);
    })
    // Call Python script with user data
    // exec(`python3 server/predict_helper/predict.py '${JSON.stringify({difficultyHistory, timeTaken, attempts})}'`, (error, stdout) => {
    //     if (error) {
    //         return res.status(500).json({ error: error.message });
    //     }

    //     try {
    //         const prediction = JSON.parse(stdout);
    //         res.json(prediction);
    //     } catch (parseError) {
    //         res.status(500).json({ error: "Invalid JSON response from Python" });
    //     }
    // });
    exec(`python3 server/predict_helper/predict.py '${JSON.stringify({difficultyHistory, timeTaken, attempts})}'`, (error, stdout) => {
        if (error) {
            return { error: error.message };
        }

        try {
            const prediction = JSON.parse(stdout);
            return prediction;
        } catch (parseError) {
            return { error: "Invalid JSON response from Python" };
        }
    });
}

module.exports = {predictDifficulty}
