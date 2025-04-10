const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectToDatabase } = require('./configs/dbConnection');
const sql = require('mssql');
const cookieParser = require('cookie-parser');
const { compareQueryAndExecute, run } = require('./compiler/postgre_sql/PostgreSQLCompiler.js');
const { spawn } = require('child_process');
const fs = require('fs');

const app = express();

dotenv.config();

connectToDatabase(process.env.MONGO_URL);

//middleware
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
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

app.listen(process.env.PORT, () => {
    console.log(`SQL Game is running at ${process.env.API_URL + process.env.PORT}`);
});