const userModel = require("../models/User");
const feedbackModel = require("../models/Feedback");
const resultModel = require("../models/Result");
const storyTestModel = require("../models/StoryTest");
const contactModel = require("../models/Contact");

const getWebsiteInfo = async (req, res)=>{
    try {
        let user = await userModel.findOne({ email: req.user.email }).select('-password -_v');
        if (!user) {
            return res.status(400).json({ status: false, message: "No user exists", error: "No user exists" });
        }
        if (req.user.uid !== user.firebaseId) {
            return res.status(401).json({ status: false, message: "Unauthorized", error: "Unauthorized" });
        }
        if (user.userType !== 'admin') {
            return res.status(401).json({ status: false, error: "Unauthorized", message: "User not authorized to delete the contact" });
        }
        const userInfo = await userModel.find().countDocuments();
        const feedbackInfo = await feedbackModel.find().select({_id: 1, rating: 1, createdAt: 1}).sort({createdAt: -1});
        const resultInfo = await resultModel.find().countDocuments();
        const testInfo = await storyTestModel.find().countDocuments();
        const contactInfo = await contactModel.find().select({_id: 1, name: 1, email: 1, subject: 1, createdAt: 1}).sort({createdAt: -1});;
        res.status(200).json({status: true, userInfo, feedbackInfo, resultInfo, testInfo, contactInfo});
    } catch (error) {
        res.status(500).json({ status: false, error, message: "Something went wrong" });
    }
}

module.exports = {getWebsiteInfo};