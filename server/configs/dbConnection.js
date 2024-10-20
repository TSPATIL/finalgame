const mongoose = require('mongoose');

const connectToDatabase = (url)=>{
    mongoose.connect(url)
    .then((response)=>{
        console.log("Connected to Database successfully");
    }).catch((error)=>{
        console.log("Error Occured " + error);
    })
}

module.exports = {connectToDatabase};