const express = require('express');
const { createuser, loginuser, getAllUsers, getUserSelf, getUserParam } = require('../controllers/Auth');
const verifyUser = require('../middlewares/verifyUser');
const router = express.Router();

router.route('/create-user').post(createuser);
router.route('/login-user').post(loginuser);
router.route('/getallusers').get(verifyUser, getAllUsers);
router.route('/getuserdetails').get(verifyUser, getUserSelf);
router.route('/getuserdetailsbyadmin').get(verifyUser, getUserParam);

module.exports = router;