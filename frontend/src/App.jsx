import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ResumeAnalyserLanding from "./UI/LandingPage";
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import Auth from "./UI/Auth";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toast CSS import
import Resume from "./components/Suggestions";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Routes>
        <Route path="/" element={<ResumeAnalyserLanding />} />
        <Route path="/login" element={<Auth />} />
        <Route
          path="/upload/resume"
          element={
            <ProtectedRoutes>
              <ResumeAnalyzer />
            </ProtectedRoutes>
          }
        />
        <Route path="/show/resume"
        element={
          <ProtectedRoutes>
            <Resume/>
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
