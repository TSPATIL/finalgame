const express = require('express');
const verifyUser = require('../middlewares/verifyUser');
const { getReportData, getReportFile } = require('../controllers/Report');
const router = express.Router();

router.route('/get-report/:id').get(getReportData);
router.route('/get-reportfile/:id').get(getReportFile);

module.exports = router;