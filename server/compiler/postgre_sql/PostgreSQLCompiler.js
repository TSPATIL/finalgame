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

// module.exports = pool;
// function areQueriesStructurallySame(userQuery, systemQuery) {
//     try {
//         const userAST = parse(userQuery);
//         const systemAST = parse(systemQuery);

//         return JSON.stringify(userAST) === JSON.stringify(systemAST);
//     } catch (error) {
//         console.error("SQL Parsing Error:", error.message);
//         return false;
//     }
// }

// // Function to Compare Execution Plans using EXPLAIN ANALYZE
// async function areQueriesLogicallySame(userQuery, systemQuery) {
//     try {
//         await pool.connect();

//         const userPlan = await pool.query(`EXPLAIN ANALYZE ${userQuery}`);
//         const systemPlan = await pool.query(`EXPLAIN ANALYZE ${systemQuery}`);

//         return JSON.stringify(userPlan.rows) === JSON.stringify(systemPlan.rows);
//     } catch (error) {
//         console.error("SQL Execution Error:", error.message);
//         return false;
//     } finally {
//         await pool.end();
//     }
// }

// // Function to Validate User Query
// async function validateUserQuery(userQuery, systemQuery) {
//     if (areQueriesStructurallySame(userQuery, systemQuery)) {
//         return { valid: true, reason: "✅ Queries are structurally the same!" };
//     } else if (await areQueriesLogicallySame(userQuery, systemQuery)) {
//         return { valid: true, reason: "✅ Queries produce the same execution results!" };
//     } else {
//         return { valid: false, reason: "❌ User query is different from the expected output!" };
//     }
// }


const code =
    `
create table staff 
(
staff_id serial primary key,
first_name varchar(50) not null,
last_name varchar(50) not null,
gender varchar(10) not null,
role varchar(50) not null,
contact_info varchar(50) not null
);
insert into staff (first_name, last_name, gender, role, contact_info) values 
('Aurora', 'Sinistra', 'Female', 'Astronomy Professor', 'sinistra@hogwarts.edu'),
('Minerva', 'McGonagall', 'Female', 'Deputy Headmistress', 'mcgonagall@hogwarts.edu'),
('Albus', 'Dumbledore', 'Male', 'Headmaster', 'dumbledore@hogwarts.edu'),
('Severus', 'Snape', 'Male', 'Potions Master', 'snape@hogwarts.edu'),
('Filius', 'Flitwick', 'Male', 'Charms Professor', 'flitwick@hogwarts.edu'),
('Pomona', 'Sprout', 'Female', 'Herbology Professor', 'sprout@hogwarts.edu'),
('Sybill', 'Trelawney', 'Female', 'Divination Professor', 'trelawney@hogwarts.edu'),
('Remus', 'Lupin', 'Male', 'Defense Against the Dark Arts Professor', 'lupin@hogwarts.edu'),
('Rubeus', 'Hagrid', 'Male', 'Care of Magical Creatures Professor', 'hagrid@hogwarts.edu'),
('Gilderoy', 'Lockhart', 'Male', 'Defense Against the Dark Arts Professor', 'lockhart@hogwarts.edu'),
('Horace', 'Slughorn', 'Male', 'Potions Master', 'slughorn@hogwarts.edu'),
('Madam', 'Hooch', 'Female', 'Flying Instructor', 'hooch@hogwarts.edu'),
('Madam', 'Pomfrey', 'Female', 'Matron', 'pomfrey@hogwarts.edu'),
('Argus', 'Filch', 'Male', 'Caretaker', 'filch@hogwarts.edu'),
('Rubeus', 'Hagrid', 'Male', 'Keeper of Keys and Grounds', 'hagrid@hogwarts.edu'),
('Professor', 'Binns', 'Male', 'History of Magic Professor', 'binns@hogwarts.edu'),
('Charity', 'Burbage', 'Female', 'Muggle Studies Professor', 'burbage@hogwarts.edu'),
('Quirinus', 'Quirrell', 'Male', 'Defense Against the Dark Arts Professor', 'quirrell@hogwarts.edu');
select * from staff;
`;

async function executeCode(code, resultId) {
    console.log(resultId)
    console.log(code)
    try {
        if (!resultId) {
            return { status: false, message: "No Result Id Given" };
        }
        if (!code) {
            return { status: false, message: "Code is empty", error: "Code is Empty" }
        }
        const schema = `result_${resultId}`;
        console.log("Starting execution...");
        await pool.query(`CREATE SCHEMA IF NOT EXISTS "${schema}"`);
        await pool.query(`SET search_path TO ${schema}`);
        console.log(`Schema set to ${schema}`);
        const queryResult = await pool.query(code);
        console.log(queryResult)
        console.log("Query executed successfully.");
        const data = JSON.stringify(queryResult[2].rows);
        console.log(data)
        return { status: true, data, message: "Query executed successfully." };
    } catch (error) {
        return { status: false, message: error.message, error };
    }
}

