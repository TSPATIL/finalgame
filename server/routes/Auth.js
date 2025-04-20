const express = require('express');
const { createuser, loginuser, googleloginuser, getAllUsers, getUserSelf, getUserParam, logout, updateUserSelf, loginAdmin, createAdmin } = require('../controllers/Auth');
const verifyUser = require('../middlewares/verifyUser');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage(); // Store image in memory
const upload = multer({ storage });

router.route('/create-user').post(createuser);
router.route('/login-user').post(loginuser);
router.route('/google-login-user').post(googleloginuser);
router.route('/getallusers').get(verifyUser, getAllUsers);
router.route('/getuserdetails').get(verifyUser, getUserSelf);
router.route('/getuserdetailsbyadmin/:id').get(verifyUser, getUserParam);
router.route('/logout').post(verifyUser, logout);
router.route('/updateUserDetails').patch(upload.single('profile[image]'), verifyUser, updateUserSelf);
router.route('/create-admin').post(createAdmin);
router.route('/login-admin').post(loginAdmin);

module.exports = router;