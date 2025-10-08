import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );

      console.log("Login successful:", response.data);

      // ✅ redirect to homepage or dashboard
      navigate("/reel");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Invalid credentials. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">User Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            name="email"   // ✅ added name
            placeholder="Email"
            required
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 
                       focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            name="password"  // ✅ added name
            placeholder="Password"
            required
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 
                       focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-green-600 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/user/register" className="text-green-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
