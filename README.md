# 🚀 AI-Powered Resume Analyzer

## 📌 Overview
AI-powered Resume Analyzer that extracts text from **PDF/DOCX** resumes, evaluates skills, matches job descriptions, provides **AI-driven improvement suggestions**, and generates **ATS-friendly reports**. 

🔍 **Key Features:**
- ✅ **User Authentication (Login & Signup)**
- ✅ **Resume Upload & Text Extraction** (PDF/DOCX support)
- ✅ **AI-Based Resume Analysis & Scoring**
- ✅ **Job Suitability Score** (Matches Resume with JD)
- ✅ **Resume Improvement Suggestions** (AI-Powered)
- ✅ **ATS-Friendly Score Predictor**
- ✅ **PDF Report Download** (Detailed AI analysis)
- ✅ **Dashboard for Users to Track Their Resumes**
- ✅ **Admin Panel to Manage Users & Reports**

## 🛠️ Tech Stack
**Frontend:** React.js, Tailwind CSS  
**Backend:** Node.js, Express.js, MongoDB  
**Authentication:** JWT (JSON Web Tokens)  
**AI Integration:** OpenAI API  

## 🚀 Installation & Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/vijay-tech-colab/AI-RESUME-ANALYZER.git
cd ai-resume-analyzer
```

### 2️⃣ Install Dependencies
#### **Backend**
```bash
cd backend
npm install
```
#### **Frontend**
```bash
cd frontend
npm install
```

### 3️⃣ Set Up Environment Variables
Create a **`.env`** file in the `backend` folder and add:
```env
OPENAI_API_KEY=your_openai_api_key
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Start the Application
#### **Backend**
```bash
cd backend
npm run dev
```
#### **Frontend**
```bash
cd frontend
npm start
```

## 🎯 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/auth/signup` | User signup |
| POST | `/api/auth/login` | User login |
| POST | `/api/upload` | Uploads and extracts resume text |
| POST | `/api/analyze` | AI-powered resume analysis |
| POST | `/api/match` | Matches resume with job description |
| GET | `/api/report/:id` | Fetches AI-generated resume report |

## 📸 Screenshots (Coming Soon)

## 👨‍💻 Author
**Vijay Kumar**  
🔗 [GitHub](https://github.com/vijay-tech-colab) | [LinkedIn](https://www.linkedin.com/in/vijay-tech-colab)  

---

🌟 **Star this repo if you found it useful!** 🚀
