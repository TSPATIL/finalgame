// const { gridfsBucket } = require("../configs/configGridFS");
const { mongoose } = require("mongoose");
const { getGridFSBucket } = require("../configs/dbConnection");
const storyTestModel = require("../models/StoryTest");
const userModel = require("../models/User")
const { Readable } = require("stream");
const resultModel = require("../models/Result");
const { predictDifficulty } = require("./PredictDifficulty");

// const createTestStory = async (req, res) => {
//     try {
//         //user validation
//         let user = await userModel.findOne({ email: req.user.email }).select('-password -_v');
//         if (!user) {
//             return res.status(400).json({ status: false, message: "No user exists", error: "No user exists" });
//         }
//         if (user.userType !== 'admin' || req.user.uid !== user.firebaseId) {
//             return res.status(401).json({ status: false, message: "Unauthorized", error: "Unauthorized" });
//         }

//         console.log(req.body)
//         req.files.forEach((file) => {
//             const fieldName = file.fieldname;
//             const match = fieldName.match(/\[(\d+)\]\[previousStory\]\[image\]/);
//             if (match) {
//                 req.body.challenges[match[1]].previousStory.image = file.buffer;
//                 // if(req.body.challenges[match[1]].previousStory.image) req.body.challenges[match[1]].previousStory.image =  Buffer.from(req.body.challenges[match[1]].previousStory.image, 'base64');
//             }

//             const matchNext = fieldName.match(/\[(\d+)\]\[postStory\]\[image\]/);
//             if (matchNext) {
//                 req.body.challenges[matchNext[1]].postStory.image = file.buffer;
//                 // if(req.body.challenges[match[1]].nextStory.image) req.body.challenges[match[1]].nextStory.image =  Buffer.from(req.body.challenges[match[1]].nextStory.image, 'base64');
//             }
//         });

//         req.body.createdBy = user._id;

//         const test = new storyTestModel(
//             req.body
//         );

//         const savedTest = await test.save();

//         res.status(201).json({status: true, message: "Test created successfully", data: savedTest})
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: false, error, message: 'Internal server error', error });
//     }
// }

const createTestStory = async (req, res) => {
    try {
        const gridfsBucket = getGridFSBucket();
        if (!gridfsBucket) {
            return res.status(500).json({ status: false, message: "GridFSBucket not initialized" });
        }
        let user = await userModel.findOne({ email: req.user.email }).select("userType firebaseId");
        if (!user) {
            return res.status(400).json({ status: false, message: "No user exists" });
        }
        if (user.userType !== "admin" || req.user.uid !== user.firebaseId) {
            return res.status(401).json({ status: false, message: "Unauthorized" });
        }
        // if (req.params.type === 'Story-Based-Test') {
        console.log("hello")
        await Promise.all(req.files.map(async (file) => {

            const { fieldname, buffer, originalname, mimetype } = file;

            // Convert file buffer to a readable stream
            const readableStream = new Readable();
            readableStream.push(buffer);
            readableStream.push(null);

            // Upload file to GridFS
            const uploadStream = gridfsBucket.openUploadStream(originalname, { contentType: mimetype });
            readableStream.pipe(uploadStream);

            // Wait for upload to finish and get the file ID
            await new Promise((resolve, reject) => {
                uploadStream.on("finish", async () => {
                    const fileId = uploadStream.id.toString(); // New GridFS file ID

                    const matchPrev = fieldname.match(/\[(\d+)\]\[previousStory\]\[image\]/);
                    const matchPost = fieldname.match(/\[(\d+)\]\[postStory\]\[image\]/);

                    if (matchPrev) {
                        const index = matchPrev[1];
                        // req.body.challenges[index] = req.body.challenges[index] || {};
                        // req.body.challenges[index].postStory = req.body.challenges[index].postStory || {};

                        req.body.challenges[index].previousStory.image = fileId;
                    }

                    if (matchPost) {
                        const index = matchPost[1];

                        // req.body.challenges[index] = req.body.challenges[index] || {};
                        // req.body.challenges[index].postStory = req.body.challenges[index].postStory || {};

                        req.body.challenges[index].postStory.image = fileId;
                    }

                    resolve();
                });

                uploadStream.on("error", (err) => reject(err));
            });
        }));

        req.body.challenges.forEach((challenge, index) => {
            if (challenge.previousStory?.image) {
                if (challenge.previousStory.image === 'null') {
                    req.body.challenges[index].previousStory.image = null;
                } else if (typeof challenge.previousStory.image === "string") {
                    req.body.challenges[index].previousStory.image = challenge.previousStory.image;
                }
            }
            if (challenge.postStory?.image) {
                if (challenge.postStory.image === 'null') {
                    req.body.challenges[index].postStory.image = null;
                } else if (typeof challenge.postStory.image === "string") {
                    req.body.challenges[index].postStory.image = challenge.postStory.image;
                }
            }
        });

        req.body.createdBy = user._id;
        const test = new storyTestModel(req.body);
        await test.save();
        // }
        // else if (req.params.type === 'MCQ-based-Test') {

        // }
        // else {
        //     return res.status(400).json({ status: false, message: "Test Type does not available", error: "Test Type does not available" })
        // }
        res.status(201).json({ status: true, message: "Test created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal server error", error });
    }
};

