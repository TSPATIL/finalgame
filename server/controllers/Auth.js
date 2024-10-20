const admin = require('../configs/firebaseAdmin');
const userModel = require('../models/User');
var bcrypt = require('bcryptjs');

const createuser = async (req, res)=>{
    const token = req.body.token || req.headers.authorization.split(' ')[1]; // Get token from body or Authorization header

    try {
        // Verify the Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(token);

        if(!decodedToken){
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        const uid = decodedToken.uid;

        let existUser = await userModel.findOne({email: req.body.email});

        if(existUser){
            return res.status(400).json({error: "User already exists"});
        }

        let salt = await bcrypt.genSalt(10);
        let passwordHash = await bcrypt.hash(req.body.password, salt)

        const user = new userModel({
            userType: req.body.userType,
            email: req.body.email,
            password: passwordHash,
            firebaseId: uid,
            profile:{
                firstName: req.body.name.trim().split(/\s+/)[0],
                middleName: req.body.name.trim().split(/\s+/)[1],
                lastName: req.body.name.trim().split(/\s+/)[2],
                image: req.body.image ?? './default-user.jpg'
            }
        });

        const savedUser = await user.save();

        // Set the token in a secure, HttpOnly cookie
        res.cookie('authToken', token, {
            httpOnly: true, // Cookie is not accessible via JavaScript
            secure: false,   // Only send cookie over HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
            sameSite: 'None' // Prevent cross-site request forgery
        });

        return res.status(200).json({ message: 'Cookie set successfully', savedUser });
    } catch (error) {
        console.error('Error verifying Firebase token:', error);
        res.status(500).json({error: "Something went wrong"});
    }
}

const loginuser = async (req, res)=>{
    const token = req.body.token || req.headers.authorization.split(' ')[1]; // Get token from body or Authorization header
    try{
        // Verify the Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(token);
        
        if(!decodedToken){
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        const uid = decodedToken.uid;

        let existUser = await userModel.findOne({email: req.body.email});

        if(!existUser){
            return res.status(400).json({error: "Invalid credentials"});
        }

        if(uid !== existUser.firebaseId){
            return res.status(401).json({error: "Unauthorized"});
        }

        let compareResult = await bcrypt.compare(req.body.password, existUser.password);

        if(!compareResult){
            return res.status(400).json({error: "Invalid credentials"});
        }

        res.cookie('authToken', token, {
            httpOnly: true, // Cookie is not accessible via JavaScript
            secure: false,   // Only send cookie over HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
            sameSite: 'None' // Prevent cross-site request forgery
        });

        delete existUser.password;
        
        return res.status(200).json({ message: 'Cookie set successfully', existUser });
    }
    catch(error){
        res.status(500).json({error: "Something went wrong"});
    }
}

const getAllUsers = async (req, res)=>{
    try {
        const users = await userModel.find().select('-password');
        if(!users){
            return res.status(400).json({error: "No user exists"});
        }
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({error: "Something went wrong"});
    }
}

const getUserSelf = async (req, res)=>{
    try {
        const user = await userModel.findOne({email: req.body.email}).select('-password');
        if(!user){
            return res.status(400).json({error: "No user exists"});
        }

        if(req.user.userType !== 'student' || req.user.uid !== user.firebaseId){
            return res.status(401).json({error: "Unauthorized"});
        }

        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({error: "Something went wrong"});
    }
}

const getUserParam = async (req, res)=>{
    try {
        const user = await userModel.findOne({email: req.params.email}).select('-password');
        if(!user){
            return res.status(400).json({error: "No user exists"});
        }

        if(req.user.userType === 'student' || req.user.uid !== user.firebaseId){
            return res.status(401).json({error: "Unauthorized"});
        }

        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({error: "Something went wrong"});
    }
}

module.exports = { createuser, loginuser, getAllUsers, getUserSelf, getUserParam };