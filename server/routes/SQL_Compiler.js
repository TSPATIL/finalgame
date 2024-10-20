const express = require('express');
const router = express.Router();
const {createSchemaForUser, executeQueryBatch, dropTestSchema} = require('../controllers/SQL_Compiler');

router.route('/create-schema').post(createSchemaForUser);
router.route('/execute-query').post(executeQueryBatch);
router.route('/delete-schema').post(dropTestSchema);

module.exports = router;