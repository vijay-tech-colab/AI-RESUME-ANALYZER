const resumePrompt = (content) => `
You are an advanced resume analyzer. Your task is to extract important details from the given resume text and provide structured data in JSON format.

### Instructions:
1️⃣ Extract and return the following details:
   - Full Name
   - Contact Information (Email, Phone Number, GitHub, LinkedIn)
   - Technical Skills (As an array)
   - Work Experience (Company Name, Position, Duration)
   - Education (Degree, College Name, Graduation Year)
   - Certifications (If mentioned)
   - Projects (If mentioned)

2️⃣ Provide a job suitability score (0-100) based on how well this resume matches the following job description:
   - **Job Title**: Full Stack Developer
   - **Required Skills**: React.js, Node.js, MongoDB, Express.js, JavaScript, REST APIs, Git
   - **Preferred Experience**: 1-2 years in web development
   - **Preferred Education**: Bachelor's degree in Computer Science or related field

3️⃣ Suggest **3 improvements** to make the resume stronger.

### Resume Text:
${content}

### Expected Output Format (JSON):
{
  "name": "Full Name",
  "contact": {
    "email": "Email Address",
    "phone": "Phone Number",
    "github": "GitHub Profile URL",
    "linkedin": "LinkedIn Profile URL"
  },
  "skills": ["Skill1", "Skill2", "Skill3"],
  "experience": [
    {
      "company": "Company Name",
      "position": "Job Title",
      "duration": "X months/years"
    }
  ],
  "education": {
    "degree": "Degree Name",
    "college": "College Name",
    "year": "Year of Graduation"
  },
  "certifications": ["Certification1", "Certification2"],
  "projects": ["Project1", "Project2"],
  "job_match_score": 85,
  "suggestions": [
    "Add more backend-related projects.",
    "Include measurable achievements in experience.",
    "Mention any certifications related to Full Stack Development."
  ],
  "interview_tips": "To crack interviews, practice common data structures and algorithms questions, particularly those relevant to web development. Be prepared to discuss the architecture and design choices you made in your projects, and clearly articulate the challenges you faced and how you overcame them. Demonstrate a strong understanding of core JavaScript concepts, and be prepared to debug code in real-time. Also, practice explaining your projects in a STAR (Situation, Task, Action, Result) format."
}

Also, add your thoughts on how the user can easily crack interviews and improve based on their position.
`;

module.exports = resumePrompt;
