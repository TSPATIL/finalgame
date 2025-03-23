const express = require('express');
const multer = require('multer');
const verifyUser = require('../middlewares/verifyUser');
const { getTestsById, getAllTests, createTestStory, deleteTestById, updateTestById, getImage, getTestAndResults, createTestResult, fetchTestCurrentChallenge, submitChallenge } = require('../controllers/Test');
const { predictDifficulty } = require('../controllers/PredictDifficulty');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

router.route('/add-test-story').post(upload.any(), verifyUser, createTestStory);
router.route('/get-all-test').get(verifyUser, getAllTests);
router.route('/get-test/:id/:type').get(verifyUser, getTestsById);
router.route('/update-test/:id/:type').put(upload.any(), verifyUser, updateTestById);
router.route('/delete-test/:id/:type').delete(verifyUser, deleteTestById);
router.route('/image/:id').get(getImage);
router.route('/get-test-result').get(verifyUser, getTestAndResults);
router.route('/create-result/:testId/:type').post(verifyUser, createTestResult);
router.route('/get-current-challenge/:resultId').get(verifyUser, fetchTestCurrentChallenge);
router.route('/submit-challenge/:resultId').patch(verifyUser, submitChallenge);
// router.route('/predictDifficulty/:resultId').get(predictDifficulty);

module.exports = router;