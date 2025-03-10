const feedbackModel = require("../models/Feedback")
const userModel = require("../models/User")

const addFeedback = async (req, res)=>{
    try {
        const user = await userModel.findOne({email: req.user.email});
        if(!user){
            return res.status(401).json({status: false, error: "Unauthorized: User not found.", message: "Feedback unable to save"});
        }
        const feedback = await feedbackModel({
            userId: user._id,
            message: req.body.message,
            rating: req.boy.rating
        });
        const savedFeedback = await feedback.save();
        res.status(200).json({status: true, message: "Feedback Saved Successfully"});
    } catch (error) {
        res.status(500).json({status: false, error, message: "Feedback unable to save"});
    }
}

const getAllFeedback = async (req, res)=>{
    try {
        const user = await userModel.findOne({email: req.user.email});
        if(!user){
            return res.status(401).json({status: false, error: "Unauthorized: User not found.", message: "Feedback unable to fetch"});
        }
        if(user.userType === 'admin'){
            return res.status(401).json({status: false, error: "Unauthorized: User not allowed to fetch.", message: "Feedback unable to fetch"});
        }
        const feedbacks = await feedbackModel.find();
        res.status(200).json({status: true, feedbacks, message: "Feedback fetched successfully"});
    } catch (error) {
        res.status(500).json({status: false, error, message: "Feedback unable to delete"});
    }
}

const getFeedbackByFeedbackId = async (req, res)=>{
    try {
        const user = await userModel.findOne({email: req.user.email});
        if(!user){
            return res.status(401).json({status: false, error: "Unauthorized: User not found.", message: "Feedback unable to fetch"});
        }
        const feedbacks = await feedbackModel.findById(req.param.feedbackId);
        res.status(200).json({status: true, feedbacks, message: "Feedback fetched successfully"});
    } catch (error) {
        res.status(500).json({status: false, error, message: "Feedback unable to delete"});
    }
}

const getFeedbackByUserId = async (req, res)=>{
    try {
        const user = await userModel.findOne({email: req.user.email});
        if(!user){
            return res.status(401).json({status: false, error: "Unauthorized: User not found.", message: "Feedback unable to fetch"});
        }
        const feedbacks = await feedbackModel.findMany({userId: req.param.userId});
        res.status(200).json({status: true, feedbacks, message: "Feedback fetched successfully"});
    } catch (error) {
        res.status(500).json({status: false, error, message: "Feedback unable to delete"});
    }
}

const deleteFeedback = async (req, res)=>{
    try {
        const user = await userModel.findOne({email: req.user.email});
        if(!user){
            return res.status(401).json({status: false, error: "Unauthorized: User not found.", message: "Feedback unable to delete"});
        }
        // if(user.userType === 'admin'){
        //     return res.status(401).json({status: false, error: "Unauthorized: User not allowed to delete.", message: "Feedback unable to delete"});
        // }
        const deletefeedback = await feedbackModel.findByIdAndDelete(req.param.feedbackId);
        res.status(200).json({status: true, message: "Feedback Deleted"});
    } catch (error) {
        res.status(500).json({status: false, error, message: "Feedback unable to delete"});
    }
}

module.exports = {addFeedback, getAllFeedback, deleteFeedback, getFeedbackByFeedbackId, getFeedbackByUserId};