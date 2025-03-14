const storyTestModel = require("../models/StoryTest");
const userModel = require("../models/User")

const createTestStory = async (req, res) => {
    try {
        //user validation
        let user = await userModel.findOne({ email: req.user.email }).select('-password -_v');
        if (!user) {
            return res.status(400).json({ status: false, message: "No user exists", error: "No user exists" });
        }
        if (user.userType !== 'admin' || req.user.uid !== user.firebaseId) {
            return res.status(401).json({ status: false, message: "Unauthorized", error: "Unauthorized" });
        }

        console.log(req.body)
        req.files.forEach((file) => {
            const fieldName = file.fieldname;
            const match = fieldName.match(/\[(\d+)\]\[previousStory\]\[image\]/);
            if (match) {
                req.body.challenges[match[1]].previousStory.image = file.buffer;
                // if(req.body.challenges[match[1]].previousStory.image) req.body.challenges[match[1]].previousStory.image =  Buffer.from(req.body.challenges[match[1]].previousStory.image, 'base64');
            }

            const matchNext = fieldName.match(/\[(\d+)\]\[postStory\]\[image\]/);
            if (matchNext) {
                req.body.challenges[matchNext[1]].postStory.image = file.buffer;
                // if(req.body.challenges[match[1]].nextStory.image) req.body.challenges[match[1]].nextStory.image =  Buffer.from(req.body.challenges[match[1]].nextStory.image, 'base64');
            }
        });

        req.body.createdBy = user._id;

        const test = new storyTestModel(
            req.body
        );

        const savedTest = await test.save();

        res.status(201).json({status: true, message: "Test created successfully", data: savedTest})
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error, message: 'Internal server error', error });
    }
}

const getAllTests = async (req, res)=>{
    try {
        let user = await userModel.findOne({ email: req.user.email }).select('-password -_v');
        if (!user) {
            return res.status(400).json({ status: false, message: "No user exists", error: "No user exists" });
        }
        if (user.userType !== 'admin' || req.user.uid !== user.firebaseId) {
            return res.status(401).json({ status: false, message: "Unauthorized", error: "Unauthorized" });
        }
        const tests = await storyTestModel.find().select('-challenges -totalPoints -_v');
        res.status(200).json({status: true, message: "Test Fetched Successfully", data: tests});
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error, message: 'Internal server error', error });
    }
}

const getTestsById = async (req, res)=>{
    try {
        let user = await userModel.findOne({ email: req.user.email }).select('-password -_v');
        if (!user) {
            return res.status(400).json({ status: false, message: "No user exists", error: "No user exists" });
        }
        if (user.userType !== 'admin' || req.user.uid !== user.firebaseId) {
            return res.status(401).json({ status: false, message: "Unauthorized", error: "Unauthorized" });
        }
        let test = null;
        if(req.params.type === 'Story-Based-Test'){
            test = await storyTestModel.findById(req.params.id);
        }
        else if(req.params.type === 'MCQ-based-Test'){

        }
        else{
            return res.status(400).json({status: false, message: "Test Type does not available", error: "Test Type does not available"})
        }
        res.status(200).json({status: true, message: "Test Fetched Successfully", data: test});
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error, message: 'Internal server error', error });
    }
}

const deleteTestById = async (req, res)=>{
    try {
        let user = await userModel.findOne({ email: req.user.email }).select('userType firebaseId');
        if (!user) {
            return res.status(400).json({ status: false, message: "No user exists", error: "No user exists" });
        }
        if (user.userType !== 'admin' || req.user.uid !== user.firebaseId) {
            return res.status(401).json({ status: false, message: "Unauthorized", error: "Unauthorized" });
        }
        if(req.params.type === 'Story-Based-Test'){
            const test = await storyTestModel.findById(req.params.id);
            if(!test){
                return res.status(400).json({ status: false, error: "Test not found", message: "Test not found" })
            }
            await storyTestModel.findByIdAndDelete(req.params.id);
        }
        else if(req.params.type === 'MCQ-based-Test'){

        }
        else{
            return res.status(400).json({status: false, message: "Test Type does not available", error: "Test Type does not available"})
        }
        res.status(200).json({ status: true, message: "Test Deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error, message: 'Internal server error', error });
    }
}

const updateTestById = async (req, res)=>{
    try {
        let user = await userModel.findOne({ email: req.user.email }).select('userType firebaseId');
        if (!user) {
            return res.status(400).json({ status: false, message: "No user exists", error: "No user exists" });
        }
        if (user.userType !== 'admin' || req.user.uid !== user.firebaseId) {
            return res.status(401).json({ status: false, message: "Unauthorized", error: "Unauthorized" });
        }
        if(req.params.type === 'Story-Based-Test'){
            const test = await storyTestModel.findById(req.params.id);
            if(!test){
                return res.status(400).json({ status: false, error: "Test not found", message: "Test not found" })
            }
            req.files.forEach((file) => {
                const fieldName = file.fieldname;
                const match = fieldName.match(/\[(\d+)\]\[previousStory\]\[image\]/);
                if (match) {
                    req.body.challenges[match[1]].previousStory.image = file.buffer;
                }
    
                const matchNext = fieldName.match(/\[(\d+)\]\[postStory\]\[image\]/);
                if (matchNext) {
                    req.body.challenges[matchNext[1]].postStory.image = file.buffer;
                }
            });
    
            req.body.createdBy = user._id;

            await storyTestModel.findByIdAndUpdate(req.params.id, req.body)            
        }
        else if(req.params.type === 'MCQ-based-Test'){

        }
        else{
            return res.status(400).json({status: false, message: "Test Type does not available", error: "Test Type does not available"})
        }
        res.status(200).json({ status: true, message: "Test Updated Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error, message: 'Internal server error', error });
    }
}

module.exports = { createTestStory, getAllTests, getTestsById, deleteTestById, updateTestById };