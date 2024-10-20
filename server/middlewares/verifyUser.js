const admin = require('../configs/firebaseAdmin');

const verifyUser = async (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Attach the decoded user information to the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error verifying Firebase token:', error);
        return res.status(403).json({ message: 'Invalid token', error: error.message });
    }
}

module.exports = verifyUser;
