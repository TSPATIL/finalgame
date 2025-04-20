const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectToDatabase } = require('./configs/dbConnection');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

dotenv.config();

connectToDatabase(process.env.MONGO_URL);

//middleware
app.use(express.json());

app.use(cors({
    origin: `${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}`,
    credentials: true
}));

app.use(cookieParser());

//routes
app.use('/api/user', require('./routes/Auth.js'));
app.use('/api/test', require('./routes/Test.js'));
app.use('/api/contact', require('./routes/Contact.js'));
app.use('/api/feedback', require('./routes/Feedback.js'));
app.use('/api/report', require('./routes/Report.js'));
app.use('/api/sitedetails', require('./routes/Admin.js'));

// app.use(express.static(path.join(__dirname, '../client/dist')));

// // Fallback to index.html for SPA
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/dist/index.html'));
// });


app.listen(process.env.PORT, () => {
    console.log(`SQL Game is running at ${process.env.API_URL + process.env.PORT}`);
});