const getAllTests = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }).select('-password -_v');
        if (!user) {
            return res.status(400).json({ status: false, message: "No user exists", error: "No user exists" });
        }
        if (user.userType !== 'admin' || req.user.uid !== user.firebaseId) {
            return res.status(401).json({ status: false, message: "Unauthorized", error: "Unauthorized" });
        }
        const tests = await storyTestModel.find().select('-challenges -totalPoints -_v');
        res.status(200).json({ status: true, message: "Test Fetched Successfully", data: tests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error, message: 'Internal server error', error });
    }
}

const getTestsById = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }).select('-password -_v');
        if (!user) {
            return res.status(400).json({ status: false, message: "No user exists", error: "No user exists" });
        }
        if (user.userType !== 'admin' || req.user.uid !== user.firebaseId) {
            return res.status(401).json({ status: false, message: "Unauthorized", error: "Unauthorized" });
        }
        let test = null;
        if (req.params.type === 'Story-Based-Test') {
            test = await storyTestModel.findById(req.params.id);
        }
        else if (req.params.type === 'MCQ-based-Test') {

        }
        else {
            return res.status(400).json({ status: false, message: "Test Type does not available", error: "Test Type does not available" })
        }
        res.status(200).json({ status: true, message: "Test Fetched Successfully", data: test });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error, message: 'Internal server error', error });
    }
}

const deleteTestById = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }).select('userType firebaseId');
        if (!user) {
            return res.status(400).json({ status: false, message: "No user exists", error: "No user exists" });
        }
        if (user.userType !== 'admin' || req.user.uid !== user.firebaseId) {
            return res.status(401).json({ status: false, message: "Unauthorized", error: "Unauthorized" });
        }
        if (req.params.type === 'Story-Based-Test') {
            const test = await storyTestModel.findById(req.params.id);
            if (!test) {
                return res.status(400).json({ status: false, error: "Test not found", message: "Test not found" })
            }
            await storyTestModel.findByIdAndDelete(req.params.id);
        }
        else if (req.params.type === 'MCQ-based-Test') {

        }
        else {
            return res.status(400).json({ status: false, message: "Test Type does not available", error: "Test Type does not available" })
        }
        res.status(200).json({ status: true, message: "Test Deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error, message: 'Internal server error', error });
    }
}

// const updateTestById = async (req, res)=>{
//     try {
//         let user = await userModel.findOne({ email: req.user.email }).select('userType firebaseId');
//         if (!user) {
//             return res.status(400).json({ status: false, message: "No user exists", error: "No user exists" });
//         }
//         if (user.userType !== 'admin' || req.user.uid !== user.firebaseId) {
//             return res.status(401).json({ status: false, message: "Unauthorized", error: "Unauthorized" });
//         }
//         if(req.params.type === 'Story-Based-Test'){
//             const test = await storyTestModel.findById(req.params.id);
//             if(!test){
//                 return res.status(400).json({ status: false, error: "Test not found", message: "Test not found" })
//             }
//             req.files.forEach((file) => {
//                 const fieldName = file.fieldname;
//                 const match = fieldName.match(/\[(\d+)\]\[previousStory\]\[image\]/);
//                 if (match) {
//                     req.body.challenges[match[1]].previousStory.image = file.buffer;
//                 }

//                 const matchNext = fieldName.match(/\[(\d+)\]\[postStory\]\[image\]/);
//                 if (matchNext) {
//                     req.body.challenges[matchNext[1]].postStory.image = file.buffer;
//                 }
//             });

//     req.body.createdBy = user._id;

//     await storyTestModel.findByIdAndUpdate(req.params.id, req.body)            
// }
// else if(req.params.type === 'MCQ-based-Test'){

