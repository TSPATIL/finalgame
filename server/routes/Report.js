const express = require('express');
const verifyUser = require('../middlewares/verifyUser');
const router = express.Router();

router.route('/get-report').get(verifyUser, );

module.exports = router;