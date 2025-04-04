const admin = require('../configs/firebaseAdmin');
const userModel = require('../models/User');
var bcrypt = require('bcryptjs');

const createuser = async (req, res) => {
    const token = req.body.token;
    const refreshToken = req.body.refreshToken;
    try {
        // Verify the Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(token);

        if (!decodedToken) {
            await admin.auth().deleteUser(req.body.uid);
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const uid = decodedToken.uid;

        if (req.body.uid != uid) {
            await admin.auth().deleteUser(req.body.uid);
            return res.status(401).json({ error: 'Unauthorized' });
        }

        let existUser = await userModel.findOne({ email: req.body.email });

        if (existUser) {
            await admin.auth().deleteUser(req.body.uid);
            return res.status(400).json({ error: "User already exists" });
        }

        let salt = await bcrypt.genSalt(10);
        let passwordHash = await bcrypt.hash(req.body.password, salt)

        const user = new userModel({
            userType: req.body.userType,
            email: req.body.email,
            password: passwordHash,
            firebaseId: uid,
            refreshToken: refreshToken,
            profile: {
                firstName: req.body.name.trim().split(/\s+/)[0],
                middleName: req.body.name.trim().split(/\s+/)[1],
                lastName: req.body.name.trim().split(/\s+/)[2],   
            },
        });

        const savedUser = await user.save();

        // Set the token in a secure, HttpOnly cookie
        res.cookie('authToken', token, {
            httpOnly: true, // Cookie is not accessible via JavaScript
            secure: true,   // Only send cookie over HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
            sameSite: 'None' // Prevent cross-site request forgery
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // Cookie is not accessible via JavaScript
            secure: true,   // Only send cookie over HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
            sameSite: 'None' // Prevent cross-site request forgery
        });

        return res.status(200).json({ message: 'Cookie set successfully', savedUser });
    } catch (error) {
        await admin.auth().deleteUser(req.body.uid);
        console.error('Error verifying Firebase token:', error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

const loginuser = async (req, res) => {
    const token = req.body.token;
    const refreshToken = req.body.refreshToken;
    try {
        // Verify the Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(token);

        if (!decodedToken) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const uid = decodedToken.uid;

        if (req.body.uid != uid) {
            await admin.auth().deleteUser(req.body.uid);
            return res.status(401).json({ error: 'Unauthorized' });
        }

        let existUser = await userModel.findOne({ email: req.body.email });

        if (!existUser) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        if (uid !== existUser.firebaseId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        let compareResult = await bcrypt.compare(req.body.password, existUser.password);

        if (!compareResult) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        res.cookie('authToken', token, {
            httpOnly: true, // Cookie is not accessible via JavaScript
            secure: true,   // Only send cookie over HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
            sameSite: 'None', // Prevent cross-site request forgery
        });

        existUser.refreshToken = refreshToken;
        await existUser.save();
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // Cookie is not accessible via JavaScript
            secure: true,   // Only send cookie over HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
            sameSite: 'None', // Prevent cross-site request forgery
        });

        delete existUser.password;

        return res.status(200).json({ message: 'Cookie set successfully', existUser });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Something went wrong" });
    }
}

const googleloginuser = async (req, res) => {
    const token = req.body.token;
    const refreshToken = req.body.refreshToken;
    try {
        // Verify the Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const uid = decodedToken.uid;

        if (req.body.uid != uid) {
            await admin.auth().deleteUser(req.body.uid);
            return res.status(401).json({ error: 'Unauthorized' });
        }

        let existUser = await userModel.findOne({ email: req.body.email });

        if (!existUser) {
            // return res.status(400).json({error: "Invalid credentials"});
            try {
                let salt = await bcrypt.genSalt(10);
                let passwordHash = await bcrypt.hash(req.body.name + "" + req.body.email, salt)

                const user = new userModel({
                    userType: req.body.userType,
                    email: req.body.email,
                    password: passwordHash,
                    firebaseId: uid,
                    refreshToken: refreshToken,
                    profile: {
                        firstName: req.body.name.trim().split(/\s+/)[0],
                        middleName: req.body.name.trim().split(/\s+/)[1],
                        lastName: req.body.name.trim().split(/\s+/)[2],
                    },
                });

                const savedUser = await user.save();

                // Set the token in a secure, HttpOnly cookie
                res.cookie('authToken', token, {
                    httpOnly: true, // Cookie is not accessible via JavaScript
                    secure: true,   // Only send cookie over HTTPS
                    maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
                    sameSite: 'None' // Prevent cross-site request forgery
                });                
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true, // Cookie is not accessible via JavaScript
                    secure: true,   // Only send cookie over HTTPS
                    maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
                    sameSite: 'None' // Prevent cross-site request forgery
                });

                return res.status(200).json({ message: 'Cookie set successfully', savedUser });
            }
            catch (error) {
                await admin.auth().deleteUser(req.body.uid);
                console.log(error)
                res.status(500).json({ error: "Something went wrong" });
            }
        }
        else {
            if (uid !== existUser.firebaseId) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            let compareResult = await bcrypt.compare(req.body.name + "" + req.body.email, existUser.password);

            if (!compareResult) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            res.cookie('authToken', token, {
                httpOnly: true, // Cookie is not accessible via JavaScript
                secure: true,   // Only send cookie over HTTPS
                maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
                sameSite: 'None' // Prevent cross-site request forgery
            });

            
            existUser.refreshToken = refreshToken;
            await existUser.save();
            
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true, // Cookie is not accessible via JavaScript
                secure: true,   // Only send cookie over HTTPS
                maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
                sameSite: 'None' // Prevent cross-site request forgery
            });

            delete existUser.password;
            delete existUser.firebaseId;

            return res.status(200).json({ message: 'Cookie set successfully', existUser });
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Something went wrong" });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select({_id: 1, "profile.firstName": 1, "profile.lastName": 1, "profile.middleName": 1, email: 1, firebaseId: 1, userType: 1, createdAt: 1});
        if (!users) {
            return res.status(400).json({ status: false, error: "No user exists" });
        }
        res.status(200).json({ status: true, users });
    } catch (error) {
        res.status(500).json({ status: false, error: "Something went wrong" });
    }
}

