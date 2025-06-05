const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const auth = require('../middleware/auth');

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get legal advice based on country and query
router.post('/advice', auth, async (req, res) => {
  try {
    const { query, country, category } = req.body;
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
      As a legal AI assistant specializing in ${country} law, provide legal advice on the following query:
      
      Category: ${category}
      Query: ${query}
      
      Please provide:
      1. A summary of the relevant laws in ${country}
      2. Practical advice for this specific situation
      3. Potential next steps
      4. Any important warnings or considerations
      
      Format your response in a clear, structured manner suitable for someone without legal background.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    res.json({ advice: text });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get list of supported countries and their legal systems
router.get('/countries', async (req, res) => {
  try {
    // This would typically come from a database, but for now we'll hardcode some examples
    const countries = [
      { code: 'US', name: 'United States', system: 'Common Law' },
      { code: 'UK', name: 'United Kingdom', system: 'Common Law' },
      { code: 'CA', name: 'Canada', system: 'Common Law' },
      { code: 'AU', name: 'Australia', system: 'Common Law' },
      { code: 'IN', name: 'India', system: 'Common Law' },
      { code: 'FR', name: 'France', system: 'Civil Law' },
      { code: 'DE', name: 'Germany', system: 'Civil Law' },
      { code: 'JP', name: 'Japan', system: 'Civil Law' },
      { code: 'BR', name: 'Brazil', system: 'Civil Law' },
      { code: 'ZA', name: 'South Africa', system: 'Mixed' }
    ];
    
    res.json(countries);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get legal categories
router.get('/categories', async (req, res) => {
  try {
    const categories = [
      { id: 'criminal', name: 'Criminal Law' },
      { id: 'civil', name: 'Civil Law' },
      { id: 'corporate', name: 'Corporate Law' },
      { id: 'family', name: 'Family Law' },
      { id: 'immigration', name: 'Immigration Law' },
      { id: 'intellectual-property', name: 'Intellectual Property' },
      { id: 'labor', name: 'Labor Law' },
      { id: 'tax', name: 'Tax Law' },
      { id: 'real-estate', name: 'Real Estate Law' },
      { id: 'other', name: 'Other Legal Matters' }
    ];
    
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;