const sql = require('mssql')
const dotenv = require('dotenv');
dotenv.config();

const sqlAzureConfig = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,  // Connect to master to create new databases
    options: {
        encrypt: true,
        enableArithAbort: true
    }
}

const sqlconnect = async ()=>{
    try{
        console.log(sqlAzureConfig)
        const pool = await sql.connect(sqlAzureConfig);
        console.log(pool);
    }
    catch(error){
        console.log("not connected")
        console.log(error)
    }
}

module.exports = sqlAzureConfig;

module.exports = sqlconnect;