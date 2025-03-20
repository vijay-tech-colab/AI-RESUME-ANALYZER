import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login"); // 🔹 Redirect user to login page smoothly
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="text-center text-lg mt-10">Loading...</div>; // 🔹 Show a loading state
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