const getUserSelf = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }).select('-password -_id -_v');
        if (!user) {
            return res.status(400).json({ status: false, error: "No user exists" });
        }

        if (req.user.uid !== user.firebaseId) {
            return res.status(401).json({ status: false, error: "Unauthorized" });
        }

        user = user.toObject();

        console.log(user)

        res.status(200).json({ status: true, user, message: 'User details fetched successfully'});
    } catch (error) {
        res.status(500).json({ status: false, error: "Something went wrong" });
        console.log(error)
    }
}

const getUserParam = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.params.email }).select('-password -firebaseId');
        if (!user) {
            return res.status(400).json({ status: false, error: "No user exists" });
        }

        if (req.user.userType === 'student' || req.user.uid !== user.firebaseId) {
            return res.status(401).json({ status: false, error: "Unauthorized" });
        }

        res.status(200).json({ status: true, user, message: 'User details fetched successfully'});
    } catch (error) {
        res.status(500).json({ status: false, error: "Something went wrong" });
    }
}

const logout = async (req, res) => {
    try {
        const authToken = req.cookies.authToken;
        const refreshToken = req.cookies.refreshToken;

        if (!authToken) {
            return res.status(400).json({ error: 'No auth token found' });
        }

        const decodedToken = await admin.auth().verifyIdToken(authToken);
        if (!decodedToken) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        await admin.auth().revokeRefreshTokens(decodedToken.uid);

        res.clearCookie('authToken', {
            httpOnly: true,
            secure: true, // Set to true in production with HTTPS
            sameSite: 'None', // Adjust based on your setup
        });
        
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true, // Set to true in production with HTTPS
            sameSite: 'None', // Adjust based on your setup
        });

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateUserSelf = async (req, res)=>{
    try{
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);
        
        // console.log(req.body.profile.image);
        if(req.file) {
            req.body.profile.image = req.file.buffer;
        }
        if(req.body.profile.image) req.body.profile.image =  Buffer.from(req.body.profile.image, 'base64');
        // console.log(req.body.profile.image);
        const user = await userModel.findOneAndUpdate({email: req.user.email}, req.body);
        res.status(200).json({status: true, message: 'Saved'});
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ status: false, error, message: 'Internal server error' });
    }
}

