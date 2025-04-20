const feedbackModel = require("../models/Feedback")
const userModel = require("../models/User")

const addFeedback = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }).select('_id firebaseId');
        if (!user) {
            return res.status(400).json({ status: false, message: "No user exists", error: "No user exists" });
        }
        if (req.user.uid !== user.firebaseId) {
            return res.status(401).json({ status: false, message: "Unauthorized", error: "Unauthorized" });
        }
        console.log(req.body)
        const feedback = await feedbackModel({
            userId: user._id,
            feedback: req.body.feedback,
            resultId: req.body.resultId
        });
        await feedback.save();
        res.status(200).json({ status: true, message: "Feedback Saved Successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: false, error, message: "Feedback unable to save" });
    }
}

const getAllFeedback = async (req, res) => {
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
        const feedbacks = await feedbackModel.find();
        res.status(200).json({ status: true, feedbacks, message: "Feedback fetched successfully" });
    } catch (error) {
        res.status(500).json({ status: false, error, message: "Feedback unable to delete" });
    }
}

const getFeedbackByFeedbackId = async (req, res) => {
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
        const feedbacks = await feedbackModel.findById(req.params.feedbackId);
        res.status(200).json({ status: true, feedbacks, message: "Feedback fetched successfully" });
    } catch (error) {
        res.status(500).json({ status: false, error, message: "Feedback unable to delete" });
    }
}

const getFeedbackByUserId = async (req, res) => {
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
        const feedbacks = await feedbackModel.findMany({ userId: req.params.userId });
        res.status(200).json({ status: true, feedbacks, message: "Feedback fetched successfully" });
    } catch (error) {
        res.status(500).json({ status: false, error, message: "Feedback unable to delete" });
    }
}

const getFeedbackByResultId = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }).select('-password -_v');
        if (!user) {
            return res.status(400).json({ status: false, message: "No user exists", error: "No user exists" });
        }
        if (req.user.uid !== user.firebaseId) {
            return res.status(401).json({ status: false, message: "Unauthorized", error: "Unauthorized" });
        }
        const feedbacks = await feedbackModel.findOne({ resultId: req.params.resultId });
        if(feedbacks)
            res.status(200).json({ status: true, message: "Feedback exists" });
        else
            res.status(200).json({ status: false, message: "Feedback does not exist" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: false, error, message: "Feedback unable to delete" });
    }
}

const deleteFeedback = async (req, res) => {
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
        const deletefeedback = await feedbackModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: true, message: "Feedback Deleted" });
    } catch (error) {
        res.status(500).json({ status: false, error, message: "Feedback unable to delete" });
    }
}

module.exports = { addFeedback, getAllFeedback, deleteFeedback, getFeedbackByFeedbackId, getFeedbackByUserId, getFeedbackByResultId };