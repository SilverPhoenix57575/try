const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Case = require('../models/Case');
const auth = require('../middleware/auth');

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Analyze case difficulty and provide insights
router.post('/analyze-case', auth, async (req, res) => {
  try {
    const { caseId, description, category, country } = req.body;
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
      As a legal AI assistant, analyze this legal case and provide:
      1. Difficulty level (1-10 scale)
      2. Case summary
      3. Key recommendations
      4. Potential counter-arguments
      5. Estimated duration
      6. Success probability (0-100%)
      
      Case Details:
      Category: ${category}
      Country: ${country}
      Description: ${description}
      
      Please provide a structured JSON response with the following format:
      {
        "difficultyLevel": number,
        "summary": "string",
        "recommendations": ["string"],
        "counterArguments": ["string"],
        "estimatedDuration": "string",
        "successProbability": number
      }
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse AI response
    let aiAnalysis;
    try {
      aiAnalysis = JSON.parse(text);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      aiAnalysis = {
        difficultyLevel: 5,
        summary: text,
        recommendations: ['Consult with a specialized lawyer', 'Gather all relevant documents'],
        counterArguments: ['Consider alternative dispute resolution'],
        estimatedDuration: '3-6 months',
        successProbability: 70
      };
    }
    
    // Update case with AI analysis
    if (caseId) {
      await Case.findByIdAndUpdate(caseId, {
        difficultyLevel: aiAnalysis.difficultyLevel,
        aiAnalysis: aiAnalysis
      });
    }
    
    res.json({
      success: true,
      analysis: aiAnalysis
    });
    
  } catch (error) {
    console.error('AI Analysis Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error analyzing case',
      error: error.message
    });
  }
});

// Generate counter-arguments
router.post('/counter-arguments', auth, async (req, res) => {
  try {
    const { argument, caseType, country } = req.body;
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
      Generate strong legal counter-arguments for the following:
      
      Original Argument: ${argument}
      Case Type: ${caseType}
      Jurisdiction: ${country}
      
      Provide 3-5 well-reasoned counter-arguments with legal basis.
      Format as a JSON array of strings.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    let counterArguments;
    try {
      counterArguments = JSON.parse(text);
    } catch {
      counterArguments = text.split('\n').filter(line => line.trim());
    }
    
    res.json({
      success: true,
      counterArguments: counterArguments
    });
    
  } catch (error) {
    console.error('Counter Arguments Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating counter-arguments',
      error: error.message
    });
  }
});

module.exports = router;