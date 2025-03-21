import { useState } from "react";
import Card from "./Card";
import CardContent from "./CardContent";
import Button from "./Button";
import { UploadCloud } from "lucide-react";
import { Link } from "react-router-dom";
import Interviews from "./Interviews"
import SuggestionsList from "./Suggestions";
import { toast } from "react-toastify";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [resumeData ,setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const analyzeResume = async () => {
    if (!file) return toast.info("Please upload a resume");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    console.log(formData)
    try {
      const response = await fetch("http://localhost:5000/api/v1/ai/upload-resume", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResumeData(data);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      toast.error("Failed to analyze resume");
    }

    setLoading(false);
  };
  console.log(resumeData);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-30 p-4">
      <Card className="w-full max-w-md p-6  shadow-lg rounded-2xl">
        <CardContent className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-semibold">Resume Analyzer</h2>
          <label className="border-2 border-dashed border-gray-400 p-6 rounded-lg cursor-pointer w-full text-center">
            <UploadCloud className="mx-auto h-10 w-10 text-gray-500" />
            <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} name="file"/>
            <p className="text-gray-500">Click to upload resume</p>
          </label>
          <Button onClick={analyzeResume} disabled={loading} className="w-full">
            {loading ? "Analyzing..." : "Analyze Resume"}
          </Button>
          <Link to="/" className="w-full bg-green-600 text-center p-2 rounded-lg">
            Back to Home
          </Link>
        </CardContent>
      </Card>
      <SuggestionsList suggestions={resumeData?.parsedJson?.suggestions} jobScore={resumeData?.parsedJson?.job_match_score}/>
      <Interviews tips={resumeData?.parsedJson?.interview_tips}/>
    </div>
  );
}
