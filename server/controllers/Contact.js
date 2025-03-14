const contactModel = require("../models/Contact");
const userModel = require("../models/User");

const addContact = async (req, res) => {
    try {
        console.log(req.body);
        const contact = await contactModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            subject: req.body.subject,
            message: req.body.message
        });
        const savedContact = await contact.save();
        res.status(200).json({ status: true, message: "Contact Submitted" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, error, message: "Something went wrong" });
    }
}

const deleteContact = async (req, res) => {
    const token = req.body.token || req.headers.authorization.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);

        if (!decodedToken) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const uid = decodedToken.uid;
        
        const checkUser = await userModel.findOne({firebaseId: uid}).select("email userType");
        if (!checkUser) {
            return res.status(400).json({ status: false, error: "User not found", message: "User not found" });
        }
        
        if (checkUser.userType !== 'admin') {
            return res.status(401).json({ status: false, error: "Unauthorized", message: "User not authorized to delete the contact" });
        }
        
        const contact = await contactModel.findById(req.param.contactId);
        if (!contact) {
            return res.status(400).json({ status: false, error: "Contact not found", message: "Contact not found" })
        }
        
        const deleteContact = await contactModel.findByIdAndDelete(req.param.userId);
        
        res.status(200).json({ status: true, message: "Contact Deleted" })
    } catch (error) {
        res.status(500).json({ status: false, error, message: "Something went wrong" });
    }
}

const getAllContacts = async (req, res) => {
    const token = req.body.token || req.headers.authorization.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);

        if (!decodedToken) {
            return res.status(401).json({ status: false, error: 'Unauthorized', message: "User not authorised" });
        }

        const uid = decodedToken.uid;
        
        const checkUser = await userModel.findOne({firebaseId: uid}).select("email userType");
        if (!checkUser) {
            return res.status(400).json({ status: false, error: "User not found", message: "User not found" });
        }

        if (checkUser.userType !== 'admin') {
            return res.status(401).json({ status: false, error: "Unauthorized", message: "User not authorized to delete the contact" });
        }

        const contacts = await contactModel.find();

        res.status(200).json({ status: true, contacts, message: "Contact Found" })
    } catch (error) {
        res.status(500).json({ status: false, error, message: "Something went wrong" });
    }
}

const getContactDetails = async (req, res) => {
    const token = req.body.token || req.headers.authorization.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);

        if (!decodedToken) {
            return res.status(401).json({ status: false, error: 'Unauthorized', message: "User not authorised" });
        }

        const uid = decodedToken.uid;

        const checkUser = await userModel.findOne({firebaseId: uid}).select("email userType");
        if (!checkUser) {
            return res.status(400).json({ status: false, error: "User not found", message: "User not found" });
        }

        if (checkUser.userType !== 'admin') {
            return res.status(401).json({ status: false, error: "Unauthorized", message: "User not authorized to delete the contact" });
        }

        const contact = await contactModel.findById(req.param.contactId);
        if (!contact) {
            return res.status(400).json({ status: false, error: "Contact not fiund", message: "Contact not found" })
        }

        res.status(200).json({ status: true, contact, message: "Contact Found" })
    } catch (error) {
        res.status(500).json({ status: false, error, message: "Something went wrong" });
    }
}

module.exports = { addContact, deleteContact, getAllContacts, getContactDetails };