function normalizeQuery(query) {
    return query
        .replace(/\s+/g, " ")  // Replace multiple spaces with one
        .replace(/[\n\r]/g, "") // Remove new lines
        .replace(/\b(SELECT|FROM|WHERE|JOIN|ON|GROUP BY|ORDER BY|INSERT INTO|VALUES|UPDATE|SET|DELETE|ALTER|AS|HAVING|LIKE)\b/gi, match => match.toLowerCase())
        .trim();
}

async function compareQueryAndExecute(userQuery, predefinedQuery, resultId) {
    if (!resultId) {
        return { status: false, message: "No Result Id Given" };
    }
    const schema = `result_${resultId}`
    if (!userQuery) {
        return { status: false, message: "UserQuery is empty", error: "Code is Empty" }
    }
    if (!predefinedQuery) {
        return { status: false, message: "AnswerQuery is empty", error: "Code is Empty" }
    }

    const normalizedUserQuery = normalizeQuery(userQuery);
    const normalizedPredefinedQuery = normalizeQuery(predefinedQuery);

    if (normalizedUserQuery.startsWith("select")) {
        if (normalizedPredefinedQuery.startsWith("select"))
            return await compareSelectQuery(normalizedUserQuery, predefinedQuery, schema, queryType = "select");
        else
            return { status: false, message: "Query is incorrect." };
    }
    else if (normalizedUserQuery.startsWith("insert")) {
        if (normalizedPredefinedQuery.startsWith("insert"))
            return await compareAndExecuteModification(normalizedUserQuery, predefinedQuery, schema, queryType = "insert");
        else
            return { status: false, message: "Query is incorrect." };
    }
    else if (normalizedUserQuery.startsWith("update")) {
        if (normalizedPredefinedQuery.startsWith("update"))
            return await compareAndExecuteModification(normalizedUserQuery, predefinedQuery, schema, queryType = "update");
        else
            return { status: false, message: "Query is incorrect." };
    }
    else if (normalizedUserQuery.startsWith("delete")) {
        if (normalizedPredefinedQuery.startsWith("delete"))
            return await compareAndExecuteModification(normalizedUserQuery, predefinedQuery, schema, queryType = "delete");
        else
            return { status: false, message: "Query is incorrect." };
    }
    else if (normalizedUserQuery.startsWith("alter")) {
        if (normalizedPredefinedQuery.startsWith("alter"))
            return await executeAlter(normalizedUserQuery, predefinedQuery, schema, queryType = "alter");
        else
            return { status: false, message: "Query is incorrect." };
    }
    else {
        return { status: false, message: "Unsupported query type." };
    }
}

