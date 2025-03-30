const reportModel = require("../models/Report");
const resultModel = require("../models/Result");
const userModel = require("../models/User");
const PDFDocument = require('pdfkit');

const generateChart = async (labels, data, label, color) => {
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: WIDTH, height: HEIGHT });
    const configuration = {
        type: 'bar',
        data: {
            labels,
            datasets: [{ label, data, backgroundColor: color }]
        },
        options: { responsive: false }
    };
    return await chartJSNodeCanvas.renderToBuffer(configuration);
};

const generateReportPDF = async () => {
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, `reports/${req.params.id}_report.pdf`);
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(18).text(`User Performance Report`, { align: 'center' }).moveDown();
    doc.fontSize(14).text(`User Name: ${userName}`);
    doc.text(`Test Title: ${title}`);
    doc.text(`Topic: ${topic}`);
    doc.text(`Test Type: ${type}`);
    doc.text(`Date of Test: ${start_time.toDateString()}`).moveDown();

    doc.fontSize(16).text(`Time Taken Per Question`, { underline: true }).moveDown(0.5);
    doc.image(timeChart, { width: 400, align: 'center' }).moveDown();

    doc.fontSize(16).text(`Attempts Per Question`, { underline: true }).moveDown(0.5);
    doc.image(attemptChart, { width: 400, align: 'center' }).moveDown();

    doc.end();
    return filePath;
}

const getReportData = async (req, res) => {
    try {
        const report = await reportModel.findOne({ resultId: req.params.id });
        if (report) {
            return res.status(200).json({ status: true, data: report, message: "Report fetched successfully" });
        }
        const result = await resultModel.findById(req.params.id).select('-currentChallengeNo -totalActualChallenges')
        if (!result) {
            return res.status(400).json({ status: false, message: "No test result found", error: "No test result found" });
        }
        const user = await userModel.findById(result.userId, { _id: 1, firebaseId: 1, "profile.firstName": 1, "profile.lastName": 1, "profile.middleName": 1 });
        if (!user) {
            return res.status(400).json({ status: false, message: "No test result found", error: "No test result found" });
        }
        if (req.user.uid !== user.firebaseId) {
            return res.status(401).json({ status: false, message: "Unauthorized", error: "Unauthorized" });
        }
        const userName = user.profile.firstName + " " + user.profile.middleName + " " + user.profile.lastName;
        const { title, topic, type, testId, challengesProgress, codeExecutionHistory } = result;

        const challengeLabels = challengesProgress.map((_, index) => `Q${index + 1}`);
        const timeTakenData = challengesProgress.map(ch => ch.timeTaken / 1000);
        const attemptsTakenData = challengesProgress.map(ch => ch.attempts);

        const codeExecutionProgress = codeExecutionHistory.map((codeExe) => {
            if (codeExe.executor === "user") {
                return {
                    code: codeExe.code,
                    message: codeExe.message
                }
            }
        })

        const timeTakenChart = generate(challengeLabels, timeTakenData, "Time Taken (s)", "red");
        const attemptsTakenChart = generate(challengeLabels, attemptsTakenData, "No. of Attempts", "blue");

        const aiFeedback = await fetch('https://api.groq.com/v1/chat/completions', {
            method:"POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-8b-8192",
                messages: [
                    { role: "system", content: "Analyze the user's test performance and suggest areas of improvement." },
                    { role: "user", content: JSON.stringify({ title, topic, type, challengesProgress }) }
                ],
                max_tokens: 300
            })
        });
        const responseData = await aiFeedback.json();
        const suggestions = responseData.choices[0].message.content;
        console.log(suggestions);

        const fileId = await generateReportPDF(timeTakenChart, attemptsTakenChart, title, userName, topic, type);

        const newReport = await reportModel({
            name: userName,
            title,
            topic,
            type,
            testId,
            challengesProgress,
            codeExecutionHistory
        });
        await newReport.save();
        res.status(200).json({ status: true, error, message: 'Report generated', data: newReport });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error, message: 'Internal server error', error });
    }
}