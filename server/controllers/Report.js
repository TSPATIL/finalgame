const reportModel = require("../models/Report");
const resultModel = require("../models/Result");
const userModel = require("../models/User");
const PDFDocument = require('pdfkit');
const dotenv = require('dotenv');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas')
const { getGridFSBuckeReport, getGridFSBuckeCertificate } = require("../configs/dbConnection");
const { mongoose } = require("mongoose");
const path = require('path');
const fs = require('fs');

dotenv.config();

const generateChart = async (labels, data, label, color) => {
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 600, height: 300 });
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

const generateReportPDF = async (challengeLabels, timeTakenData, attemptsTakenData, id, title, userName, topic, type, userPerformance, improvementSuggestions, start_time, status) => {
    return new Promise(async (resolve, reject) => {
        const gridfsBucketReport = getGridFSBuckeReport();
        if (!gridfsBucketReport) {
            return res.status(500).json({ status: false, message: "GridFSBucket not initialized" });
        }
        const timeTakenChart = await generateChart(challengeLabels, timeTakenData, "Time Taken (s)", "red");
        const attemptsTakenChart = await generateChart(challengeLabels, attemptsTakenData, "No. of Attempts", "blue");

        const doc = new PDFDocument();

        const writeStream = gridfsBucketReport.openUploadStream(`${id}_report.pdf`);
        doc.pipe(writeStream);

        doc.fontSize(18).text(`Test Performance Report`, { align: 'center' }).moveDown();
        doc.fontSize(14).text(`Name: ${userName}`);
        doc.text(`Test Title: ${title}`);
        doc.text(`Topic: ${topic.toUpperCase()}`);
        doc.text(`Test Type: ${type}`);
        doc.text(`Test status: ${status}`, {color: status === 'Failed' ? 'red': 'green'});
        doc.text(`Date of Test: ${start_time.toDateString()}`).moveDown();

        doc.fontSize(16).text(`User Performance Details`, { underline: true }).moveDown();
        doc.fontSize(12).text(userPerformance).moveDown();

        doc.fontSize(16).text(`Areas of Improvement`, { underline: true }).moveDown();
        doc.fontSize(12).text(improvementSuggestions).moveDown();

        doc.fontSize(16).text(`Time Taken Per Question`, { underline: true }).moveDown();
        doc.image(timeTakenChart, { width: 400, align: 'center' }).moveDown(310);

        doc.fontSize(16).text(`Attempts Per Question`, { underline: true }).moveDown();
        doc.image(attemptsTakenChart, { width: 400, align: 'center' }).moveDown(310);

        doc.end();
        writeStream.on('finish', () => resolve(writeStream.id));
        writeStream.on('error', reject);
    })
}

