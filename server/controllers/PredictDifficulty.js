const mongoose = require("mongoose");
const resultModel = require("../models/Result");

const predictDifficulty = async (timeTaken, attempts, difficultyLevel) => {
    difficulty = difficultyLevel === 'easy' ? 0 : difficultyLevel === 'medium' ? 1 : 2;
    console.log({timeTaken, attempts, difficultyLevel})
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

module.exports = {predictDifficulty}
