const express = require('express');
const multer = require('multer');
const verifyUser = require('../middlewares/verifyUser');
const { getTestsById, getAllTests, createTestStory } = require('../controllers/Test');
// const { createTestStory, getAllTests, getTestsById } = require('../controllers/Test');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

router.route('/add-test-story').post(upload.any(), verifyUser, createTestStory);
router.route('/get-all-test').get(verifyUser, getAllTests);
router.route('/get-test/:id/:type').get(verifyUser, getTestsById);
router.route('/update-test/:id/:type').patch(upload.any(), verifyUser);
router.route('/delete-test/:id/:type').delete(verifyUser);

module.exports = router;