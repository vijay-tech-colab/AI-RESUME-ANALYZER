import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  // ✅ Check if user is logged in (on page reload)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:5000/api/v1/user/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          setUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // ✅ Signup function
  const signup = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      toast.success("Signup successful!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed!");
    }
  };

  // ✅ Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      toast.success("Login successful!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!");
    }
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.info("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth
export const useAuth = () => useContext(AuthContext);
