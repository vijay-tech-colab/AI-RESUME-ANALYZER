import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ResumeAnalyserLanding from "./UI/LandingPage";
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import Auth from "./UI/Auth";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toast CSS import
import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import UserDetailsPopup from "./components/UserDetailsPopup";
import ChatBot from "./components/ChatBot";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const {user} = useAuth();
  return (
    <div className="min-h-screen bg-black text-white">
      <Header setShowPopup={setShowPopup}/>
      <UserDetailsPopup user={user} isOpen={showPopup} onClose={() => setShowPopup(false)} />
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/" element={<ProtectedRoutes>
          <ResumeAnalyserLanding />
        </ProtectedRoutes>} />
        <Route
          path="/upload/resume"
          element={
            <ProtectedRoutes>
              <ResumeAnalyzer />
            </ProtectedRoutes>
          }
        />
         <Route
          path="/chat-with-neurobot"
          element={
            <ProtectedRoutes>
              <ChatBot />
            </ProtectedRoutes>
          }
        />
      </Routes>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
