const express = require('express');
const verifyUser = require('../middlewares/verifyUser');
const { getWebsiteInfo } = require('../controllers/Admin');
const router = express.Router();

router.route('/getDetails').get(verifyUser, getWebsiteInfo);

module.exports = router;