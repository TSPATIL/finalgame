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

// app.get('/api/execute', async (req, res)=>{
//     try {
//         const userQuery = `insert into wands (wood_type, core_material, length, owner_id) values('Cherry', 'Unicorn Hair', 13, 1)`;
//         const predefinedQuery = `insert into wands (wood_type, core_material, length, owner_id) values('Cherry', 'Unicorn Hair', 13, 1)`;
//         const resultId = `result_67d08620f382a36fe2631e12`
//         // const result = await executeCode(code, resultId); // Await the result
//         const result = await compareQueryAndExecute(userQuery, predefinedQuery, resultId)
//         // const result = await dropUserSchema(schema)
//         // await dropAllSchemas()
//         console.log("Execution Result:", result); // Log the actual result
//         res.json(result)
//     } catch (error) {
//         console.error("Error:", error);
//     }
// })

// // run()

// Create the Python script file
const pythonScript = `
import json
import sys

def map_observations(time_taken, attempts):
    observations = ["Short-Few", "Short-MediumFew", "Short-Many", "Medium-Few", "Medium-MediumFew", "Medium-Many", "Long-Few", "Long-MediumFew", "Long-Many"]
    result = []
    for time, attempt in zip(time_taken, attempts):
        time_category = ""
        attempt_category = ""
        if time < 100:
            time_category = "Short"
        elif 100 <= time < 250:
            time_category = "Medium"
        else:
            time_category = "Long"
        if attempt <= 2:
            attempt_category = "Few"
        elif 2 < attempt <= 4:
            attempt_category = "MediumFew"
        else:
            attempt_category = "Many"
        observation = f"{time_category}-{attempt_category}"
        result.append(observations.index(observation))
    print(json.dumps(result))

if __name__ == "__main__":
  try:
    data = json.loads(sys.argv[1])
    time_taken = data['time_taken']
    attempts = data['attempts']
    map_observations(time_taken, attempts)
  except (json.JSONDecodeError, KeyError, IndexError) as e:
    print(json.dumps({'error': str(e)}))
    sys.exit(1)

`;

// fs.writeFileSync('process_data.py', pythonScript);

app.get('/process-data', (req, res) => {
//   const { time_taken, attempts } = req.body;
    time_taken = [0, 120, 210, 60, 300]
    attempts = [0, 2, 3, 1, 5]

  if (!Array.isArray(time_taken) || !Array.isArray(attempts) || time_taken.length !== attempts.length) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const pythonProcess = spawn('python', ['process_data.py', JSON.stringify({ time_taken, attempts })]);

  let result = '';
  let errorData = '';

  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    errorData += data.toString();
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      try {
        const parsedResult = JSON.parse(result);
        res.json(parsedResult);
      } catch (parseError) {
        res.status(500).json({ error: 'Error parsing Python output', details: parseError.message });
      }
    } else {
      try{
        const parsedError = JSON.parse(result);
        res.status(500).json({ error: 'Python script execution failed', details: parsedError.error || errorData });
      } catch(parseError){
        res.status(500).json({ error: 'Python script execution failed', details: errorData });
      }
    }
  });
});

app.listen(process.env.PORT, () => {
    console.log(`SQL Game is running at ${process.env.API_URL + process.env.PORT}`);
});