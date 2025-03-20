import { useState } from "react";
import { UploadCloud } from "lucide-react";
import CardContent from "../components/CardContent";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { signup, login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null,
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const formDataToSend = new FormData();
        formDataToSend.append("username", formData.username);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("avatar", formData.avatar);

        await signup(formDataToSend);
      } else {
        await login(formData.email, formData.password);
      }

      navigate("/");
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white py-20">
      <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="mb-4">
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#374151] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#374151] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {isSignUp && (
            <CardContent className="flex flex-col items-center gap-4">
              <h2 className="text-sm font-medium">Upload Avatar</h2>
              <label className="border-2 border-dashed border-gray-400 p-4 rounded-lg cursor-pointer w-full text-center">
                <UploadCloud className="mx-auto h-10 w-10 text-gray-500" />
                <input
                  type="file"
                  className="hidden bg-[#374151]"
                  name="avatar"
                  onChange={handleFileChange}
                  required
                />
                <p className="text-gray-500">Click to upload an avatar</p>
              </label>
            </CardContent>
          )}

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