// }
// else{
//     return res.status(400).json({status: false, message: "Test Type does not available", error: "Test Type does not available"})
// }
//         res.status(200).json({ status: true, message: "Test Updated Successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: false, error, message: 'Internal server error', error });
//     }
// }

const updateTestById = async (req, res) => {
    try {
        const gridfsBucket = getGridFSBucket();
        if (!gridfsBucket) {
            return res.status(500).json({ status: false, message: "GridFSBucket not initialized" });
        }
        let user = await userModel.findOne({ email: req.user.email }).select("userType firebaseId");
        if (!user) {
            return res.status(400).json({ status: false, message: "No user exists" });
        }
        if (user.userType !== "admin" || req.user.uid !== user.firebaseId) {
            return res.status(401).json({ status: false, message: "Unauthorized" });
        }
        // console.log(req.body.challenges)
        if (req.params.type === 'Story-Based-Test') {
            const test = await storyTestModel.findById(req.params.id);
            if (!test) {
                return res.status(400).json({ status: false, message: "Test not found" });
            }
            await Promise.all(req.files.map(async (file) => {

                const { fieldname, buffer, originalname, mimetype } = file;

                // Convert file buffer to a readable stream
                const readableStream = new Readable();
                readableStream.push(buffer);
                readableStream.push(null);

                // Upload file to GridFS
                const uploadStream = gridfsBucket.openUploadStream(originalname, { contentType: mimetype });
                readableStream.pipe(uploadStream);

                // Wait for upload to finish and get the file ID
                await new Promise((resolve, reject) => {
                    uploadStream.on("finish", async () => {
                        const fileId = uploadStream.id.toString(); // New GridFS file ID

                        const matchPrev = fieldname.match(/\[(\d+)\]\[previousStory\]\[image\]/);
                        const matchPost = fieldname.match(/\[(\d+)\]\[postStory\]\[image\]/);

                        if (matchPrev) {
                            const index = matchPrev[1];

                            // Delete old image from GridFS
                            const oldImageId = test.challenges[index]?.previousStory?.image;
                            if (oldImageId) {
                                await gridfsBucket.delete(new mongoose.Types.ObjectId(oldImageId));
                            }
                            // req.body.challenges[index] = req.body.challenges[index] || {};
                            // req.body.challenges[index].postStory = req.body.challenges[index].postStory || {};

                            req.body.challenges[index].previousStory.image = fileId;
                        }

                        if (matchPost) {
                            const index = matchPost[1];

                            // Delete old image from GridFS
                            const oldImageId = test.challenges[index]?.postStory?.image;
                            if (oldImageId) {
                                await gridfsBucket.delete(new mongoose.Types.ObjectId(oldImageId));
                            }

                            // req.body.challenges[index] = req.body.challenges[index] || {};
                            // req.body.challenges[index].postStory = req.body.challenges[index].postStory || {};

                            req.body.challenges[index].postStory.image = fileId;
                        }

                        resolve(); // Resolve the promise
                    });

                    uploadStream.on("error", (err) => reject(err));
                });
            }));

            // Handle GridFS ID updates (without new file uploads)
            req.body.challenges.forEach((challenge, index) => {
                if (challenge.previousStory?.image) {
                    if (challenge.previousStory.image === 'null') {
                        req.body.challenges[index].previousStory.image = null;
                    } else if (typeof challenge.previousStory.image === "string") {
                        req.body.challenges[index].previousStory.image = challenge.previousStory.image;
                    }
                }
                if (challenge.postStory?.image) {
                    if (challenge.postStory.image === 'null') {
                        req.body.challenges[index].postStory.image = null;
                    } else if (typeof challenge.postStory.image === "string") {
                        req.body.challenges[index].postStory.image = challenge.postStory.image;
                    }
                }
            });

            // Update the rest of the test
            req.body.createdBy = user._id;
            await storyTestModel.findByIdAndUpdate(req.params.id, req.body)
        }
        else if (req.params.type === 'MCQ-based-Test') {

        }
        else {
            return res.status(400).json({ status: false, message: "Test Type does not available", error: "Test Type does not available" })
        }
        res.status(200).json({ status: true, message: "Test Updated Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal server error", error });
    }
};

