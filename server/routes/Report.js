const express = require('express');
const verifyUser = require('../middlewares/verifyUser');
const { getReportData, getReportFile, getCertificateFile } = require('../controllers/Report');
const router = express.Router();

router.route('/get-report/:id').get(verifyUser, getReportData);
router.route('/get-reportfile/:id').get(getReportFile);
router.route('/get-certificatefile/:id').get(getCertificateFile);

module.exports = router;