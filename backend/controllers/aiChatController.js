const { catchAsyncError } = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../middleware/errorClass');
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const mammoth = require("mammoth");
const resGeminiAI = require('../utils/gemini');
const resumePrompt = require('../utils/resumePrompt');


exports.postResume = catchAsyncError(async (req, res, next) => {
    const { file } = req.files;
    if (!req.files || !req.files.file ||
        (
            file.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            && 
            file.mimetype !== 'application/pdf'
        )
    ) {
        return next(new ErrorHandler('No file uploaded or invalid file type. Please upload a valid resume.', 400));
    }

    const uploadDir = path.join(__dirname, "../upload");
    const filePath = path.join(uploadDir, file.name);

    try {
        // Ensure the upload directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Move file
        await file.mv(filePath);

        let content;
        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const readBuffer = fs.readFileSync(filePath);
            content = (await mammoth.extractRawText({ buffer: readBuffer })).value;
        } else if (file.mimetype === 'application/pdf') {
            const dataBuffer = fs.readFileSync(filePath);
            content = (await pdf(dataBuffer)).text;
        } else {
            throw new ErrorHandler('Unsupported file type', 400);
        }


        // Send request to AI model
        const geminiResponse = await resGeminiAI(resumePrompt(content));

        // Remove any surrounding ```json or ``` and parse the JSON response
        const cleanedJsonString = geminiResponse.replace(/```json\n|\n```/g, "").trim();

        let parsedJson;
        try {
            parsedJson = JSON.parse(cleanedJsonString);
        } catch (jsonError) {
            return next(new ErrorHandler('AI response is not valid JSON', 500));
        }

        res.status(200).json({ parsedJson });

    } catch (error) {
        return next(new ErrorHandler(error.message || 'File processing failed', 500));
    } finally {
        // Cleanup file after processing
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
});

exports.chatWithAi = catchAsyncError(async (req,res,next) => {
    const userMessage = req.body.message;
    const botMessages = await resGeminiAI(userMessage);
    res.status(200).json({ botMessages });
})