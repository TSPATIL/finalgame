// const { gridfsBucket } = require("../configs/configGridFS");
const { mongoose } = require("mongoose");
const { getGridFSBucket } = require("../configs/dbConnection");
const storyTestModel = require("../models/StoryTest");
const userModel = require("../models/User")
const { Readable } = require("stream");

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
        res.status(201).json({ status: true, message: "Test created successfully"});
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

module.exports = { createTestStory, getAllTests, getTestsById, deleteTestById, updateTestById, getImage };