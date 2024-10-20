const express = require('express');
const { addContact, deleteContact, getAllContacts, getContactDetails } = require('../controllers/Contact');
const verifyUser = require('../middlewares/verifyUser');
const router = express.Router();

router.route('/add-contact').post(addContact);
router.route('delete-contact/:contactId').delete(verifyUser, deleteContact);
router.route('getAllContacts').get(verifyUser, getAllContacts);
router.route('getContactDeatils/:contactId').get(verifyUser, getContactDetails);

module.exports = router;