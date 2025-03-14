const express = require('express');
const multer = require('multer');
const verifyUser = require('../middlewares/verifyUser');
const { getTestsById, getAllTests, createTestStory, deleteTestById, updateTestById } = require('../controllers/Test');
// const { createTestStory, getAllTests, getTestsById } = require('../controllers/Test');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

router.route('/add-test-story').post(upload.any(), verifyUser, createTestStory);
router.route('/get-all-test').get(verifyUser, getAllTests);
router.route('/get-test/:id/:type').get(verifyUser, getTestsById);
router.route('/update-test/:id/:type').put(upload.any(), verifyUser, updateTestById);
router.route('/delete-test/:id/:type').delete(verifyUser, deleteTestById);

module.exports = router;