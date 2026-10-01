
# AI Text Analyzer

An AI-powered text analyzer built using React, Node.js, Express, Gemini API, and Zod.

The application analyzes user-provided text and generates:

- Sentiment
- Category
- Summary
- Keywords
- Urgency

## Tech Stack

- React
- Tailwind CSS
- Node.js
- Express.js
- Gemini API
- Zod
- Vite

## How It Works

```text
User
 ↓
React Frontend
 ↓
Express Backend
 ↓
Gemini API
 ↓
Structured JSON
 ↓
Zod Validation
 ↓
React UI



Example
Input
The food was good but the delivery was very late.
Output
{
  "sentiment": "mixed",
  "category": "delivery",
  "summary": "The food was good but the delivery was late.",
  "keywords": [
    "food",
    "delivery"
  ],
  "urgency": "medium"
}

Features
- AI-powered text analysis
- Sentiment analysis
- Category classification
- Automatic summary
- Keyword extraction
- Urgency detection
- Gemini Structured Outputs
- Zod validation
- Input validation
- Loading state
- Error handling
- Responsive UI with Tailwind CSS
Project Structure
AI-Text-Analyzer/
│
├── backend/
│   ├── app.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md

Setup
1. Clone the repository
git clone YOUR_GITHUB_REPOSITORY_URL
cd AI-Text-Analyzer

2. Backend Setup
cd backend
npm install

Create a .env file:
GEMINI_API_KEY=your_gemini_api_key

Start the backend:
node app.js

Backend runs on:
http://localhost:8000

3. Frontend Setup
Open another terminal:
cd frontend
npm install
npm run dev

Frontend runs on the Vite development URL.
API
Analyze Text
POST /api/analyze

Request:
{
  "text": "The food was excellent but the delivery was late."
}

Response:
{
  "sentiment": "mixed",
  "category": "delivery",
  "summary": "The food was excellent but the delivery was late.",
  "keywords": [
    "food",
    "delivery"
  ],
  "urgency": "medium"
}

Environment Variables
The Gemini API key is stored in .env.
Never upload the .env file to GitHub.
Add this to .gitignore:
.env
node_modules/

Future Improvements
- Analysis history
- PostgreSQL database
- User authentication
- Analytics dashboard
- Deployment
- Automated tests
- Batch text analysis
Author
Nikhil R M
Information Science Engineering Student
Interested in AI Engineering, Generative AI, Full-Stack Development, and Machine Learning.