const getImage = async (req, res) => {
    try {
        const gridfsBucket = getGridFSBucket();
        if (!gridfsBucket) {
            return res.status(500).json({ status: false, message: "GridFSBucket not initialized" });
        }

        const fileId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(fileId)) {
            return res.status(400).json({ status: false, message: "Invalid file ID" });
        }

        const file = await gridfsBucket.find({ _id: new mongoose.Types.ObjectId(fileId) }).toArray();

        if (!file || file.length === 0) {
            return res.status(404).json({ status: false, message: "File not found" });
        }

        res.set("Content-Type", file[0].contentType);
        const downloadStream = gridfsBucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));

        downloadStream.pipe(res);

        downloadStream.on("error", (err) => {
            res.status(500).json({ status: false, message: "Error streaming file", error: err });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal server error", error });
    }
};

const getTestAndResults = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }).select('-password -_v');
        if (!user) {
            return res.status(400).json({ status: false, message: "No user exists", error: "No user exists" });
        }
        if (req.user.uid !== user.firebaseId) {
            return res.status(401).json({ status: false, message: "Unauthorized", error: "Unauthorized" });
        }
        const tests = await storyTestModel.find().select('-challenges -totalPoints -_v');
        const results = await resultModel.find({ userId: user._id }).select('_id testId type title topic currentChallengeNo totalActualChallenges status start_time end_time');
        res.status(200).json({ status: true, message: "Test Fetched Successfully", data: { tests, results } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error, message: 'Internal server error', error });
    }
}

const createTestResult = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }).select('-password -_v');
        if (!user) {
            return res.status(400).json({ status: false, message: "No user exists", error: "No user exists" });
        }
        if (req.user.uid !== user.firebaseId) {
            return res.status(401).json({ status: false, message: "Unauthorized", error: "Unauthorized" });
        }
        const test = await storyTestModel.findById(req.params.testId).select('_id title topic type challenges');
        if (test.type !== req.params.type) {
            return res.status(400).json({ status: false, message: "Test not found", error: "Test not found" });
        }
        const query = "";
        const queryOutput = "";
        const result = await resultModel({
            userId: user._id,
            testId: test._id,
            title: test.title,
            topic: test.topic,
            type: test.type,
            totalActualChallenges: test.challenges?.length || 0,
            codeExecutionHistory: [{
                code: query,
                output: queryOutput,
                executor: "server"
            }],
            challengesProgress: [{
                difficulty: "easy",
                attempts: 0
            }]
        });
        const savedResult = await result.save();
        res.status(201).json({ status: true, message: "Test Session Created", resultId: savedResult._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error, message: 'Internal server error', error });
    }
}

const fetchTestCurrentChallenge = async (req, res) => {
    try {
        const result = await resultModel.findById(req.params.resultId).select('currentChallengeNo testId totalActualChallenges codeExecutionHistory challengesProgress startTime'); 
        if (!result) {
            return res.status(400).json({ status: false, message: "Invalid Test Session ID", error: "Invalid Test Session ID" })
        }
        if(result.currentChallengeNo === result.totalActualChallenges){
            await resultModel.findByIdAndUpdate(req.params.resultId, {$set: {[`status`]: "Passed"}})
            return res.status(200).json({status: true, message: "You have successfully completed the test."})
        }
        if((Date.now() - new Date(result.startTime).getTime()) > 24*60*60*1000){
            await resultModel.findByIdAndUpdate(req.params.resultId, {$set: {[`status`]: "Failed"}})
            return res.status(200).json({status: true, message: "You cannot complete test within time limit"});
        }
        const test = await storyTestModel.findOne(
            { _id: result.testId },
            { challenges: { $slice: [result.currentChallengeNo, 1] } }
        )
        if (!test) {
            return res.status(400).json({ status: false, message: "Invalid Test ID", error: "Invalid Test ID" })
        }
        if (!test.challenges.length) {
            return res.status(400).json({ status: false, message: "Challenge Not Found", error: "Challenge Not Found" })
        }
        let difficulty = result.challengesProgress[result.currentChallengeNo].difficulty;
        difficulty = difficulty === 'easy' ? 0 : difficulty === 'medium' ? 1 : 2;
        const currentChallenge = test.challenges[0];
        const currentChallengeData = {
            challengeNo: result.currentChallengeNo,
            codeExecutionHistory: result.codeExecutionHistory,
            title: currentChallenge.title,
            previousStory: currentChallenge.previousStory,
            postStory: currentChallenge.postStory,
            question: currentChallenge.questions[difficulty]?.question || "",
            difficulty: currentChallenge.questions[difficulty]?.difficulty || "",
            constraints: currentChallenge.questions[difficulty]?.constraints || "",
            keywords: currentChallenge.questions[difficulty]?.keywords || "",
            example: currentChallenge.questions[difficulty]?.example || [],
            teachings: currentChallenge.teachings,
        }
        res.status(200).json({ status: true, message: "Challenge fetched successfully", data: currentChallengeData })
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error, message: 'Internal server error', error });
    }
}