const createAdmin = async (req, res)=>{
    const token = req.body.token;
    const refreshToken = req.body.refreshToken;
    try {
        // Verify the Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(token);

        if (!decodedToken) {
            await admin.auth().deleteUser(req.body.uid);
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const uid = decodedToken.uid;

        if (req.body.uid != uid) {
            await admin.auth().deleteUser(req.body.uid);
            return res.status(401).json({ error: 'Unauthorized' });
        }

        let existUser = await userModel.findOne({ email: req.body.email });

        if (existUser) {
            await admin.auth().deleteUser(req.body.uid);
            return res.status(400).json({ error: "Admin already exists" });
        }

        let salt = await bcrypt.genSalt(10);
        let passwordHash = await bcrypt.hash(req.body.password, salt);

        const user = new userModel({
            userType: req.body.userType,
            email: req.body.email,
            password: passwordHash,
            firebaseId: uid,
            refreshToken: refreshToken,
            profile: {
                firstName: req.body.name.trim().split(/\s+/)[0],
                middleName: req.body.name.trim().split(/\s+/)[1],
                lastName: req.body.name.trim().split(/\s+/)[2],   
            },
        });

        const savedUser = await user.save();

        // Set the token in a secure, HttpOnly cookie
        res.cookie('authToken', token, {
            httpOnly: true, // Cookie is not accessible via JavaScript
            secure: true,   // Only send cookie over HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
            sameSite: 'None' // Prevent cross-site request forgery
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // Cookie is not accessible via JavaScript
            secure: true,   // Only send cookie over HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
            sameSite: 'None' // Prevent cross-site request forgery
        });

        return res.status(200).json({ message: 'Cookie set successfully', user: savedUser });
    } catch (error) {
        await admin.auth().deleteUser(req.body.uid);
        console.error('Error verifying Firebase token:', error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

const loginAdmin = async (req, res)=>{
    const token = req.body.token;
    const refreshToken = req.body.refreshToken;
    try {
        // Verify the Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(token);

        if (!decodedToken) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const uid = decodedToken.uid;

        if (req.body.uid != uid) {
            await admin.auth().deleteUser(req.body.uid);
            return res.status(401).json({ error: 'Unauthorized' });
        }

        let existUser = await userModel.findOne({ email: req.body.email });

        if (!existUser) {
            return res.status(400).json({ status: false, error: "Invalid credentials" });
        }

        if (uid !== existUser.firebaseId) {
            return res.status(401).json({ status: false, error: "Unauthorized" });
        }

        let compareResult = await bcrypt.compare(req.body.password, existUser.password);

        if (!compareResult) {
            return res.status(400).json({ status: false, error: "Invalid credentials" });
        }

        res.cookie('authToken', token, {
            httpOnly: true, // Cookie is not accessible via JavaScript
            secure: true,   // Only send cookie over HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
            sameSite: 'None', // Prevent cross-site request forgery
        });

        existUser.refreshToken = refreshToken;
        await existUser.save();
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // Cookie is not accessible via JavaScript
            secure: true,   // Only send cookie over HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
            sameSite: 'None', // Prevent cross-site request forgery
        });

        delete existUser.password;

        return res.status(200).json({ status: true, message: 'Cookie set successfully', user: existUser });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ status: false, error: "Something went wrong" });
    }
}

module.exports = { createuser, loginuser, getAllUsers, getUserSelf, getUserParam, googleloginuser, logout, updateUserSelf, createAdmin, loginAdmin };