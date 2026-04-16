const express = require('express');
const multer = require('multer');
const { GoogleGenAI } = require('@google/genai');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Check API key configuration early if possible, or handle on request
const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY 
});

router.post('/', upload.single('document'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No document uploaded' });
        }

        const mimeType = req.file.mimetype;
        
        const systemInstruction = `You are a supportive Indian legal expert. 
Review the provided document and extract key legal insights. Focus your analysis on the Indian legal context. 
Your response MUST be exclusively a valid JSON object matching this schema:
{
  "caseTitle": "String - The title or subject of the case/document",
  "caseNumber": "String - The case number if available, else 'N/A'",
  "nextHearingDate": "String - Date of next hearing if available, else 'N/A'",
  "simplifiedAdvice": "String - A highly simplified, empathetic summary of the situation and what it means for the user",
  "actionItems": ["String - An array of immediate next steps the user should take"]
}`;

        // Prepare the part from the uploaded buffer
        const documentPart = {
            inlineData: {
                data: req.file.buffer.toString('base64'),
                mimeType: mimeType
            }
        };

        const response = await ai.models.generateContent({
            model: 'gemini-3.1-flash',
            contents: [
                {
                    role: 'user',
                    parts: [
                        documentPart,
                        { text: "Analyze this legal document." }
                    ]
                }
            ],
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json"
            }
        });

        const textResponse = response.text;
        
        let jsonResponse;
        try {
            jsonResponse = JSON.parse(textResponse);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError, "Raw output:", textResponse);
            return res.status(500).json({ error: 'Failed to parse AI response into JSON' });
        }

        return res.json(jsonResponse);

    } catch (error) {
        console.error('Error during analysis:', error);
        return res.status(500).json({ 
            error: 'An error occurred while processing the document',
            details: error.message
        });
    }
});

module.exports = router;
