// const admin = require('../configs/firebaseAdmin');

// const verifyUser = async (req, res, next) => {
//     try {
//         const authToken = req.cookies.authToken;
//         const refreshToken = req.cookies.refreshToken;
//         if (!authToken) {
//             return res.status(400).json({ status: false, error: 'No auth token found' });
//         }

//         // Verify the Firebase ID token
//         const decodedToken = await admin.auth().verifyIdToken(authToken);
//         req.user = decodedToken; // Attach the decoded user information to the request
//         next(); // Proceed to the next middleware or route handler
//     } catch (error) {
//         console.error('Error verifying Firebase token:', error);
//         return res.status(403).json({ status: false, message: 'Invalid token', error: error.message });
//     }
// }

// module.exports = verifyUser;

const admin = require('../configs/firebaseAdmin');
const userModel = require('../models/User');

const verifyUser = async (req, res, next) => {
    try {
        const authToken = req.cookies.authToken;
        const refreshToken = req.cookies.refreshToken;

        if (!authToken) {
            return res.status(401).json({ status: false, error: 'Unauthorized: No auth token found' });
        }

        let decodedToken;
        try{
            decodedToken = await admin.auth().verifyIdToken(authToken);
        }
        catch(error){
            console.log(error)
            if(error.code === "auth/id-token-expired"){ //error.code === "auth/id-token-revoked" || 
                console.log("hello")
                if(!refreshToken){
                    return res.status(401).json({ status: false, error: 'Unauthorized: No auth token found' });
                }
                try{
                    console.log("hello1");
                    console.log(refreshToken)
                    const user = await userModel.findOne({ refreshToken });
                    console.log(user)
                    
                    console.log("hello")
                    if(!user){
                        return res.status(401).json({status: false, error: 'Unauthorized. Invalid token'});
                    }

                    const newToken = await generateTokens(refreshToken);
                    console.log(newToken)
                    if (!newToken.status) {
                        return res.status(403).json({ status: false, error: newToken.error || 'Session expired. Please log in again.' });
                    }
                    
                    const idToken = newToken.data.id_token;
                    const newRefreshToken = newToken.data.refresh_token;
                    
                    console.log(idToken)
                    decodedToken = await admin.auth().verifyIdToken(idToken);

                    if(user.firebaseId !== decodedToken.uid){
                        return res.status(401).json({status: false, error: 'Unauthorized'});
                    }
                    
                    res.cookie('authToken', idToken, {
                        httpOnly: true,
                        secure: true,
                        maxAge: 24 * 60 * 60 * 1000,
                        sameSite: 'None',
                    });
                    
                    console.log("hello")
                    res.cookie('refreshToken', newRefreshToken, {
                        httpOnly: true,
                        secure: true,
                        maxAge: 24 * 60 * 60 * 1000,
                        sameSite: 'None',
                    });

                    user.refreshToken = newRefreshToken;
                    await user.save();
                    
                    console.log("hello")
                }
                catch(error){
                    console.log(error)
                    return res.status(403).json({ status: false, error: error.message });
                }
            }
            else {
                return res.status(401).json({ status: false, error: 'Unauthorized: Invalid token' });
            } 
        }
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying Firebase token:', error);
        return res.status(403).json({ status: false, error: 'Invalid token', message: error.message });
    }
}

const generateTokens = async (refreshToken)=>{
    try {
        const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`, {
            method: 'POST',
            headers:{
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                "grant_type": 'refresh_token',
                "refresh_token": refreshToken
            }).toString()
        });
        const data = await response.json();
        return {status: true, data};
    } catch (error) {
        console.log(error)
        return {status: false, error};
    }
}

module.exports = verifyUser;