function getTableNameFromQuery(query) {
    const regex = /\b(ALTER\s+TABLE|INSERT\s+INTO|UPDATE|SELECT\s+.*?\s+FROM|DELETE\s+FROM)\s+["']?([\w\d_]+)["']?/i;
    const match = query.match(regex);
    return match ? match[2] : null;
}

async function compareAndExecuteModification(userQuery, predefinedQuery, schema, queryType) {
    try {
        const userQueryTable = getTableNameFromQuery(userQuery);
        const predefinedQueryTable = getTableNameFromQuery(predefinedQuery);
        if (userQueryTable !== predefinedQueryTable) {
            return { status: false, message: "Query is incorrect" };
        }
        await pool.query("BEGIN");
        try {
            await pool.query(`SET search_path TO ${schema}`);
            let tableid = "";
            if (queryType === "insert") {
                tableid = await pool.query(`SELECT a.attname AS column_name FROM pg_index i JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey) WHERE i.indrelid = '${userQueryTable}'::regclass AND i.indisprimary;`)
                tableid = tableid.rows[0]['column_name'];
            }
            const sequenceQuery = `SELECT setval(pg_get_serial_sequence('${userQueryTable}', '${tableid}'), (SELECT COALESCE(MAX(${tableid}), 0) FROM ${userQueryTable}));`;
            await pool.query("SAVEPOINT my_savepoint;");
            
            if (queryType === "insert") await pool.query(sequenceQuery);
            console.log(userQuery.replace(';', '') + " RETURNING *;")
            userResult = await pool.query(userQuery.replace(';', '') + " RETURNING *;");
            await pool.query("ROLLBACK TO my_savepoint;");
            if (queryType === "insert") await pool.query(sequenceQuery);
            console.log(predefinedQuery.replace(';', '') + " RETURNING *;")
            let predefinedResult = await pool.query(predefinedQuery.replace(';', '') + " RETURNING *;");

            if (JSON.stringify(userResult.rows) === JSON.stringify(predefinedResult.rows)) {
                await pool.query("COMMIT");
                return { status: true, message: "Query is correct and executed.", queryType };
            } else {
                await pool.query("ROLLBACK TO my_savepoint;");
                if (queryType === "insert") await pool.query(sequenceQuery);
                return { status: false, message: "Query is incorrect." };
            }
        } catch (error) {
            console.log(error)
            await pool.query("ROLLBACK TO SAVEPOINT my_savepoint").catch(() => pool.query("ROLLBACK"));
            return { status: false, message: error.message, error };
        }
    } catch (error) {
        await pool.query("ROLLBACK").catch(() => {});
        return { status: false, message: error.message, error };
    }
}

async function executeAlter(userQuery, predefinedQuery, schema, queryType) {
    try {
        if(queryType !== "alter"){
            return { status: false, message: "Query is incorrect" };
        }
        await pool.query("BEGIN");
        const userQueryTable = getTableNameFromQuery(userQuery);
        const predefinedQueryTable = getTableNameFromQuery(predefinedQuery);
        if (userQueryTable !== predefinedQueryTable) {
            return { status: false, message: "Query is incorrect" };
        }
        try {
            await pool.query(`SET search_path TO ${schema}`);
            await pool.query("SAVEPOINT my_savepoint;");

            await pool.query(userQuery);
            const userQueryData = await pool.query(`Select * from  ${userQueryTable}`)
            await pool.query("ROLLBACK TO my_savepoint;");


            await pool.query(predefinedQuery);
            const predefinedQueryData = await pool.query(`Select * from  ${predefinedQueryTable}`)
            console.log(JSON.stringify(userQueryData.rows))
            console.log(JSON.stringify(predefinedQueryData.rows));
            if (JSON.stringify(userQueryData.rows) === JSON.stringify(predefinedQueryData.rows)) {
                await pool.query("COMMIT");
                return { status: true, message: "Query is correct and executed.", queryType };
            } else {
                await pool.query("ROLLBACK TO my_savepoint;");
                return { status: false, message: "Query is incorrect" };
            }
        } catch (error) {
            await pool.query("ROLLBACK TO SAVEPOINT my_savepoint").catch(() => pool.query("ROLLBACK"));
            return { status: false, message: error.message };
        }
    } catch (error) {
        await pool.query("ROLLBACK").catch(() => {});
        return { status: false, message: error.message };
    }
}

async function compareSelectQuery(userQuery, predefinedQuery, schema, queryType) {
    try {
        const userQueryTable = getTableNameFromQuery(userQuery);
        const predefinedQueryTable = getTableNameFromQuery(predefinedQuery);
        console.log(userQueryTable)
        if (userQueryTable !== predefinedQueryTable) {
            return { status: false, message: "Query is incorrect" };
        }

        await pool.query(`SET search_path TO ${schema}`);
        const userResult = await pool.query(userQuery);
        const predefinedResult = await pool.query(predefinedQuery);

        const userData = JSON.stringify(userResult.rows);
        const predefinedData = JSON.stringify(predefinedResult.rows);

        if (userData === predefinedData) {
            return { status: true, data: predefinedData, message: "Correct Query!", queryType };
        } else {
            return { status: false, message: "Output mismatch. Review your query.", error: "Output mismatch. Review your query." };
        }
    } catch (error) {
        return { status: false, message: error.message, error };
    }
}

async function dropUserSchema(resultId) {
    try {
        if (!resultId) {
            return { status: false, message: "No Result Id Given" };
        }
        if (!code) {
            return { status: false, message: "Code is empty", error: "Code is Empty" }
        }
        const schema = `result_${resultId}`;
        await pool.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`);
        return { status: true, message: "Schema deleted successfully." };
    } catch (error) {
        return { status: false, message: error.message, error };
    }
}

async function run() {
    try {
        const schema = "67d08620f382a36fe2631e12";
        // const userQuery = `insert into wands (wood_type, core_material, length, owner_id) values('Cherry', 'Unicorn Hair', 13, 1)`;
        // const predefinedQuery = `insert into wands (wood_type, core_material, length, owner_id) values('Cherry', 'Unicorn Hair', 13, 1)`;
        const resultId = `67e42bcaeae96f868e23a4c0`
        const result = await executeCode(code, resultId); // Await the result
        // const result = await compareQueryAndExecute(userQuery, predefinedQuery, schema)
        // const result = await dropUserSchema(schema)
        // await dropAllSchemas()
        // console.log("Execution Result:", result); // Log the actual result

    } catch (error) {
        console.error("Error:", error);
    }
}
// run();

async function dropAllSchemas() {
    try {

        // Get all schema names except system schemas (pg_catalog, information_schema)
        const { rows } = await pool.query(`
            SELECT schema_name 
            FROM information_schema.schemata 
            WHERE schema_name NOT IN ('pg_catalog', 'information_schema', 'public')
            AND schema_name IN (
                SELECT nspname 
                FROM pg_namespace 
                WHERE nspowner = (SELECT oid FROM pg_roles WHERE rolname = current_user)
            );
        `);

        if (rows.length === 0) {
            console.log("No custom schemas found.");
            return;
        }

        // Drop all schemas
        for (const row of rows) {
            const schema = row.schema_name;
            console.log(`Dropping schema: ${schema}`);
            await pool.query(`DROP SCHEMA ${schema} CASCADE;`);
        }

        console.log("All schemas dropped successfully.");
    } catch (err) {
        console.error("Error dropping schemas:", err);
    } finally {
        pool.end();
    }
}

module.exports = { compareQueryAndExecute, executeCode, run }