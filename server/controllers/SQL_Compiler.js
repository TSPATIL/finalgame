const sqlAzureConfig = require('../configs/sqlAzureConfig.js')
const sql = require('mssql');

const createSchemaForUser = async (req, res) => {
    const schemaName = `user_${req.body.userId}_schema`;
    const query = `CREATE SCHEMA ${schemaName}`;
    
    try {
        const pool = await sql.connect(sqlAzureConfig);
        const result = await pool.request().query(query);
        console.log(`Schema ${schemaName} created or already exists.`);
        res.status(200).json({result, message: 'Success'});
    } catch (err) {
        console.error('Error creating schema: ', err);
        res.status(500).json({error: "Something went wrong"});
    }
};

async function executeQueryBatch(req, res) {
    try {
        // Connect to the database
        let pool = await sql.connect(sqlAzureConfig);

        const schemaName = `user_${req.body.userId}_schema`;
        await pool.request().query(`SET SCHEMA ${schemaName}`);

        // Execute multiple SQL queries in one batch
        let result = await pool.request().query(req.body.query);

        // console.log('Results from village1_people:', result.recordsets[0]);
        // console.log('Results from village2_people:', result.recordsets[1]);
        res.status(200).json({result, message: 'Success'});

    } catch (err) {
        console.error('SQL error', err);
        res.status(500).json({error: "Something went wrong"});
    } finally {
        sql.close();
    }
}

async function dropTestSchema(req, res) {
    try {
        // Connect to the database
        let pool = await sql.connect(sqlAzureConfig);

        // Drop all objects (tables, views) inside the schema
        await pool.request().query(
        //     `
        //     DROP TABLE IF EXISTS ${schemaName}.village1_people;
        //     DROP TABLE IF EXISTS ${schemaName}.village2_people;
        //     -- Drop other objects if they exist (e.g., views)
        //     DROP VIEW IF EXISTS ${schemaName}.some_view_name;
        // `
    );

        // Drop the schema itself
        await pool.request().query(`
            DROP SCHEMA IF EXISTS ${schemaName};
        `);

        console.log(`Schema ${schemaName} and its objects were successfully dropped.`);
        res.status(200).json({message: "Success"})
    } catch (err) {
        console.error('Error dropping schema:', err);
        res.status(500).json({error: "Something went wrong"});
    } finally {
        sql.close(); // Ensure to close the database connection
    }
}


module.exports = {createSchemaForUser, executeQueryBatch, dropTestSchema};