import { FaUpload, FaCheckCircle, FaRocket } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ResumeAnalyserLanding() {
  return (
    <>
      {/* Hero Section */}
      <section className="text-center pt-40  text-white shadow-lg">
        <h1 className="text-5xl font-bold">Optimize Your Resume with AI</h1>
        <p className="text-lg mt-4">
          Get instant feedback and improve your chances of landing your dream
          job.
        </p>
        <Link
          to="/upload/resume"
          className="mt-6 px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-black  shadow-md rounded-2xl inline-block"
        >
          Upload Resume
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-gray-800 shadow-lg rounded-xl text-center">
          <FaUpload className="text-white text-4xl mx-auto" />
          <h3 className="text-xl font-semibold mt-4">Upload Your Resume</h3>
          <p className="text-gray-400 mt-2">
            Simply upload your resume in PDF format.
          </p>
        </div>
        <div className="p-6 bg-gray-800 shadow-lg rounded-xl text-center">
          <FaCheckCircle className="text-white text-4xl mx-auto" />
          <h3 className="text-xl font-semibold mt-4">Get Instant Feedback</h3>
          <p className="text-gray-400 mt-2">
            Receive AI-powered analysis with suggestions.
          </p>
        </div>
        <div className="p-6 bg-gray-800 shadow-lg rounded-xl text-center">
          <FaRocket className="text-white text-4xl mx-auto" />
          <h3 className="text-xl font-semibold mt-4">Improve & Apply</h3>
          <p className="text-gray-400 mt-2">
            Make changes and apply with confidence.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-20 text-white shadow-lg">
        <h2 className="text-3xl font-bold">Ready to Enhance Your Resume?</h2>
        <Link to="/chat-with-neurobot" className="mt-6 px-6 py-3 text-lg bg-white text-black hover:bg-gray-300 shadow-md rounded-lg inline-block">
          Chat with 🧠 NeuroBot
        </Link>
      </section>
    </>
  );
}
