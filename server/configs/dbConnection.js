const mongoose = require('mongoose');

let gridfsBucket;

const connectToDatabase = (url)=>{
    mongoose.connect(url)
    .then((response)=>{
        console.log("Connected to Database successfully");
        const db = mongoose.connection;

        gridfsBucket = new mongoose.mongo.GridFSBucket(db.db, { bucketName: "testImages" });
        console.log("✅ GridFSBucket Initialized Successfully");

        db.on("error", (err) => console.error("❌ MongoDB Connection Error:", err));
    }).catch((error)=>{
        console.log("Error Occured In MongoDB Connnection" + error);
    })
}

const getGridFSBucket = () => {
    if (!gridfsBucket) {
        throw new Error("❌ GridFSBucket is not initialized yet. Wait for MongoDB connection.");
    }
    return gridfsBucket;
};

module.exports = {connectToDatabase, getGridFSBucket};