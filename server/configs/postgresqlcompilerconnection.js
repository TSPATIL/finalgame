const { Pool } = require("pg");
const dotenv = require('dotenv');

dotenv.config()

const pool = new Pool({
    user: process.env.AZURE_POSTGRE_SQL_USER, //"admin-username",
    host: process.env.AZURE_POSTGRE_SQL_HOST, // "your-postgres-server.postgres.database.azure.com",
    database: process.env.AZURE_POSTGRE_SQL_DATABASE, //"your-database",
    password: process.env.AZURE_POSTGRE_SQL_PASSWORD, //"your-password",
    port: process.env.AZURE_POSTGRE_SQL_PORT,
    ssl: { rejectUnauthorized: false } // Required for Azure
});

module.exports = pool;