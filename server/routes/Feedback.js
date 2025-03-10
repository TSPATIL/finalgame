const express = require('express');
const verifyUser = require('../middlewares/verifyUser');
const { addFeedback, getAllFeedback, getFeedbackByUserId, getFeedbackByFeedbackId, deleteFeedback } = require('../controllers/Feedback');
const router = express.Router();

router.route('/add-feedback').post(verifyUser, addFeedback);
router.route('/get-all-feedback').get(verifyUser, getAllFeedback);
router.route('get-all-feedback-by-user-param').get(verifyUser, getFeedbackByUserId);
router.route('get-feedback-by-feedback-param').get(verifyUser, getFeedbackByFeedbackId);
router.route('delete-feedback-by-param').get(verifyUser, deleteFeedback);

module.exports = router;