const generateCertificatePDF = async (userName, id) => {
    return new Promise((resolve, reject) => {
        const gridfsBucketCertificate = getGridFSBuckeCertificate();
        if (!gridfsBucketCertificate) return reject("GridFSBucket not initialized");

        const doc = new PDFDocument({
            size: 'A4',
            layout: 'landscape',
            margin: 0
        });

        const writeStream = gridfsBucketCertificate.openUploadStream(`${id}_certificate.pdf`);
        doc.pipe(writeStream);

        //Adding certificate background image
        const templatePath = path.join(__dirname, '../assets/certificate-template.png');
        if (fs.existsSync(templatePath)) {
            doc.image(templatePath, 0, 0, { width: doc.page.width, height: doc.page.height });
        } else {
            return reject("Certificate template image not found");
        }

        doc.registerFont('GreatVibes', path.join(__dirname, '../assets/font/GreatVibes-Regular.ttf'));

        doc.font('GreatVibes')
            .fontSize(52)
            .fillColor('#a17b41')
            .text(userName, 0, 230, { align: 'center' });

        // doc.font('Times-Italic')
        //     .fontSize(20)
        //     .text(`For participation in "${title}"`, 0, 320, { align: 'center' });

        // doc.fontSize(16)
        //     .fillColor('#333')
        //     .text(`Date: ${date.toDateString()}`, 0, 370, { align: 'center' });

        doc.end();

        writeStream.on('finish', () => resolve(writeStream.id));
        writeStream.on('error', reject);
    });
};


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
        const { title, topic, type, testId, challengesProgress, codeExecutionHistory, status, start_time, end_time } = result;

        const challengeLabels = challengesProgress.map((_, index) => `Q${index + 1}`);
        const timeTakenData = challengesProgress.map(ch => ch.timeTaken / 1000);
        const attemptsTakenData = challengesProgress.map(ch => ch.attempts);

        const codeExecutionProgress = codeExecutionHistory.filter((codeExe) => {
            if (codeExe.executor === "user") {
                return {
                    code: codeExe.code,
                    message: codeExe.message
                }
            }
        })

        const aiFeedback = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: "Analyze the user's test performance and suggest areas of improvement. Give answer in json format like { user_performance: 'at least sentences' , improvement: 'at least 3 sentences'}" },
                    { role: "user", content: JSON.stringify({ title, topic, type, challengesProgress, codeExecutionProgress }) }
                ],
                max_tokens: 300
            })
        });
        const responseData = await aiFeedback.json();
        const messageContent = responseData.choices?.[0]?.message?.content;

        let feedback = {};
        try {
            console.log(messageContent)
            const match = messageContent.match(/```json\s*([\s\S]*?)```/);
            console.log(match)
            if (match) {
                const jsonContent = JSON.parse(match[1]); // Extracted JSON string
                console.log(jsonContent);
                feedback = jsonContent;
            } else {
                console.log("No JSON found");
            }
        } catch (error) {
            console.error("Error parsing AI response:", error);
            feedback = {
                user_performance: "Could not retrieve performance data.",
                improvement: "Could not generate improvement suggestions."
            };
        }

        const userPerformance = feedback.user_performance || "No performance data available.";
        const improvementSuggestions = feedback.improvement || "No improvement suggestions available.";

        const fileId = await generateReportPDF(challengeLabels, timeTakenData, attemptsTakenData, id = req.params.id, title, userName, topic, type, userPerformance, improvementSuggestions, start_time, status);
        const certificateId = await generateCertificatePDF(userName, id=req.params.id);

        const newReport = await reportModel({
            name: userName,
            title,
            topic,
            type,
            userId: user._id,
            resultId: req.params.id,
            testId,
            challengesProgress,
            codeExecutionHistory: codeExecutionProgress,
            status: 'Passed',
            start_time,
            performance: userPerformance,
            improvement: improvementSuggestions,
            end_time,
            file: fileId,
            certificate: certificateId
        });
        await newReport.save();
        res.status(200).json({ status: true, message: 'Report generated', data: newReport });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error, message: 'Internal server error', error });
    }
}

const getReportFile = async (req, res) => {
    try {
        const gridfsBucketReport = getGridFSBuckeReport();
        if (!gridfsBucketReport) {
            return res.status(500).json({ status: false, message: "GridFSBucket not initialized" });
        }
        const fileId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(fileId)) {
            return res.status(400).json({ status: false, message: "Invalid file ID" });
        }
        const file = await gridfsBucketReport.find({ _id: new mongoose.Types.ObjectId(fileId) }).toArray();
        if (!file || file.length === 0) {
            return res.status(404).json({ status: false, message: "File not found" });
        }
        console.log(file)
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${file[0].filename}`);
        const downloadStream = gridfsBucketReport.openDownloadStream(new mongoose.Types.ObjectId(fileId));
        downloadStream.pipe(res);
        downloadStream.on("error", (err) => {
            res.status(500).json({ status: false, message: "Error streaming file", error: err });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal server error", error });
    }
}

const getCertificateFile = async (req, res) => {
    try {
        const gridfsBucketCertificate = getGridFSBuckeCertificate();
        if (!gridfsBucketCertificate) {
            return res.status(500).json({ status: false, message: "GridFSBucket not initialized" });
        }
        const certificateId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(certificateId)) {
            return res.status(400).json({ status: false, message: "Invalid file ID" });
        }
        const file = await gridfsBucketCertificate.find({ _id: new mongoose.Types.ObjectId(certificateId) }).toArray();
        if (!file || file.length === 0) {
            return res.status(404).json({ status: false, message: "File not found" });
        }
        console.log(file)
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${file[0].filename}`);
        const downloadStream = gridfsBucketCertificate.openDownloadStream(new mongoose.Types.ObjectId(certificateId));
        downloadStream.pipe(res);
        downloadStream.on("error", (err) => {
            res.status(500).json({ status: false, message: "Error streaming file", error: err });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal server error", error });
    }
}

module.exports = { getReportData, getReportFile, getCertificateFile }