const submitChallenge = async (req, res) => {
    try {
        const result = await resultModel.findById(req.params.resultId).select('currentChallengeNo testId challengesProgress totalActualChallenges');
        if (!result) {
            return res.status(400).json({ status: false, message: "Invalid Test Session ID", error: "Invalid Test Session ID" })
        }
        const test = await storyTestModel.findOne(
            { _id: result.testId },
            { 
                challenges: { $slice: [result.currentChallengeNo, 1] },
            }
        )
        if (!test) {
            return res.status(400).json({ status: false, message: "Invalid Test ID", error: "Invalid Test ID" })
        }
        if (!test.challenges.length) {
            return res.status(400).json({ status: false, message: "Challenge Not Found", error: "Challenge Not Found" })
        }
        const { question, answer, difficulty, constraints, keywords } = req.body;
        const isCorrect = test.challenges[0].questions[difficulty === 'easy' ? 0 : difficulty === 'medium' ? 1 : 2].answer === answer
        let updateQuery = {}
        if(result.challengesProgress[result.currentChallengeNo]){
            updateQuery.$inc = {[`challengesProgress.${result.currentChallengeNo}.attempts`]: 1};
        }
        // else{
        //     updateQuery.$push = {
        //         challengesProgress: {
        //             $each: [{
        //                 difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random()*(2-0+1))+0],
        //                 attempts: 1,
        //             }],
        //             $position: result.currentChallengeNo
        //         }
        //     }
        // }
        await resultModel.findByIdAndUpdate(req.params.resultId, updateQuery);
        updateQuery = {}
        if(isCorrect){
            const endDate = Date.now();
            updateQuery.$set = {
                [`challengesProgress.${result.currentChallengeNo}.question`]: question,
                [`challengesProgress.${result.currentChallengeNo}.answer`]: answer,
                [`challengesProgress.${result.currentChallengeNo}.pointEarned`]: 100,
                [`challengesProgress.${result.currentChallengeNo}.constraints`]: constraints,
                [`challengesProgress.${result.currentChallengeNo}.keywords`]: keywords,
                [`challengesProgress.${result.currentChallengeNo}.endTime`]: endDate,
                [`challengesProgress.${result.currentChallengeNo}.timeTaken`]: endDate - new Date(result.challengesProgress[result.currentChallengeNo].startTime).getTime(),
            };
            updateQuery.$inc = {};
            updateQuery.$inc.currentChallengeNo = 1;
        }
        const query = answer;
        const queryOutput = '';
        if (query) {
            updateQuery.$push = {};
            updateQuery.$push.codeExecutionHistory = {
                code: query,
                output: queryOutput,
                executor: "user"
            };
        }
        console.log(updateQuery);
        await resultModel.findByIdAndUpdate(req.params.resultId, updateQuery);
        if(isCorrect){
            if(result.currentChallengeNo + 1 < result.totalActualChallenges){
                const nextTest = await storyTestModel.findOne(
                    { _id: result.testId },
                    { 
                        challenges: { $slice: [result.currentChallengeNo+1, 1] },
                    }
                )
                
                const response = await predictDifficulty(result.challengesProgress);
                let difficulty = response.nextDifficulty;
                if(response.error){
                    console.log(error);
                    difficulty = result.challengesProgress[result.currentChallengeNo].difficulty
                }
                await resultModel.findByIdAndUpdate(req.params.resultId, {
                    $push: {
                        [`codeExecutionHistory`]: {
                            code: nextTest.challenges.codeExecution,
                            output: "",
                            executer: "server"
                        },
                        [`challengesProgress`]: {
                            $each: [{
                                difficulty: difficulty,
                                attempts: 1,
                            }],
                            $position: result.currentChallengeNo+1
                        }
                    }
                });
            }
            res.status(200).json({status: true, message: "Answer is correct"});
        }
        else{
            res.status(200).json({status: true, message: "Answer is incorrect", error: "Answer is incorrect"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error, message: 'Internal server error', error });
    }
}

module.exports = { createTestStory, getAllTests, getTestsById, deleteTestById, updateTestById, getImage, getTestAndResults, createTestResult, fetchTestCurrentChallenge, submitChallenge };